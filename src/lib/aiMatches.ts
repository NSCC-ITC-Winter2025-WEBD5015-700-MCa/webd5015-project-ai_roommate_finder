import { PrismaClient } from "@prisma/client";
import Together from "together-ai";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const prisma = new PrismaClient();
const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export async function findMatches(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { preferences: true },
  });

  if (!user || !user.preferences) {
    throw new Error("User or preferences not found");
  }

  const myPref = user.preferences;

  const otherUsers = await prisma.user.findMany({
    where: { id: { not: userId } },
    include: { preferences: true },
  });

  console.log("Matching for user:", user.name);
  console.log("User preferences:", myPref);
  console.log("Other users in DB:", otherUsers.length);

  // Strict match logic
  let matches = otherUsers.filter((u) => {
    const pref = u.preferences;
    if (!pref) return false;

    const isMatch =
      pref.preferredLocation === myPref.preferredLocation &&
      pref.minBudget <= myPref.maxBudget &&
      pref.maxBudget >= myPref.minBudget &&
      pref.occupation === myPref.occupation &&
      pref.smoking === myPref.smoking &&
      (myPref.genderPreference === "No Preference" || u.sex === myPref.genderPreference) &&
      (!myPref.religion || u.religion === myPref.religion) &&
      (!myPref.ethnicity || u.ethnicity === myPref.ethnicity) &&
      pref.minAge <= myPref.maxAge &&
      pref.maxAge >= myPref.minAge &&
      (pref.cooking === myPref.cooking || myPref.cooking === "Flexible");

    if (isMatch) {
      console.log(`Strict match: ${u.name}`);
    }

    return isMatch;
  });

  // Relaxed match if no strict matches
  if (matches.length === 0) {
    console.log("No strict matches found. Trying relaxed criteria...");
    matches = otherUsers.filter((u) => {
      const pref = u.preferences;
      if (!pref) return false;

      const relaxedMatch =
        pref.preferredLocation === myPref.preferredLocation &&
        pref.minBudget <= myPref.maxBudget + 200 &&
        pref.maxBudget >= myPref.minBudget - 200;

      if (relaxedMatch) {
        console.log(` Relaxed match: ${u.name}`);
      }

      return relaxedMatch;
    }).slice(0, 5);
  }

  const matchNames = matches.map((m) => m.name).join(", ");
  const aiDescription = await getAiMatchDescription(myPref, matchNames);

  return { matches, aiDescription };
}

async function getAiMatchDescription(preferences: any, matchNames: string) {
  try {
    const response = await together.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `This is a roommate-matching system. The user is looking for matches with these preferences:
- Location: ${preferences.preferredLocation}
- Budget: ${preferences.minBudget} to ${preferences.maxBudget}
- Occupation: ${preferences.occupation}
- Smoking: ${preferences.smoking ? "Yes" : "No"}
- Drinking: ${preferences.drinking ? "Yes" : "No"}
- Cooking: ${preferences.cooking}

Based on the data, the following users are good matches: ${matchNames}. Reply with a professional and simple message like:
"Here are the possible matches for you."`,
        },
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    });

    return response.choices?.[0]?.message?.content || "Here are the possible matches for you.";
  } catch (error) {
    console.error("AI Matchmaking Error:", error);
    return "Here are the possible matches for you.";
  }
}

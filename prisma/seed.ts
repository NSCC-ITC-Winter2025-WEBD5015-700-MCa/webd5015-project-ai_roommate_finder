import db from "@/lib/db";
import { users } from "./users.js";
import { adminUsers } from "./admin.js";
import bcrypt from "bcrypt";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // ✅ Seed Admins (no preferences)
  for (const admin of adminUsers) {
    try {
      const hashedPassword = await bcrypt.hash(admin.password, 10);

      await db.user.create({
        data: {
          name: admin.name,
          email: admin.email,
          password: hashedPassword,
          role: "Admin",
          bio: "Admin account",
          image: admin.image,
          isPremium: true,
        },
      });

      console.log(`✅ Added admin: ${admin.name}`);
    } catch (error) {
      console.error(`❌ Error adding admin ${admin.name}:`, error);
    }
  }

  // ✅ Seed Roommate Users (with preferences)
  for (const user of users) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await db.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          image: user.image,
          bio: user.bio,
          createdAt: new Date(user.createdAt),
          preferences: {
            create: {
              ethnicity: user.ethnicity,
              religion: user.religion,
              minAge: user.ageRange.min,
              maxAge: user.ageRange.max,
              sex: user.sex,
              genderPreference: user.genderPreference,
              occupation: user.occupation,
              preferredLocation: user.preferredLocation,
              hasPets: user.pets.hasPets,
              petType: user.pets.type,
              minBudget: user.budget.min,
              maxBudget: user.budget.max,
              accommodationType: user.accommodationType,
              sleepPattern: user.habits.sleepPattern,
              drinking: user.habits.drinking,
              smoking: user.habits.smoking,
              cooking: user.cooking,
            },
          },
        },
      });

      console.log(`✅ Added user: ${user.name}`);
    } catch (error) {
      console.error(`❌ Error adding user ${user.name}:`, error);
    }
  }

  console.log("✅ Seeding complete!");
  await db.$disconnect();
}

seedDatabase();

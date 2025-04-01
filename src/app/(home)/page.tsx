import { RoommateCard } from "@/components/Card/page"; // Ensure this path is correct

type Roommate = {
  id: string;
  name: string;
  country: string;
  age: number;
  sex: string;
  occupation: string;
  maxBudget: number;
  bio: string;
  location: string;
  imageUrl: string;
};

// Using dummy data for now
async function fetchRoommates(): Promise<Roommate[]> {
  return [
    {
      id: "1",
      name: "Joe Root",
      country: "England",
      age: 28,
      sex: "Male",
      occupation: "Student",
      maxBudget: 750,
      bio: "I am male, aged 62, looking for a large room, preferably with a private bathroom...",
      location: "Halifax Downtown, North End, Spring Garden Road",
      imageUrl: "/images/joe-root.png", // Replace with actual image path
    },
    {
      id: "2",
      name: "Emma Watson",
      country: "Canada",
      age: 26,
      sex: "Female",
      occupation: "Software Engineer",
      maxBudget: 900,
      bio: "Looking for a quiet roommate, preferably someone who also works remotely...",
      location: "Bedford, Clayton Park, Downtown Halifax",
      imageUrl: "/images/emma-watson.png",
    },
  ];
}

export default async function Home() {
  const roommates = await fetchRoommates();

  return (
    <div className="mt-6 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {roommates.length > 0 ? (
        roommates.map((roommate) => (
          <RoommateCard key={roommate.id} roommate={roommate} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No roommates found</p>
      )}
    </div>
  );
}

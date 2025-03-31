import { Suspense } from "react";
import { RoommateCard } from "@/components/Card/page"; // Update the import if needed

type Roommate = {
  id: string;
  name: string;
  ethnicity: string;
  religion: string;
  sex: string;
  occupation: string;
  minBudget: number;
  maxBudget: number;
  drinking: boolean;
  smoking: boolean;
  cooking: string;
};

async function fetchRoommates(): Promise<Roommate[]> {
  try {
    const response = await fetch("/api/roommates"); 
    if (!response.ok) {
      throw new Error("Failed to fetch roommates");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching roommates:", error);
    return [];
  }
}

export default async function Home() {
  const roommates = await fetchRoommates();

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

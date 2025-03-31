// src/components/Card/page.tsx

export type RoommateCardProps = {
  roommate: {
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
    // Add other fields as necessary
  };
};

export function RoommateCard({ roommate }: RoommateCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{roommate.name}</h2>
      <p>Ethnicity: {roommate.ethnicity}</p>
      <p>Religion: {roommate.religion}</p>
      <p>Sex: {roommate.sex}</p>
      <p>Occupation: {roommate.occupation}</p>
      <p>Budget: ${roommate.minBudget} - ${roommate.maxBudget}</p>
      <p>Drinking: {roommate.drinking ? "Yes" : "No"}</p>
      <p>Smoking: {roommate.smoking ? "Yes" : "No"}</p>
      <p>Cooking: {roommate.cooking}</p>
      {/* Add other fields as necessary */}
    </div>
  );
}

import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next"; // For server-side rendering

type User = {
  name: string;
  email: string;
  createdAt: Date;
  preferences: {
    ethnicity: string;
    religion: string;
    minAge: number;
    maxAge: number;
    sex: string;
    genderPreference: string;
    occupation: string;
    preferredLocation: string;
    hasPets: boolean;
    petType: string;
    minBudget: number;
    maxBudget: number;
    accommodationType: string;
    sleepPattern: string;
    drinking: string;
    smoking: string;
    cooking: string;
  };
};

type Props = {
  user: User;
};

const prisma = new PrismaClient();

const UserCard = ({ user }: Props) => {
  return (
    <div className="grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">User Details</h2>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Preferences</h3>
        <p><strong>Ethnicity:</strong> {user.preferences.ethnicity}</p>
        <p><strong>Religion:</strong> {user.preferences.religion}</p>
        <p><strong>Age Range:</strong> {user.preferences.minAge} - {user.preferences.maxAge}</p>
        <p><strong>Sex:</strong> {user.preferences.sex}</p>
        <p><strong>Gender Preference:</strong> {user.preferences.genderPreference}</p>
        <p><strong>Occupation:</strong> {user.preferences.occupation}</p>
        <p><strong>Preferred Location:</strong> {user.preferences.preferredLocation}</p>
        <p><strong>Has Pets:</strong> {user.preferences.hasPets ? "Yes" : "No"}</p>
        <p><strong>Pet Type:</strong> {user.preferences.petType}</p>
        <p><strong>Budget:</strong> ${user.preferences.minBudget} - ${user.preferences.maxBudget}</p>
        <p><strong>Accommodation Type:</strong> {user.preferences.accommodationType}</p>
        <p><strong>Sleep Pattern:</strong> {user.preferences.sleepPattern}</p>
        <p><strong>Drinking:</strong> {user.preferences.drinking}</p>
        <p><strong>Smoking:</strong> {user.preferences.smoking}</p>
        <p><strong>Cooking:</strong> {user.preferences.cooking}</p>
      </div>
    </div>
  );
};

// Fetch data on the server side
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        // You can adjust this to get the currently logged-in user, for example, by email
        email: "user@example.com", // Replace with a dynamic value, e.g., from session or auth
      },
      include: {
        preferences: true, // Make sure to fetch preferences as well
      },
    });

    if (!user) {
      return {
        notFound: true, // Handle case if user is not found
      };
    }

    return {
      props: { user }, // Pass the fetched user as props to the component
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      notFound: true, // Handle error and return 404 if necessary
    };
  }
};

export default UserCard;

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { notFound } from "next/navigation";
import Image from 'next/image';

type Roommate = {
  id: string;
  name: string;
  country: string;
  age: number;
  sex: string;
  ethnicity: string;
  occupation: string;
  bio: string;
  location: string;
  religion: string;
  minAge: number;
  maxAge: number;
  genderPreference: string;
  preferredLocation: string;
  hasPets: boolean;
  petType: string;
  minBudget: number;
  maxBudget: number;
  accommodationType: string;
  sleepPattern: string;
  drinking: boolean;
  smoking: boolean;
  cooking: string;
  imageUrl: string;
};

const roommates: Roommate[] = [
  {
    id: "201",
    name: "Ethan Walker",
    country: "USA",
    age: 29,
    sex: "Male",
    ethnicity: "Hispanic",
    occupation: "Marketing Analyst",
    bio: "Friendly and outgoing professional who enjoys networking and outdoor adventures. Looking for a responsible roommate.",
    location: "Los Angeles, CA",
    religion: "Atheist",
    minAge: 25,
    maxAge: 35,
    genderPreference: "Any",
    preferredLocation: "West Hollywood",
    hasPets: true,
    petType: "Dog",
    minBudget: 1200,
    maxBudget: 2500,
    accommodationType: "Apartment",
    sleepPattern: "Night Owl",
    drinking: true,
    smoking: false,
    cooking: "Prefers takeout",
    imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "202",
    name: "Olivia Martinez",
    country: "Canada",
    age: 26,
    sex: "Female",
    ethnicity: "Latina",
    occupation: "Nurse",
    bio: "Caring and organized, I enjoy a peaceful home environment. Looking for a roommate who is clean and respectful.",
    location: "Vancouver, BC",
    religion: "Catholic",
    minAge: 24,
    maxAge: 32,
    genderPreference: "Female",
    preferredLocation: "Downtown Vancouver",
    hasPets: false,
    petType: "",
    minBudget: 900,
    maxBudget: 1800,
    accommodationType: "Shared Condo",
    sleepPattern: "Early Bird",
    drinking: false,
    smoking: false,
    cooking: "Enjoys home cooking",
    imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

export default function RoommateDetails({ params }: { params: { id: string } }) {
  const roommate = roommates.find((r) => r.id === params.id);

  if (!roommate) return notFound();

  return (
    <>
      <Breadcrumb pageName="Details" />
      <div className="w-auto mx-auto rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <div className="flex-wrap">
          <div className="flex flex-col items-center pb-6 gap-2 border-b-2 border-primary"> 
            <img
              src={roommate.imageUrl}
              alt={roommate.name}
              className="w-40 h-40 object-cover rounded-full bg-white"
            />
            <h1 className="text-3xl font-bold text-dark dark:text-white">{roommate.name}</h1>
            <p className="text-gray-200 dark:text-white">
              {roommate.occupation} • {roommate.age} years • {roommate.ethnicity}
            </p>
          </div>
          <div className="flex flex-col gap-3 p-6">
            <p className="text-gray-300 dark:text-white text-md">From: {roommate.location}</p>
            <p className="text-gray-600 dark:text-white font-medium">${roommate.maxBudget} / month</p>
            <p className="text-gray-300 dark:text-white text-md">Religion: {roommate.religion}</p>
            <p className="text-gray-300 dark:text-white text-md">Gender Preference: {roommate.genderPreference}</p>
            <p className="text-gray-300 dark:text-white text-md">Preferred Location: {roommate.preferredLocation}</p>
            <p className="text-gray-300 dark:text-white text-md">Pets: {roommate.hasPets ? roommate.petType : "No pets"}</p>
            <p className="text-gray-300 dark:text-white text-md">Smoking: {roommate.smoking ? "Yes" : "No"}</p>
            <p className="text-gray-300 dark:text-white text-md">Drinking: {roommate.drinking ? "Yes" : "No"}</p>
            <p className="text-gray-300 dark:text-white text-md">Sleep Pattern: {roommate.sleepPattern}</p>
            <p className="text-gray-300 dark:text-white text-md">Cooking: {roommate.cooking}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">About {roommate.name}</h2>
          <p className="text-gray-700 mt-2">{roommate.bio}</p>
        </div>
      </div>
    </>
  );
}

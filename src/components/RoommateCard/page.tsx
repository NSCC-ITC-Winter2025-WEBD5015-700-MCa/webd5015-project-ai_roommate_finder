"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui-elements/button";
import { LikeIcon, MessageOutlineIcon } from "@/assets/icons";

type Roommate = {
  id: string;
  name: string;
  country: string;
  age: number;
  sex: string;
  ethnicity: string;
  occupation: string;
  bio: string;
  location:string;
  religion:string;          
  minAge:number;
  maxAge:number;
  genderPreference:String;
  preferredLocation:String;
  hasPets:Boolean;
  petType:String;
  minBudget:number;
  maxBudget:number;
  accommodationType:String;
  sleepPattern:String;
  drinking:Boolean; 
  smoking:Boolean;
  cooking:String;
  imageUrl:string;
};

export default function RoommateCard({ roommate }: { roommate: Roommate }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/RoommateDetails/${roommate.id}`)}
      className="bg-white dark:bg-gray-dark dark:shadow-card text-white rounded-2xl shadow-lg flex gap-4 mb-5 cursor-pointer transition hover:shadow-xl"
    >
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <img
          src={roommate.imageUrl}
          alt={roommate.name}
          width={170}
          height={150}
          className="rounded-s-xl object-cover bg-gray-200 h-full border-r-4 border-primary"
        />
      </div>

      {/* Roommate Details */}
      <div className="flex-1 p-6">
        <h2 className="text-[22px] font-semibold pb-1">{roommate.name}</h2>
        <p className="text-gray-400 text-sm flex flex-wrap gap-2">
          <span>From {roommate.country}</span> •
          <span>{roommate.age} years</span> •
          <span>{roommate.sex}</span> •
          <span>{roommate.occupation}</span> •
          <span>Max Budget: ${roommate.maxBudget}</span>
        </p>

        {/* Bio */}
        <p className="mt-2 text-gray-300 text-base leading-relaxed">
          {roommate.bio}{" "}
          <span className="text-blue-400 cursor-pointer">more</span>
        </p>

        {/* Location */}
        <p className="mt-2 text-gray-400 text-sm pb-3">
          <span className="font-semibold">Roommate Looking:</span> {roommate.location}
        </p>

        <div className="flex flex-wrap gap-5 xl:gap-2">
          <Button
            label="Like"
            variant="green"
            shape="rounded"
            size="small"
            icon={<LikeIcon />}
          />
          <Button
            label="Chat"
            variant="dark"
            shape="rounded"
            size="small"
            icon={<MessageOutlineIcon />}
          />
        </div>
      </div>
    </div>
  );
}

'use client';
import PeopleCard from "@/ui/PeopleCard/PeopleCard";
import { useRouter } from "next/navigation";
import React from "react";


const PeoplePage: React.FC = () => {
    const router = useRouter();
    const handleCall = () => { };
    const handleText = () => { router.push('/people/text') };
    return <div className="flex flex-col flex-grow items-center">
        <div className="text-black font-semibold text-2xl">
            Connect Now
        </div>
        {/* Location List */}
        <div className="w-full max-w-md mt-8">
            <PeopleCard handleText={handleText} handleCall={handleCall} details="Active" title="24/7 Alcohol and Drug Support" />
            <PeopleCard handleText={handleText} handleCall={handleCall} details="Active 10 minutes ago" title="talk to mentor" />
            <PeopleCard handleText={handleText} handleCall={handleCall} details="Active 30 minutes ago" title="Family" />
            <PeopleCard handleText={handleText} handleCall={handleCall} details="Active" title="Friend" />
        </div>

        {/* Map Modal */}

    </div>
}

export default PeoplePage;
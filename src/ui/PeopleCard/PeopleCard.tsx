import Image from 'next/image';
import React from 'react';
interface PeopleCardProps {
    title: string;
    details: string;
    handleText: () => void;
    handleCall: () => void;
}
const PeopleCard: React.FC<PeopleCardProps> = ({ title, details, handleCall, handleText }) => {
    return (
        <div className="bg-gray-300 rounded-3xl p-2 mb-4 flex items-center space-x-4">
            <div className="w-24 h-24 bg-gray-400 rounded-2xl flex-shrink-0 overflow-hidden">
                <Image src={'/person.jpg'} width={96} height={96} alt='' />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <div className='w-full text-left'>
                    <p className="text-black font-semibold ">{title}</p>
                    <p className="text-red-500">{details}</p>
                </div>
                <div className='flex flex-row w-full justify-between pr-4 place-self-end'>
                    <button onClick={handleText} className='px-8 py-2 rounded-2xl bg-blue-400  font-semibold'>Text</button>
                    <button onClick={handleCall} className='px-8 py-2 rounded-2xl bg-blue-400  font-semibold'>Call</button>
                </div>
            </div>
        </div>
    );
};

export default PeopleCard;
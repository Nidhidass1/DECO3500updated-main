'use client';

import React, { useState } from 'react';
import StaticProgressBar from '../stats/StaticProgressBars';

interface Benefit {
    days: number;
    title: string;
    description: string;
}

const benefits: Benefit[] = [
    { days: 1, title: 'Immediate Benefits', description: 'Heart rate and blood pressure begin to drop.' },
    { days: 2, title: 'Carbon Monoxide Levels Drop', description: 'Carbon monoxide level in your blood returns to normal.' },
    { days: 3, title: 'Nicotine Leaves Your Body', description: 'Nicotine levels in the blood drop to zero.' },
    { days: 7, title: 'Better Breathing', description: 'Lung function starts to improve as mucus and toxins clear out.' },
    { days: 30, title: 'Improved Lung Health', description: 'Lung function improves up to 30%, making breathing easier.' },
    { days: 90, title: 'Heart Health', description: 'Your risk of heart attack begins to drop.' },
    { days: 365, title: 'One Year Smoke-Free!', description: 'Risk of coronary heart disease is cut in half.' },
];

const LocationPage = () => {
    const [streaks, setStreaks] = useState<number | undefined>(undefined);
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(count + 1);
    };

    const decrementCount = () => {
        if (count > 0) setCount(count - 1);
    };

    const handleNextStep = () => {
        setStreaks(count);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Smoke-Free Streak',
                    text: `I've been smoke-free for ${streaks} days!`,
                    url: window.location.href, // Change this to your desired URL
                });
                console.log('Content shared successfully');
            } catch (error) {
                console.error('Error sharing content:', error);
            }
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    };

    // Filter achieved benefits
    const achievedBenefits = benefits.filter(
        (benefit) => streaks !== undefined && streaks >= benefit.days
    );

    // Find the next benefit
    const nextBenefit = benefits.find(
        (benefit) => streaks !== undefined && streaks < benefit.days
    );

    // Calculate progress percentage for the in-progress benefit
    const progressPercentage =
        nextBenefit && streaks !== undefined
            ? Math.min((streaks / nextBenefit.days) * 100, 100)
            : 0;

    // Calculate days and hours left for the next benefit
    let remainingDays = 0;
    let remainingHours = 0;
    if (nextBenefit && streaks !== undefined) {
        const timeLeft = nextBenefit.days - streaks;
        remainingDays = Math.floor(timeLeft);
        remainingHours = Math.floor((timeLeft - remainingDays) * 24); // Convert decimal part to hours
    }


    // Filter the upcoming unachieved benefits and limit them to 2 (excluding the in-progress one)
    const upcomingBenefits = benefits
        .filter((benefit) => streaks !== undefined && streaks < benefit.days)
        .slice(1, 3); // Show at most 2 upcoming benefits (after the in-progress one)

    return (
        <>
            {streaks === undefined ? (
                <div className="h-full flex flex-col items-center justify-between py-4 bg-green-700 text-white">
                    <h1 className="text-2xl mb-6">{'Days Smoke Free?'}</h1>

                    <div className="flex items-center justify-center gap-6 mb-6">
                        <button
                            onClick={decrementCount}
                            className="text-3xl h-16 w-16 flex items-center justify-center bg-blue-500 rounded-full border border-black"
                        >
                            ➖
                        </button>

                        <span className="text-4xl">{count}</span>

                        <button
                            onClick={incrementCount}
                            className="text-3xl h-16 w-16 flex items-center justify-center bg-blue-500 rounded-full border border-black"
                        >
                            ➕
                        </button>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleNextStep}
                            className="h-16 w-16 flex items-center justify-center bg-blue-500 rounded-full border border-black"
                        >
                            Go!
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col flex-grow items-center">
                    <div className="w-full text-3xl font-semibold text-white text-center">
                        Keep it Up!
                    </div>

                    {/* Flame Emoji */}
                    <div className="w-full max-w-md mt-8 text-[200px] text-center">
                        &#128293;
                    </div>
                    <div className="w-full font-bold text-4xl max-w-md mt-0 text-center">
                        {streaks}
                    </div>
                    <div className="w-full text-2xl font-semibold max-w-md mt-8 text-center">
                        DAYS SMOKE FREE
                    </div>

                    {/* Share Button */}
                    <div className="w-full max-w-md mt-8 flex justify-center">
                        <button
                            onClick={handleShare}
                            className="bg-blue-400 text-white text-2xl px-5 py-2 rounded-full"
                        >
                            SHARE
                        </button>
                    </div>

                    {/* Achieved Benefits Cards */}
                    <div className="w-full text-2xl font-semibold max-w-md mt-8 text-center">
                        BENEFITS ACHIEVED
                    </div>
                    <div className="w-full max-w-md mt-8 grid grid-cols-1 gap-4">
                        {achievedBenefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-green-600 rounded-lg shadow-md p-4 text-center border border-gray-300"
                            >
                                <h3 className="text-lg font-bold">{benefit.title}</h3>
                                <p className="text-gray-700">{benefit.description}</p>
                                <StaticProgressBar forProgress displayIcon={<></>} label={`${100}% Completed`} total={100} value={100} />
                            </div>
                        ))}

                        {/* In-Progress Benefit */}
                        {nextBenefit && (
                            <div className="bg-yellow-500 rounded-lg shadow-md p-4 text-center border border-gray-300">
                                <h3 className="text-lg font-bold">
                                    {nextBenefit.title}
                                </h3>
                                <p className="text-gray-700">{nextBenefit.description}</p>
                                <StaticProgressBar forProgress displayIcon={<></>} label={`${progressPercentage.toFixed(0)}% Completed ${remainingDays}D ${remainingHours}H left`} total={100} value={progressPercentage} />
                            </div>
                        )}
                    </div>

                    {/* Upcoming Benefits */}
                    {upcomingBenefits.length > 0 && (
                        <div className="w-full max-w-md mt-8">
                            <h3 className="text-2xl text-center text-white mb-4">
                                Upcoming Benefits
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {upcomingBenefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-200 rounded-lg shadow-md p-4 text-center border border-gray-400"
                                    >
                                        <h3 className="text-lg text-black font-bold">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-gray-700">{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default LocationPage;

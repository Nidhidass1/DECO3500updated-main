'use client';
import React, { useState } from 'react';
import CigaretteCounter from './CiggareteCounter';
import InputStep from './InputStep';
import StaticProgressBar from './StaticProgressBars';
import DonutChart from '@/ui/CircularProgress/CircularProgress';
import LifeExpectancyTable from '@/ui/LifeExpectancyTable/LifeExpectancyTable';

const ProgressPage = () => {
    // State for user inputs
    const [totalCigarettesPerWeek, setTotalCigarettesPerWeek] = useState(0);
    const [cigarettesSmokedSoFar, setCigarettesSmokedSoFar] = useState(0);
    const [pricePerCigarette, setPricePerCigarette] = useState(0);
    const [timePerCigarette, setTimePerCigarette] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [daysIn, setDaysIn] = useState(0);

    // Calculated values
    const cigarettesNotSmoked = totalCigarettesPerWeek - cigarettesSmokedSoFar;
    const moneySaved = cigarettesNotSmoked * pricePerCigarette;
    const timeSaved = cigarettesNotSmoked * timePerCigarette;

    const steps = [
        {
            label: 'How many cigarettes do you usually smoke in a week?',
            count: totalCigarettesPerWeek,
            setCount: setTotalCigarettesPerWeek,
            component: 'counter',
        },
        {
            label: 'How many have you smoked so far this week?',
            count: cigarettesSmokedSoFar,
            setCount: setCigarettesSmokedSoFar,
            component: 'counter',
        },
        {
            label: 'What is the price per cigarette?',
            count: pricePerCigarette,
            setCount: setPricePerCigarette,
            component: 'input',
        },
        {
            label: 'How much time do you spend per cigarette? (in minutes)',
            count: timePerCigarette,
            setCount: setTimePerCigarette,
            component: 'input',
        },
        {
            label: 'How many days into the week is it?',
            count: daysIn,
            setCount: setDaysIn,
            component: 'counter',
        },
    ];

    const progressBars = [
        {
            label: 'Cigarettes resisted this week',
            value: cigarettesNotSmoked,
            total: totalCigarettesPerWeek,
            icon: (
                <div className="rounded-full  w-8 h-8 text-black flex items-center justify-center">
                    🚬
                </div>
            ),
        },
        {
            label: 'Money saved',
            value: moneySaved,
            total: totalCigarettesPerWeek * pricePerCigarette,
            icon: (
                <div className="rounded-full  w-8 h-8 text-black flex items-center justify-center">
                    💲
                </div>
            ),
        },
        {
            label: 'Time saved by not smoking (minutes)',
            value: timeSaved,
            total: totalCigarettesPerWeek * timePerCigarette,
            icon: (
                <div className="rounded-full  w-8 h-8 text-black flex items-center justify-center">
                    ⏰
                </div>
            ),
        },
    ];

    const handleUpdate = () => {
        setCurrentStep(1);
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        } else {
            setCurrentStep(0);
        }
    };

    return (
        <>
            <div className="flex flex-col space-y-6 mt-6 w-full px-4">
                <div className="text-black font-semibold text-2xl">
                    Your Progress
                </div>

                <div className="h-52 w-fit self-center place-self-center justify-self-center">
                    <DonutChart data={{ progress: daysIn / 7 * 100 }} />
                </div>

                {/* Update Button */}
                {currentStep === 0 && (
                    <>
                        <button
                            onClick={handleUpdate}
                            className="flex items-center text-3xl justify-center mx-auto bg-blue-500 text-white rounded-full w-fit px-5 mt-4"
                        >
                            Update Progress
                        </button>
                    </>
                )
                }

                {/* Displaying input components based on step */}
                {
                    currentStep > 0 && currentStep <= steps.length && (
                        steps[currentStep - 1].component === 'counter' ? (
                            <CigaretteCounter
                                count={steps[currentStep - 1].count}
                                setCount={steps[currentStep - 1].setCount}
                                label={steps[currentStep - 1].label}
                                onNext={() => {
                                    if (currentStep < steps.length) {
                                        setCurrentStep((prev) => prev + 1);
                                    } else {
                                        setCurrentStep(0);
                                    }
                                }}
                                onBack={handleBack}
                            />
                        ) : (
                            <InputStep
                                initialValue={steps[currentStep - 1].count}
                                label={steps[currentStep - 1].label}
                                onNext={(value) => {
                                    steps[currentStep - 1].setCount(value);
                                    if (currentStep < steps.length) {
                                        setCurrentStep((prev) => prev + 1);
                                    } else {
                                        setCurrentStep(0);
                                    }
                                }}
                                onBack={handleBack}
                            />
                        )
                    )
                }

                {/* Display Progress Bars */}
                {
                    currentStep === 0 &&
                    progressBars.map((bar, index) => (
                        <StaticProgressBar
                            key={index}
                            label={bar.label}
                            total={bar.total}
                            value={bar.value}
                            displayIcon={bar.icon}
                        />
                    ))
                }

                <LifeExpectancyTable weeklyCost={pricePerCigarette * (totalCigarettesPerWeek - cigarettesSmokedSoFar)} weeklyMinutes={11 * (totalCigarettesPerWeek - cigarettesSmokedSoFar)} />
            </div >
        </>
    );
};

export default ProgressPage;

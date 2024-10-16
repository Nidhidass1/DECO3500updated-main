import React from 'react';

interface StaticProgressBarProps {
    label: string;
    total: number;
    value: number;
    displayIcon: JSX.Element;
    forProgress?: boolean;
}

const StaticProgressBar: React.FC<StaticProgressBarProps> = ({
    label,
    total,
    value,
    displayIcon,
    forProgress,
}) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;

    return (
        <div className={`${forProgress ? '' : 'bg-green-800 p-4'} rounded-lg text-black font-semibold`}>
            <p className="mb-2">{label}</p>
            <div className="relative h-10">
                {/* Slider track */}
                <div className="bg-gray-200 h-4 rounded-lg w-full absolute top-1/2 transform -translate-y-1/2"></div>

                {/* Progress */}
                <div
                    className="bg-blue-400 h-4 rounded-lg absolute top-1/2 transform -translate-y-1/2"
                    style={{ width: `${percentage}%` }}
                ></div>

                {/* Icon and Value */}
                {forProgress !== true && <div
                    className="absolute top-[75%] transform -translate-y-1/2 -translate-x-1/2"
                    style={{ left: `${percentage}%` }}
                >
                    {displayIcon}
                    <p className="text-center text-xs mt-1">{value.toFixed(2)}</p>
                </div>}

            </div>
        </div>
    );
};

export default StaticProgressBar;

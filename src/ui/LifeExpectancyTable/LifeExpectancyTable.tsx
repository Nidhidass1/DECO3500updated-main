// components/LifeExpectancyTable.tsx

import React from 'react';

export const convertMinutesToTime = (minutes: number): string => {
    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    const mins = minutes % 60;

    return `${days}d ${hours}h ${mins}m`;
};

interface LifeExpectancyRow {
    period: string;
    cost: number;
    lifeExpectancy: string;
}

interface LifeExpectancyTableProps {
    weeklyCost: number;
    weeklyMinutes: number;
}

const LifeExpectancyTable: React.FC<LifeExpectancyTableProps> = ({ weeklyCost, weeklyMinutes }) => {
    const calculateData = (): LifeExpectancyRow[] => {
        const periods = [
            { label: '1 Week', multiplier: 1 },
            { label: '1 Month', multiplier: 4 },
            { label: '1 Year', multiplier: 52 },
            { label: '5 Years', multiplier: 52 * 5 },
            { label: '10 Years', multiplier: 52 * 10 },
            { label: '20 Years', multiplier: 52 * 20 },
        ];

        return periods.map(period => {
            const cost = weeklyCost * period.multiplier;
            const lifeExpectancyMinutes = weeklyMinutes * period.multiplier;
            const lifeExpectancy = convertMinutesToTime(lifeExpectancyMinutes);

            return {
                period: period.label,
                cost,
                lifeExpectancy,
            };
        });
    };

    const data = calculateData();

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">What will you get in return?</h2>
            <table className="min-w-full table-auto ">
                <thead>
                    <tr className="bg-green-600">
                        <th className="border border-t-0 border-l-0 border-gray-300 px-4 py-2">Period</th>
                        <th className="border border-t-0 border-gray-300 px-4 py-2">Cost</th>
                        <th className="border border-t-0 border-r-0 border-gray-300 px-4 py-2">Life Expectancy</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <>
                            {index === data.length - 1 ? <>
                                <tr key={index} className="text-center odd:bg-green-700 even:bg-green-600">
                                    <td className="border border-b-0 border-l-0 border-gray-300 px-4 py-2">{row.period}</td>
                                    <td className="border border-b-0 border-gray-300 px-4 py-2">${row.cost.toLocaleString()}</td>
                                    <td className="border border-b-0 border-r-0 border-gray-300 px-4 py-2">{row.lifeExpectancy}</td>
                                </tr></> : <>
                                <tr key={index} className="text-center odd:bg-green-700 even:bg-green-600">
                                    <td className="border  border-l-0 border-gray-300 px-4 py-2">{row.period}</td>
                                    <td className="border border-gray-300 px-4 py-2">${row.cost.toLocaleString()}</td>
                                    <td className="border border-r-0 border-gray-300 px-4 py-2">{row.lifeExpectancy}</td>
                                </tr></>}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LifeExpectancyTable;

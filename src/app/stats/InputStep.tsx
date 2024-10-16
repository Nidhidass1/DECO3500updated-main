import React, { useState, useEffect } from 'react';

interface InputStepProps {
    initialValue: number;
    onNext: (newValue: number) => void;
    label: string;
    onBack: () => void;
}

const InputStep: React.FC<InputStepProps> = ({
    initialValue,
    onNext,
    label,
    onBack,
}) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleNextStep = () => {
        onNext(value);
    };

    return (
        <div className="h-full flex flex-col items-center justify-between py-4 bg-green-700 text-white">
            <h1 className="text-2xl mb-6">{label}</h1>
            <div className="flex items-center justify-center gap-6 mb-6">
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(parseFloat(e.target.value))}
                    className="text-black px-2 py-1 rounded"
                    step="0.01"
                />
            </div>
            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    className="h-16 w-16 flex items-center justify-center bg-gray-500 rounded-full border border-black"
                >
                    ⬅️
                </button>
                <button
                    onClick={handleNextStep}
                    className="h-16 w-16 flex items-center justify-center bg-blue-500 rounded-full border border-black"
                >
                    ➡️
                </button>
            </div>
        </div>
    );
};

export default InputStep;

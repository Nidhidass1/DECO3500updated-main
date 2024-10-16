interface CigaretteCounterProps {
    count: number;
    setCount: (newCount: number) => void;
    onNext: () => void;
    label: string;
    onBack: () => void;
}

const CigaretteCounter: React.FC<CigaretteCounterProps> = ({
    count,
    setCount,
    onNext,
    label,
    onBack,
}) => {
    const incrementCount = () => {
        setCount(count + 1);
    };

    const decrementCount = () => {
        if (count > 0) setCount(count - 1);
    };

    return (
        <div className="h-full flex flex-col items-center justify-between py-4 bg-green-700 text-white">
            <h1 className="text-2xl mb-6">{label}</h1>

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
                    onClick={onBack}
                    className="h-16 w-16 flex items-center justify-center bg-gray-500 rounded-full border border-black"
                >
                    ⬅️
                </button>
                <button
                    onClick={onNext}
                    className="h-16 w-16 flex items-center justify-center bg-blue-500 rounded-full border border-black"
                >
                    ➡️
                </button>
            </div>
        </div>
    );
};

export default CigaretteCounter;

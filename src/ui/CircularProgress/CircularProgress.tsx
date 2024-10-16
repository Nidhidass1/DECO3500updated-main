import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
    Plugin,
} from 'chart.js';
import { FC } from 'react';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the prop types for the component
interface DonutChartProps {
    data: {
        progress: number; // Progress percentage (0-100)
    };
}

// Define the DonutChart component with props typing
const DonutChart: FC<DonutChartProps> = ({ data }) => {
    // Custom plugin to display text in the center of the doughnut
    const centerTextPlugin: Plugin<'doughnut'> = {
        id: 'centerText',
        beforeDraw: (chart) => {
            const { ctx, width, height } = chart;
            const fontSize = Math.min(height / 7, width / 7); // Dynamically calculate the font size
            ctx.save();
            ctx.font = `${fontSize}px sans-serif`;
            ctx.fillStyle = '#000'; // Text color
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';

            // Get progress from chart data
            const progressData = chart.config.data.datasets[0].data[0];
            const text = `${Math.round(progressData)}%`;

            // Position the text in the center of the chart
            const centerX = width / 2;
            const centerY = height / 2;

            ctx.fillText(text, centerX, centerY);
            ctx.restore();
        },
    };

    // Chart data
    const chartData = {
        labels: ['Progress', 'Remaining'],
        datasets: [
            {
                label: 'Progress',
                data: [data.progress, 100 - data.progress],
                backgroundColor: ['#FF6384', '#DDDDDD'], // Colors for chart sections
                hoverBackgroundColor: ['#FF6384', '#DDDDDD'],
            },
        ],
    };

    // Chart options with custom plugin included
    const options: ChartOptions<'doughnut'> = {
        cutout: '70%', // Controls the thickness of the doughnut
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hides the legend
            },
            tooltip: {
                enabled: true, // Enable tooltips
            },
        },
    };

    return <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />;
};

export default DonutChart;

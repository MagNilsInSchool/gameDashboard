import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
    type ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./chartHorizontalBarWeeklyTotal.css";
import { secondsToMinutes } from "../../utils/dateAndTime";
import type { iGameWeeklyStat } from "../../interfaces/game";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
    gamesData: iGameWeeklyStat[];
}

const ChartHorizontalBarWeeklyTotal: React.FC<Props> = ({ gamesData }) => {
    const weeklyAveragesTitles = gamesData.map((gameData) => gameData.title);
    const weeklyAveragesTime = gamesData.map((gameData) => Math.round(secondsToMinutes(gameData.totalPlayed) / 7));

    const options: ChartOptions<"bar"> = {
        indexAxis: "y" as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },

        scales: {
            x: {
                grid: { display: false },
                ticks: { display: false },
                border: { display: true, color: "rgb(40, 45, 50)", width: 3 },
                title: { display: true, text: "Amount of minutes played per day by all" },
            },
            y: {
                grid: { display: false },
                border: { display: true, color: "rgb(40, 45, 50)", width: 3 },
                ticks: { autoSkip: false },
            },
        },
    };

    const chartData: ChartData<"bar", number[], string> = {
        labels: weeklyAveragesTitles,
        datasets: [
            {
                data: weeklyAveragesTime,
                backgroundColor: "rgb(102, 102, 102)",
                borderWidth: 2,
                barThickness: 40,
                borderSkipped: false,
            },
        ],
    };

    return (
        <div className="chart-bar-weekly-total">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ChartHorizontalBarWeeklyTotal;

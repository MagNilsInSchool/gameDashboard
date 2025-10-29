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
import { useGetWeeklyAverages } from "../../api/queries/sessions/useSessions";
import Loader from "../Loader/Loader";
import { secondsToHMS } from "../../utils/dateAndTime";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// interface Props {
//     labels: string[];
//     data: number[];
// }

const ChartHorizontalBarWeeklyTotal: React.FC = () => {
    const { data, isLoading } = useGetWeeklyAverages();

    const weeklyAveragesTime = data
        ? data.map((weeklyAverage) => {
              const { minutes } = secondsToHMS(weeklyAverage.dayAverage);
              return minutes;
          })
        : [];

    const weeklyAveragesTitles = data ? data.map((weeklyAverage) => weeklyAverage.title) : [];

    const options: ChartOptions<"bar"> = {
        indexAxis: "y" as const, // horizontal bars
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }, // hide legend
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
                label: "", // no label shown because legend hidden
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
            {isLoading ? <Loader className="loader--center" /> : <Bar data={chartData} options={options} />}
        </div>
    );
};

export default ChartHorizontalBarWeeklyTotal;

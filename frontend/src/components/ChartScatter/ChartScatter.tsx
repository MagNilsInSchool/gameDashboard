import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    type ChartOptions,
    type ChartData,
} from "chart.js";
import "./chartScatter.css";
import { Scatter } from "react-chartjs-2";
import { secondsToMinutes } from "../../utils/dateAndTime";
import type { iGameWeeklyStat } from "../../interfaces/game";
import { useState } from "react";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface Point {
    x: number;
    y: number;
    label: string;
}
interface Props {
    gamesData: iGameWeeklyStat[];
}

const ChartScatter: React.FC<Props> = ({ gamesData }) => {
    const [option, setOption] = useState(0);
    const points =
        gamesData[option]?.stats.map((stat) => {
            return { x: stat.count, y: secondsToMinutes(stat.totalPlayed), label: stat.name };
        }) ?? [];

    const data: ChartData<"scatter", Point[], unknown> = {
        datasets: [
            {
                label: "Total sessions",
                data: points,
                backgroundColor: "#fff",
                borderWidth: 2,
                borderColor: "rgb(40, 45, 50)",
                pointRadius: 6,
            },
        ],
    };

    const options: ChartOptions<"scatter"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (ctx) => {
                        const point = ctx.raw as Point;
                        return `${point.label}: ${point.y} min (${point.x} sessions)`;
                    },
                },
            },
            datalabels: { display: false },
        },
        scales: {
            x: {
                grid: { display: false },
                border: { display: true, color: "rgb(40, 45, 50)", width: 3 },
                type: "linear",

                beginAtZero: true,
                position: "bottom",
                title: { display: true, text: "Times" },
                ticks: {
                    stepSize: 1,
                },
            },
            y: {
                grid: { display: false },
                border: { display: true, color: "rgb(40, 45, 50)", width: 3 },
                type: "linear",
                beginAtZero: true,
                title: { display: true, text: "Time (minutes)" },
            },
        },
    };

    return (
        <div className="scatter-chart">
            <select
                className="scatter-chart__selector"
                name="game"
                id="game"
                defaultValue={0}
                onChange={(e) => setOption(Number(e.target.value))}>
                {gamesData.map((gameData, i) => (
                    <option value={i} className="scatter-chart__selector-option" key={i}>
                        {gameData.title}
                    </option>
                ))}
            </select>
            <Scatter data={data} options={options} />
        </div>
    );
};

export default ChartScatter;

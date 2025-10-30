import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    type ChartOptions,
    type ChartData,
} from "chart.js";
import "./chartLines.css";
import { Line } from "react-chartjs-2";
import type { iGameWeeklyStat } from "../../interfaces/game";
import { useState } from "react";
import { secondsToMinutes } from "../../utils/dateAndTime";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
    },
    elements: {
        line: {
            borderWidth: 3,
            tension: 0,
            fill: true,
        },
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { display: false },
            border: { display: true, color: "rgb(40, 45, 50)", width: 3 },
            title: { display: true, text: "Amount of minutes played per user/day" },
        },

        y: {
            grid: { display: false },
            border: { display: true, color: "rgb(40, 45, 50)", width: 3 },
            ticks: { display: false },
        },
    },
};
interface Props {
    gamesData: iGameWeeklyStat[];
}
const ChartLines: React.FC<Props> = ({ gamesData }) => {
    const [option, setOption] = useState(0);

    const selectedGame = gamesData[option];

    // collect all unique days across all users in this game
    const allDays = new Set<string>();
    selectedGame.stats.forEach((stat) => {
        stat.sessions.forEach((session) => {
            const day = new Date(session.endedAt).toISOString().slice(0, 10);
            allDays.add(day);
        });
    });
    const sortedDays = Array.from(allDays).sort();

    // build one dataset per user, with daily totals
    const datasets = selectedGame.stats.map((stat, idx) => {
        // aggregate timePlayed per day for this user
        const dailyMap = new Map<string, number>();
        stat.sessions.forEach((session) => {
            const day = new Date(session.endedAt).toISOString().slice(0, 10);
            dailyMap.set(day, (dailyMap.get(day) ?? 0) + secondsToMinutes(session.timePlayed));
        });

        // map sorted days to data array (null if user didn't play that day)
        const data = sortedDays.map((day) => dailyMap.get(day) ?? 0);

        const hue = (idx * 360) / selectedGame.stats.length;
        const color = `hsl(${hue}, 70%, 50%)`;

        return {
            label: stat.name,
            data,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 3,
            pointRadius: 3,
            tension: 0,
            fill: false,
        };
    });

    // x-axis labels are the sorted days
    const labels = sortedDays.map((day) =>
        new Date(day).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );

    const chartData: ChartData<"line", (number | null)[], string> = {
        labels,
        datasets,
    };

    return (
        <div className="chart-lines">
            <select
                className="chart-lines__selector"
                name="game"
                id="game"
                defaultValue={0}
                onChange={(e) => setOption(Number(e.target.value))}>
                {gamesData.map((gameData, i) => (
                    <option value={i} className="chart-lines__selector-option" key={i}>
                        {gameData.title}
                    </option>
                ))}
            </select>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ChartLines;

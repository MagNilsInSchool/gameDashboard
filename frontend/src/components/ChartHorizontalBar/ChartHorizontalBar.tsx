import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const options = {
    indexAxis: "y" as const,
    elements: {
        bar: { borderWidth: 2 },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        datalabels: {
            anchor: "center", // position relative to bar
            align: "center", // text position (try "end", "start", "right")
            formatter: (value: number) => `${value} minutes`, // what to render
            color: "#fff",
            font: { weight: "600" },
        },
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { display: false },
            border: { display: true, color: "rgb(40, 45, 50)", width: 3 },
            title: { display: false },
        },
        y: {
            // keep category labels on y, but remove grid lines if you want
            grid: { display: false },
            border: { display: true, color: "rgb(40, 45, 50)", width: 3 },
            ticks: { autoSkip: false },
        },
    },
} as unknown as ChartOptions<"bar">;

interface Props {
    labels: string[];
    data: number[];
}

const ChartHorizontalBar: React.FC<Props> = ({ labels, data }) => {
    const chartData = {
        labels,
        datasets: [
            {
                label: "Minutes played",
                data: data.map((d) => Number(d)),
                backgroundColor: "rgb(102, 102, 102)",
                borderWidth: 2,
                barThickness: 40,
                borderSkipped: false,
            },
        ],
    };

    return (
        <div className="profile-page__total-played-bar-chart">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ChartHorizontalBar;

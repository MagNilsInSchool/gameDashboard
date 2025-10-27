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
            anchor: "end", // position relative to bar
            align: "center", // text position (try "end", "start", "right")
            formatter: (value: number) => `${value} minutes`, // what to render
            color: "#111",
            font: { weight: "600" },
        },
    },
    scales: {
        x: {
            beginAtZero: true,
            // remove grid lines and axis border
            grid: { display: false, drawBorder: false },
            border: { display: false },
            // hide numeric tick labels on the x axis
            ticks: { display: false },
            // hide axis title if any
            title: { display: false },
        },
        y: {
            // keep category labels on y, but remove grid lines if you want
            border: { display: false },
            ticks: { autoSkip: false },
            grid: { display: false },
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
                backgroundColor: "rgba(255,99,132,0.9)",
                borderWidth: 0, // remove stroke
                barThickness: 18, // control thickness
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

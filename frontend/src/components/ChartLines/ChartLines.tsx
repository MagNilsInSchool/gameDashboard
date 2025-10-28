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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Props {
    labels?: string[];
    data?: number[];
    height?: number;
    width?: number;
}

const defaultLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

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
        point: {
            radius: 1, // hide points
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

const ChartLines: React.FC<Props> = ({ labels = defaultLabels, data = [12, 19, 7, 14, 10, 20] }) => {
    const chartData: ChartData<"line", number[], string> = {
        labels,
        datasets: [
            {
                label: "",
                data,
                backgroundColor: "rgb(102, 102, 102)",
                datalabels: { display: false },
                borderColor: "rgb(204, 204, 204)",
                pointRadius: 3,
            },
        ],
    };

    return (
        <div className="chart-lines">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ChartLines;

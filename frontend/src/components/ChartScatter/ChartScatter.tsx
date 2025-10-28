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

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface Point {
    x: number;
    y: number;
}

interface Props {
    points?: Point[]; // array of { x, y }
}

const ChartScatter: React.FC<Props> = ({ points = [] }) => {
    // sample fallback data if none provided
    const sample: Point[] = [
        { x: 10, y: 20 },
        { x: 15, y: 10 },
        { x: 20, y: 30 },
        { x: 25, y: 18 },
    ];

    const data: ChartData<"scatter", Point[], unknown> = {
        datasets: [
            {
                label: "Samples",
                data: points.length ? points : sample,
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
            tooltip: { enabled: true },
            datalabels: { display: false },
        },
        scales: {
            x: {
                grid: { display: false },
                border: { display: true, color: "rgb(40, 45, 50)", width: 3 },
                type: "linear",
                position: "bottom",
                title: { display: true, text: "Times" },
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
            <Scatter data={data} options={options} />
        </div>
    );
};

export default ChartScatter;

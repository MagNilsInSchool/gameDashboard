import "./ChartDouhnut.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    labels: string[];
    data: number[];
    colors?: string[];
    options?: ChartOptions<"doughnut">;
    percent: number;
}

const ChartDoughnut: React.FC<Props> = ({
    labels,
    data,
    colors = ["rgb(102, 102, 102)", "rgb(204, 204, 204)"],
    options,
    percent,
}) => {
    const chartData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 6,
            },
        ],
    };

    const defaultOptions: ChartOptions<"doughnut"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            datalabels: { display: false },
        },
        cutout: "75%",
    };

    return (
        <div className="chart-doughnut">
            <Doughnut data={chartData} options={options ?? defaultOptions} />

            <div aria-hidden className="chart-doughnut__percent-wrapper">
                <div className="chart-doughnut__percent">{percent}%</div>
            </div>
        </div>
    );
};

export default ChartDoughnut;

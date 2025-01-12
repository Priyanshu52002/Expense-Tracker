import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const BarGraph = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(data),
        backgroundColor: "#36a2eb",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarGraph;

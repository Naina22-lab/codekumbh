import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
  const budgetData = {
    labels: ["Transport", "Accommodation", "Food", "Activities"],
    datasets: [
      {
        data: [300, 500, 200, 300],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Trip Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <DashboardCard title="Total Budget" value="$1,300" change={5.2} />
        <DashboardCard title="Days Remaining" value="5" change={-1} />
        <DashboardCard title="Destinations" value="3" />
        <DashboardCard title="Travel Score" value="85" change={2.1} />
      </div>
      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-xl font-semibold mb-4">Budget Breakdown</h3>
        <Doughnut data={budgetData} className="h-32"
/>
      </div>
      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-xl font-semibold mb-4">Upcoming Activities</h3>
        <ActivityList />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, change }) => (
  <div className="bg-gray-800 rounded-xl p-4">
    <h3 className="text-sm font-medium text-gray-400">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
    {change !== undefined && (
      <div className={`flex items-center ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
        {change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span className="text-sm">{Math.abs(change)}%</span>
      </div>
    )}
  </div>
);

const ActivityList = () => (
  <ul className="space-y-2">
    <ActivityItem title="City Tour" time="09:00 AM" />
    <ActivityItem title="Museum Visit" time="02:00 PM" />
    <ActivityItem title="Local Dinner" time="07:00 PM" />
  </ul>
);

const ActivityItem = ({ title, time }) => (
  <li className="flex justify-between items-center bg-gray-700 rounded-lg p-3">
    <span>{title}</span>
    <span className="text-sm text-gray-400">{time}</span>
  </li>
);
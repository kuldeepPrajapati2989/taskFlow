import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import PriorityStats from "../components/PriorityStats";
import MonthlyReport from "../components/MonthlyReport";
import UpcomingTasks from "../components/UpcomingTasks";
import MainLayout from "../layouts/MainLayout";
import Reviews from "../components/Reviews";
import ReviewForm from "../components/ReviewForm";

const Dashboard = ({ setToken }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async (page = 1) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `https://taskflow-backend-1-k24g.onrender.com/api/dashboard?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            console.log(result);

            setData(result);
        } catch (error) {
            console.log(error);
        }
    };

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">
                    Loading...
                </h1>
            </div>
        );
    }

    return (
        <MainLayout setToken={setToken}>
            <div className="min-h-screen bg-slate-100">
                <div className="max-w-7xl mx-auto px-5">

                    <h1 className="text-4xl font-bold text-slate-800 mb-8">
                        Task Analytics Dashboard
                    </h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

                        <StatCard
                            title="Total Tasks"
                            value={data.totalTasks}
                            bg="bg-blue-600"
                        />

                        <StatCard
                            title="Pending Tasks"
                            value={data.pendingTasks}
                            bg="bg-orange-500"
                        />

                        <StatCard
                            title="Completed Tasks"
                            value={data.completedTasks}
                            bg="bg-green-600"
                        />

                        <StatCard
                            title="Total Users"
                            value={data.totalUsers}
                            bg="bg-purple-600"
                        />

                        <StatCard
                            title="Total Reviews"
                            value={data.totalReviews}
                            bg="bg-pink-600"
                        />

                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">

                        <PriorityStats
                            data={data.priorityStats}
                        />

                        <MonthlyReport
                            data={data.monthlyReport}
                        />

                    </div>

                    {/* Upcoming Tasks */}
                    <div className="mt-8">
                        <UpcomingTasks
                            data={data.upcomingTasks}
                        />
                    </div>

                    {/* Review Form */}
                    <div className="mt-8">
                        <ReviewForm
                            onReviewAdded={() =>
                                fetchDashboard(data.currentPage || 1)
                            }
                        />
                    </div>

                    {/* Reviews */}
                    <div className="mt-8">
                        <Reviews
                            totalReviews={data.totalReviews}
                            averageRating={data.averageRating}
                            reviews={data.latestReviews}
                            currentPage={data.currentPage}
                            totalPages={data.totalPages}
                            onPageChange={fetchDashboard}
                        />
                    </div>

                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;

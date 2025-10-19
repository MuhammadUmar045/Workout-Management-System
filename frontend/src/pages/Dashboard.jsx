import React, { useEffect, useState } from "react";
import { useWorkoutContext } from "../context/WorkoutContext";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, parseISO } from "date-fns";
import "./Dashboard.css";

export default function Dashboard() {
  const { workouts, dispatch } = useWorkoutContext();
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalVolume: 0,
    avgLoad: 0,
    avgReps: 0,
    mostFrequent: "",
    weeklyData: [],
    exerciseDistribution: [],
  });

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      } catch (error) {
        console.error("Failed to fetch workouts");
      }
    };

    if (!workouts || workouts.length === 0) {
      fetchWorkouts();
    }
  }, [dispatch, workouts]);

  useEffect(() => {
    if (workouts && workouts.length > 0) {
      calculateStats();
    }
  }, [workouts]);

  const calculateStats = () => {
    const totalWorkouts = workouts.length;
    const totalVolume = workouts.reduce((sum, w) => sum + w.load * w.reps, 0);
    const avgLoad =
      workouts.reduce((sum, w) => sum + w.load, 0) / totalWorkouts;
    const avgReps =
      workouts.reduce((sum, w) => sum + w.reps, 0) / totalWorkouts;

    // Most frequent exercise
    const frequency = {};
    workouts.forEach((w) => {
      frequency[w.title] = (frequency[w.title] || 0) + 1;
    });
    const mostFrequent = Object.keys(frequency).reduce(
      (a, b) => (frequency[a] > frequency[b] ? a : b),
      ""
    );

    // Weekly data for line chart
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return format(date, "MMM dd");
    });

    const weeklyData = last7Days.map((day) => {
      const dayWorkouts = workouts.filter((w) => {
        const workoutDate = format(parseISO(w.createdAt), "MMM dd");
        return workoutDate === day;
      });
      return {
        date: day,
        workouts: dayWorkouts.length,
        volume: dayWorkouts.reduce((sum, w) => sum + w.load * w.reps, 0),
      };
    });

    // Exercise distribution for pie chart
    const exerciseDistribution = Object.keys(frequency)
      .map((title) => ({
        name: title,
        value: frequency[title],
      }))
      .slice(0, 5);

    setStats({
      totalWorkouts,
      totalVolume,
      avgLoad: avgLoad.toFixed(1),
      avgReps: avgReps.toFixed(1),
      mostFrequent,
      weeklyData,
      exerciseDistribution,
    });
  };

  const COLORS = ["#ff4444", "#ff8844", "#ffaa44", "#44ff88", "#4488ff"];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p>Track your progress and analyze your performance</p>
      </div>

      <div className="dashboard-container">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card-dash">
            <div className="stat-icon">💪</div>
            <div className="stat-info">
              <div className="stat-value">{stats.totalWorkouts}</div>
              <div className="stat-label">Total Workouts</div>
            </div>
          </div>

          <div className="stat-card-dash">
            <div className="stat-icon">🏋️</div>
            <div className="stat-info">
              <div className="stat-value">
                {stats.totalVolume.toLocaleString()}
              </div>
              <div className="stat-label">Total Volume (kg)</div>
            </div>
          </div>

          <div className="stat-card-dash">
            <div className="stat-icon">⚖️</div>
            <div className="stat-info">
              <div className="stat-value">{stats.avgLoad} kg</div>
              <div className="stat-label">Avg Load</div>
            </div>
          </div>

          <div className="stat-card-dash">
            <div className="stat-icon">🔢</div>
            <div className="stat-info">
              <div className="stat-value">{stats.avgReps}</div>
              <div className="stat-label">Avg Reps</div>
            </div>
          </div>

          <div className="stat-card-dash highlight">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <div className="stat-value">{stats.mostFrequent || "N/A"}</div>
              <div className="stat-label">Most Frequent Exercise</div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3>📈 Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a1a",
                    border: "2px solid #ff4444",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="workouts"
                  stroke="#ff4444"
                  strokeWidth={3}
                  name="Workouts"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>📊 Volume Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a1a",
                    border: "2px solid #ff4444",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="volume" fill="#ff8844" name="Volume (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>🥧 Exercise Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.exerciseDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.exerciseDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1a1a1a",
                    border: "2px solid #ff4444",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h3>🕒 Recent Activity</h3>
          <div className="activity-list">
            {workouts &&
              workouts.slice(0, 5).map((workout) => (
                <div key={workout._id} className="activity-item">
                  <div className="activity-icon">💪</div>
                  <div className="activity-details">
                    <div className="activity-title">{workout.title}</div>
                    <div className="activity-info">
                      {workout.load} kg × {workout.reps} reps ={" "}
                      {workout.load * workout.reps} kg volume
                    </div>
                  </div>
                  <div className="activity-time">
                    {format(parseISO(workout.createdAt), "MMM dd, HH:mm")}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

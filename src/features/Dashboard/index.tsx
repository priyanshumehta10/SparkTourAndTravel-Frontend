import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useEffect } from "react";
import { fetchDashboardStatsRequest } from "./slice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStatsRequest());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading && <p>Loading stats...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-2xl">{stats.users}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Posts</h2>
            <p className="text-2xl">{stats.posts}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Sales</h2>
            <p className="text-2xl">{stats.sales}</p>
          </div>
        </div>
      )}
    </div>
  );
}

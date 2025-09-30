import { useEffect, useState } from "react";

type LeaderboardEntry = {
  userId: string;
  email: string;
  totalSessions: number;
  passedSessions: number;
  failedSessions: number;
  passingRate: number;
};

export function Leaderboards() {
  const [leaderboards, setLeaderboards] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboards() {
      const api = import.meta.env.VITE_BACKEND_API;

      try {
        const res = await fetch(`${api}/leaderboards/rates`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch leaderboards");
        }

        const data: LeaderboardEntry[] = await res.json();
        setLeaderboards(data);
      } catch (err) {
        setError("Error loading leaderboards");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboards();
  }, []);

  if (loading) return <p>Loading leaderboards...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Leaderboards</h1>
      {leaderboards.length === 0 ? (
        <p>No leaderboard data available</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Total Sessions</th>
              <th>Passed</th>
              <th>Failed</th>
              <th>Passing Rate (%)</th>
            </tr>
          </thead>
          <tbody>
            {leaderboards.map((entry) => (
              <tr key={entry.userId}>
                <td>{entry.email}</td>
                <td>{entry.totalSessions}</td>
                <td>{entry.passedSessions}</td>
                <td>{entry.failedSessions}</td>
                <td>{entry.passingRate.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

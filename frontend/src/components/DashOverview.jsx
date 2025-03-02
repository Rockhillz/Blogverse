import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const DashOverview = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/analytics/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <Box sx={{ maxWidth: "100%", px: { xs: 2, md: 5 }, py: 3 }}>
      {/* Stats Container */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
        {/* Total Posts Box */}
        <Paper elevation={3} sx={{ p: 3, width: "200px", textAlign: "center" }}>
          <Typography variant="h6">Total Posts</Typography>
          <Typography variant="h4" color="primary">{analytics?.totalPosts}</Typography>
        </Paper>

        {/* Recent Posts Box */}
        <Paper elevation={3} sx={{ p: 3, width: "200px", textAlign: "center" }}>
          <Typography variant="h6">Recent Posts</Typography>
          <Typography variant="h4" color="secondary">{analytics?.totalRecentPosts}</Typography>
        </Paper>
      </Box>

      {/* Posts by Tag Table */}
      <Typography variant="h6" gutterBottom textAlign="center">
        Posts by Tag
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: "600px", mx: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Tag</strong></TableCell>
              <TableCell align="right"><strong>Count</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(analytics?.postsByTag || {}).map(([tag, count]) => (
              <TableRow key={tag}>
                <TableCell>{tag}</TableCell>
                <TableCell align="right">{count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashOverview;

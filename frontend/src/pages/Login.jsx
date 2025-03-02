import React, { useState, useContext, useEffect } from "react";
import { Box, Typography, TextField, Button, Grid, CircularProgress, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext"; 

const Login = () => {
  const [title, setTitle] = useState("Login");
  useEffect(() => {
    document.title = `Login`;
  }, [title]);
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }


      login(data.token); // Update global authentication state

      navigate("/", { replace: true }); // Redirect to home page
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  return (
    <Container maxWidth="md" sx={{ display: "flex", mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Left Side: Welcome Message */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" gutterBottom>
                Welcome Back to BlogVerse
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Login to start sharing your thoughts.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleRegister}
              >
                Don't Have an Account? Register
              </Button>
            </Box>
          </Grid>

          {/* Right Side: Login Form */}
          <Grid item xs={12} md={6}>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h5" gutterBottom>
                Sign In
              </Typography>
              <TextField
                fullWidth
                label="Email or Username"
                name="emailOrUsername"
                type="text"
                value={formData.emailOrUsername}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />

              {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;

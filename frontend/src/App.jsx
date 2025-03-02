import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";
import SinglePostPage from "./pages/SinglePostPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavigationBar />
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<SinglePostPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/create-post"
            element={ 
            <ProtectedRoute>
              <CreatePost />
          </ProtectedRoute>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
      <Footer/>
    </Box>
  );
};

export default App;

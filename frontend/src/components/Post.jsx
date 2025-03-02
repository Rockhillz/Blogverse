import { useState, useEffect } from "react";
import BlogPostCard from "./BlogPostCard";
import {
  TextField,
  Box,
  Button,
  Grid2,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const [authorQuery, setAuthorQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPosts = async (search = "", tag = "", author = "") => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (tag) queryParams.append("tag", tag);
      if (author) queryParams.append("author", author);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/post/allPosts?${queryParams}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setPosts(Array.isArray(data) ? data : data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = () => {
    fetchPosts(searchQuery, tagQuery, authorQuery);
  };

  // Navigate to single page
  const navigateToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 3, px: 2 }}>
      {/* Search Fields */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        <TextField
          label="Search by Title"
          variant="outlined"
          size="small"
          sx={{ flex: 1, minWidth: 200 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TextField
          label="Search by Tag"
          variant="outlined"
          size="small"
          sx={{ flex: 1, minWidth: 200 }}
          value={tagQuery}
          onChange={(e) => setTagQuery(e.target.value)}
        />
        <TextField
          label="Search by Author"
          variant="outlined"
          size="small"
          sx={{ flex: 1, minWidth: 200 }}
          value={authorQuery}
          onChange={(e) => setAuthorQuery(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ minWidth: 120 }}
        >
          Search
        </Button>
      </Box>

      {/* Display Loading Spinner */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        // Display Posts in a Grid
        <Grid2 container spacing={3} justifyContent={"center"}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Grid2 item xs={12} sm={6} md={4} lg={4} key={post._id}>
                <BlogPostCard
                  title={post.title}
                  tags={post.tags || []}
                  content={post.content}
                  author={post.author?.username || "Unknown Author"}
                  func={() => navigateToPost(post._id)}
                />
              </Grid2>
            ))
          ) : (
            <Grid2 item xs={12}>
              <Typography variant="h6" textAlign="center">
                No posts found.
              </Typography>
            </Grid2>
          )}
        </Grid2>
      )}
    </Box>
  );
};

export default Post;

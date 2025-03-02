import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SinglePostCard from "../components/SinglePostCard";
import { CircularProgress, Box, Typography } from "@mui/material";

const SinglePostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/post/singlePost/${postId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 3, px: 2 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : post ? (
        <SinglePostCard
          title={post.title}
          content={post.content}
          author={post.author?.username || "Unknown Author"}
          date={post.createdAt}
          tags={post.tags || []}
        />
      ) : (
        <Typography variant="h6" textAlign="center">
          Post not found.
        </Typography>
      )}
    </Box>
  );
};

export default SinglePostPage;
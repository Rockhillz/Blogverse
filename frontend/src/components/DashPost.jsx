import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip} from "@mui/material";
import { jwtDecode } from "jwt-decode";

const DashPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);
  const [deletePostTitle, setDeletePostTitle] = useState("");
  const [currentPost, setCurrentPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
    tags: [],
    tagInput: "",
  });


  // Fetch posts on mount
  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const decodedToken = jwtDecode(token);
      const authorId = decodedToken.userId; // Extract userId from token
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/post/all-authors-post/${authorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete Confirmation passing the post ID
  const confirmDeletePost = (postId, postTitle) => {
    setDeletePostId(postId);
    setDeletePostTitle(postTitle);
  };

  // Delete Function
  const handleDelete = async () => {
    setDeleteLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/post/deletePost/${deletePostId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      await fetchPosts();
      setDeletePostId(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // When the edit button is clicked. adds the post to the to the editFormData state.
  const handleEditClick = (post) => {
    setCurrentPost(post);
    setEditFormData({
      title: post.title,
      content: post.content,
      tags: post.tags,
      tagInput: "",
    });
    setEditModalOpen(true);
  };

  // Edit Forms
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Add Tags
  const handleTagAdd = () => {
    if (editFormData.tagInput.trim() && !editFormData.tags.includes(editFormData.tagInput.trim())) {
      setEditFormData({
        ...editFormData,
        tags: [...editFormData.tags, editFormData.tagInput.trim()],
        tagInput: "",
      });
    }
  };
  
  // Delete the Tag
  const handleTagDelete = (tagToDelete) => {
    setEditFormData({
      ...editFormData,
      tags: editFormData.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  // Update the Content
  const handleEditSubmit = async () => {
    setUpdateLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/post/updatePost/${currentPost._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editFormData.title,
          content: editFormData.content,
          tags: editFormData.tags,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update post");
      }
  
      await fetchPosts();
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setUpdateLoading(false);
    }
  };
  

  if (loading) return <CircularProgress />;

  return (
    <Box>
      {posts.length === 0 ? (
        <Typography>No posts found.</Typography>
      ) : (
        posts.map((post) => (
          <Card key={post._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Button onClick={() => handleEditClick(post)} color="primary">
                Edit
              </Button>
              <Button onClick={() => confirmDeletePost(post._id, post.title)} color="error">
                Delete
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletePostId} onClose={() => setDeletePostId(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete: <strong>{deletePostTitle}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletePostId(null)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" disabled={deleteLoading}>
           {deleteLoading ? <CircularProgress size={24} /> : "Yes, Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={editFormData.title}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Content"
            name="content"
            value={editFormData.content}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Tags"
            value={editFormData.tagInput}
            onChange={(e) => setEditFormData({ ...editFormData, tagInput: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleTagAdd())} // Prevent form submission
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {editFormData.tags.map((tag) => (
              <Chip key={tag} label={tag} onDelete={() => handleTagDelete(tag)} />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary" disabled={loading}>
            {/** add loading spin */}
            {updateLoading? <CircularProgress size={24} /> : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashPosts;

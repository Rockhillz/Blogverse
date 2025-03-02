import { Card, CardContent, Typography, Chip, Avatar, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const BlogPostCard = ({ title, tags, content, author, avatar, func }) => {
  return (
    <Card 
      sx={{  
        width: "100%",
        maxWidth: 360,
        minWidth: 360, 
        height: 260,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        cursor: "pointer",
        position: "relative",
      }} 
      onClick={func}
    >
      <CardContent>
        {/* Title */}
        <Typography variant="h6" fontWeight="bold">{title}</Typography>

        {/* Tags */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} variant="outlined" size="small" />
          ))}
        </Box>

        {/* Content */}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {content.length > 100 ? (
              <>
                {content.substring(0, 100)}...
                <Typography component="span" variant="body2" color="primary" sx={{ cursor: "pointer", ml: 0.5 }}>
                  Read more
                </Typography>
              </>
            ) : (content)}
        </Typography>

        {/* Author Info */}
        <Box sx={{ position: "absolute", bottom: 10, left: 16, display: "flex", alignItems: "center" }}>
          <Avatar sx={{ mr: 1 }} src={avatar}>
            {!avatar && <PersonIcon />}
          </Avatar>
          <Typography variant="body2" fontWeight="bold">
            {author ? author.charAt(0).toUpperCase() + author.slice(1) : "Unknown Author"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;

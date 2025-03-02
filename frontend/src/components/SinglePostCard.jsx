import { Card, CardContent, Typography, Chip, Box, Avatar, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const SinglePostCard = ({ title, content, author, tags, avatar, date }) => {

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        {/* Title */}
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Author & Date Section (Left-Aligned) */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Avatar sx={{ mr: 1 }} src={avatar}>
            {!avatar && <PersonIcon />}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="bold">
            {author ? author.charAt(0).toUpperCase() + author.slice(1) : "Unknown Author"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formattedDate}
            </Typography>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

         {/* Tags */}
         <Box sx={{ mt: 1 }}>
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" sx={{ mr: 0.5 }} />
          ))}
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Content */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SinglePostCard;

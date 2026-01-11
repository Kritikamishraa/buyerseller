import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

export const mockBlogs = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `The Future of AI in Business Operations #${i + 1}`,
  excerpt:
    "Discover how AI is reshaping industries, from automating tasks to providing deep insights...",
  authorName:
    i % 3 === 0 ? "Jane Doe" : i % 3 === 1 ? "John Smith" : "Alex Ray",
  authorAvatar: `https://i.pravatar.cc/150?img=${i + 30}`,
  publishDate: `September ${Math.floor(Math.random() * 30) + 1}, 2025`,
  imageUrl: `https://picsum.photos/seed/blog${i + 1}/800/600`,
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const HomeBlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // show only 3 blogs on home
  const visibleBlogs = blogs.slice(0, 3);

  return (
    <Box
      sx={{
        background: "#fff",
        width: "100%",
      }}
    >
      <Container maxWidth="xl" sx={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        px: { xs: 3, sm: 6, md: 10, lg: 16 },
        py: { xs: 3, sm: 6, md: 8, lg: 10 },
      }}>
        {/* Section Title */}
        <Box textAlign="center">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "2.8rem" },
              color: "#101828",
              lineHeight: 1.3,
              mb: "10px",
            }}
          >
            Latest <Box component="span" sx={{ color: "#2E9E53" }}>Insights</Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#8b8e94",
              fontWeight: 400,
              fontSize: { xs: "1rem", md: "1.1rem" },
              maxWidth: 650,
              mx: "auto",
            }}
          >
            Explore our latest articles on technology, business, and innovation. Fresh perspectives and practical guides for your growth.
          </Typography>
        </Box>

        {loading && (
          <Box textAlign="center" sx={{ py: 6 }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading Blogs...</Typography>
          </Box>
        )}

        {!loading && (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Grid container spacing={4} justifyContent="center" alignItems="stretch">
                {visibleBlogs.map((blog) => (
                  <Grid item xs={12} sm={6} md={4} key={blog.id}>
                    <motion.div variants={itemVariants} style={{ height: "100%" }}>
                      <Card
                        sx={{
                          height: "100%",
                          boxShadow: "none",
                          display: "flex",
                          flexDirection: "column",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          borderRadius:"12px"
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={blog.imageUrl}
                          alt={blog.title}
                        />
                        <CardContent
                          sx={{
                            padding: "20px 20px",
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            borderLeft: "1px solid #e5e7eb",
                            borderRight: "1px solid #e5e7eb",
                            borderBottom: "1px solid #e5e7eb",
                            borderRadius: "0 0 12px 12px",                          
                          }}
                        >
                          <Typography
                            fontWeight={700}
                            gutterBottom
                            sx={{
                              color: "#111827",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              fontSize: "1.1rem"
                            }}
                          >
                            {blog.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              flexGrow: 1,
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 3,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {blog.excerpt}
                          </Typography>

                          {/* Read More Button */}
                          <Button
                            endIcon={<TrendingFlatIcon />}
                            component={RouterLink}
                            to={`/blogs/${blog.id}`}
                            variant="text"
                            sx={{
                              padding: "0",
                              marginTop: "12px",
                              alignSelf: "flex-start",
                              fontWeight: 500,
                              fontSize: "0.8rem",
                              color: "#2E9E53",
                              '&:hover': {
                                backgroundColor: 'transparent',
                              },
                            }}
                          >
                            Read More
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>

            {/* View All Blogs Button */}
            <Box textAlign="center" sx={{}}>
              <Button
                component={RouterLink}
                to="/blogs"
                variant="contained"
                sx={{
                  borderRadius: "50px",
                  px: 5,
                  py: 1.5,
                  fontWeight: 600,
                  bgcolor: "#0B4064",
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "1rem",
                  boxShadow: "none",
                  // "&:hover": {
                  //   bgcolor: "#218838",
                  //   boxShadow:"none",
                  // },
                }}
              >
                Explore All Blogs
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default HomeBlogSection;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   Avatar,
//   useTheme,
//   useMediaQuery,
//   Card,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   Button,
//   Container,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { Link as RouterLink } from "react-router-dom"; // 👈 Added
// import Navbar from "../Components/Navbar"; 
// import Footer from "../Components/Footer";

// // === 20 MOCK BLOG POSTS (SAMPLE DATA) ===
// const mockBlogs = Array.from({ length: 20 }, (_, i) => ({
//   id: i + 1,
//   title: `The Future of Innovation in Business Operations #${i + 1}`,
//   excerpt:
//     "Learn how innovation is changing the way businesses operate, making processes smarter and decisions more effective. A quick look into tomorrow...",
//   authorName:
//     i % 3 === 0 ? "Jane Doe" : i % 3 === 1 ? "John Smith" : "Alex Ray",
//   authorAvatar: `https://i.pravatar.cc/150?img=${i + 50}`,
//   publishDate: `September ${Math.floor(Math.random() * 30) + 1}, 2025`,
//   imageUrl: `https://picsum.photos/seed/${i + 1}/800/600`,
// }));

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.5,
//     },
//   },
// };

// const BlogPage = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // === HERO SECTION CONTENT ===
//   const titleText = "Tech & Business Insights";
//   const descriptionText =
//     "Get the latest updates on technology, business strategies, and market trends. Insights that help you stay ahead in a fast-changing world.";

//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setBlogs(mockBlogs);
//       setLoading(false);
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   const visibleBlogs = showAll ? blogs : blogs.slice(0, 6);

//   return (
//     <>
//       <Navbar />

//       {/* === HERO SECTION === */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           minHeight: "100vh",
//           position: "relative",
//           mt: { xs: "-56px", sm: "-64px" },
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundImage: `url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80")`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             filter: "brightness(0.35)",
//             zIndex: 1,
//           },
//         }}
//       >
//         <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
//           <Grid container spacing={5} alignItems="center">
//             <Grid item xs={12} md={8}>
//               <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
//                 <Typography
//                   variant="h2"
//                   fontWeight={800}
//                   gutterBottom
//                   sx={{
//                     color: "#fff",
//                     textShadow: "1px 1px 5px rgba(0,0,0,0.4)",
//                     fontSize: {
//                       xs: "2.5rem",
//                       sm: "3rem",
//                       md: "3.5rem",
//                       lg: "4rem",
//                     },
//                   }}
//                 >
//                   {titleText}
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   component="p"
//                   sx={{
//                     color: "rgba(255,255,255,0.9)",
//                     lineHeight: 1.8,
//                     fontSize: { xs: "1rem", md: "1.25rem" },
//                     maxWidth: "700px",
//                   }}
//                 >
//                   {descriptionText}
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* === BLOG POSTS LISTING SECTION === */}
//       <Box
//         sx={{
//           width: "100%",
//           bgcolor: "#f9fafb",
//           py: { xs: 6, md: 10 },
//           px: { xs: 2, sm: 4 },
//         }}
//       >
//         {loading && (
//           <Box textAlign="center" sx={{ py: 6 }}>
//             <CircularProgress />
//             <Typography sx={{ mt: 2 }}>Loading Articles...</Typography>
//           </Box>
//         )}

//         {error && (
//           <Typography color="error" align="center" sx={{ mb: 4 }}>
//             {error}
//           </Typography>
//         )}

//         {!loading && !error && (
//           <>
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <Grid
//                 container
//                 spacing={isMobile ? 3 : 4}
//                 justifyContent="center"
//                 alignItems="stretch"
//               >
//                 {visibleBlogs.length === 0 && !loading && (
//                   <Typography
//                     align="center"
//                     color="text.secondary"
//                     sx={{ mt: 4, width: "100%" }}
//                   >
//                     No articles available at the moment.
//                   </Typography>
//                 )}

//                 {visibleBlogs.map((blog) => (
//                   <Grid item xs={12} sm={6} md={4} key={blog.id}>
//                     <motion.div
//                       variants={itemVariants}
//                       style={{ height: "100%" }}
//                     >
//                       <Card
//                         sx={{
//                           height: "100%",
//                           borderRadius: "16px",
//                           boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                           display: "flex",
//                           flexDirection: "column",
//                           transition:
//                             "transform 0.3s ease, box-shadow 0.3s ease",
//                           "&:hover": {
//                             transform: "translateY(-8px)",
//                             boxShadow:
//                               "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
//                           },
//                         }}
//                       >
//                         <CardMedia
//                           component="img"
//                           height="200"
//                           image={blog.imageUrl}
//                           alt={blog.title}
//                         />
//                         <CardContent
//                           sx={{
//                             p: 3,
//                             flexGrow: 1,
//                             display: "flex",
//                             flexDirection: "column",
//                           }}
//                         >
//                           <Typography
//                             variant="h6"
//                             component="h3"
//                             fontWeight={700}
//                             gutterBottom
//                             sx={{
//                               color: "#111827",
//                               display: "-webkit-box",
//                               WebkitBoxOrient: "vertical",
//                               WebkitLineClamp: 2,
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                             }}
//                           >
//                             {blog.title}
//                           </Typography>
//                           <Typography
//                             variant="body2"
//                             color="text.secondary"
//                             sx={{
//                               my: 2,
//                               flexGrow: 1,
//                               display: "-webkit-box",
//                               WebkitBoxOrient: "vertical",
//                               WebkitLineClamp: 3,
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                             }}
//                           >
//                             {blog.excerpt}
//                           </Typography>

//                           {/* === Read More Button === */}
//                           <Box sx={{ mt: "auto", mb: 2 }}>
//                             <Button
//                               component={RouterLink}
//                               to={`/blogs/${blog.id}`}
//                               variant="outlined"
//                               size="small"
//                               sx={{
//                                 borderRadius: "20px",
//                                 px: 3,
//                                 fontWeight: 600,
//                                 textTransform: "none",
//                                 borderColor: "#28a745",
//                                 color: "#28a745",
//                                 "&:hover": {
//                                   bgcolor: "#28a745",
//                                   color: "#fff",
//                                 },
//                               }}
//                             >
//                               Read More →
//                             </Button>
//                           </Box>

//                           <Box
//                             sx={{
//                               mt: "auto",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 2,
//                               pt: 2,
//                               borderTop: "1px solid #f3f4f6",
//                             }}
//                           >
//                             <Avatar
//                               src={blog.authorAvatar}
//                               alt={blog.authorName}
//                               sx={{ width: 40, height: 40 }}
//                             />
//                             <Box>
//                               <Typography variant="subtitle2" fontWeight={600}>
//                                 {blog.authorName}
//                               </Typography>
//                               <Typography
//                                 variant="caption"
//                                 color="text.secondary"
//                               >
//                                 {blog.publishDate}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   </Grid>
//                 ))}
//               </Grid>
//             </motion.div>

//             {blogs.length > 6 && (
//               <Box textAlign="center" sx={{ mt: 6 }}>
//                 <Button
//                   variant="contained"
//                   onClick={() => setShowAll(!showAll)}
//                   sx={{
//                     borderRadius: "50px",
//                     px: 5,
//                     py: 1.5,
//                     fontWeight: 600,
//                     bgcolor: "#4caf50",
//                     color: "#fff",
//                     textTransform: "none",
//                     fontSize: "1rem",
//                     boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
//                     "&:hover": {
//                       bgcolor: "#388e3c",
//                       boxShadow: "0 6px 16px rgba(76, 175, 80, 0.4)",
//                       transform: "translateY(-2px)",
//                     },
//                   }}
//                 >
//                   {showAll ? "Show Less" : "Load More Articles"}
//                 </Button>
//               </Box>
//             )}
//           </>
//         )}
//       </Box>
//       <Footer />
//     </>
//   );
// };

// export default BlogPage;

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Button,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom"; // 👈 Added
import Navbar from "../Components/Navbar"; 
import Footer from "../Components/Footer";

// === 20 MOCK BLOG POSTS (SAMPLE DATA) ===
const mockBlogs = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `The Future of Innovation in Business Operations #${i + 1}`,
  excerpt:
    "Learn how innovation is changing the way businesses operate, making processes smarter and decisions more effective. A quick look into tomorrow...",
  authorName:
    i % 3 === 0 ? "Jane Doe" : i % 3 === 1 ? "John Smith" : "Alex Ray",
  authorAvatar: `https://i.pravatar.cc/150?img=${i + 50}`,
  publishDate: `September ${Math.floor(Math.random() * 30) + 1}, 2025`,
  imageUrl: `https://picsum.photos/seed/${i + 1}/800/600`,
}));

// Animation variants
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

const BlogPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // === HERO SECTION CONTENT ===
  const titleText = "Tech & Business Insights";
  const descriptionText =
    "Get the latest updates on technology, business strategies, and market trends. Insights that help you stay ahead in a fast-changing world.";

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const visibleBlogs = showAll ? blogs : blogs.slice(0, 6);

  return (
    <>
      <Navbar />

      {/* === HERO SECTION === */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
          position: "relative",
          mt: { xs: "-56px", sm: "-64px" },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.35)",
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Typography
                  variant="h2"
                  fontWeight={800}
                  gutterBottom
                  sx={{
                    color: "#fff",
                    textShadow: "1px 1px 5px rgba(0,0,0,0.4)",
                    fontSize: {
                      xs: "2.5rem",
                      sm: "3rem",
                      md: "3.5rem",
                      lg: "4rem",
                    },
                  }}
                >
                  {titleText}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.8,
                    fontSize: { xs: "1rem", md: "1.25rem" },
                    maxWidth: "700px",
                  }}
                >
                  {descriptionText}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* === BLOG POSTS LISTING SECTION === */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#f9fafb",
          py: { xs: 6, md: 10 },
          px: { xs: 2, sm: 4 },
        }}
      >
        {loading && (
          <Box textAlign="center" sx={{ py: 6 }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading Articles...</Typography>
          </Box>
        )}

        {error && (
          <Typography color="error" align="center" sx={{ mb: 4 }}>
            {error}
          </Typography>
        )}

        {!loading && !error && (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Grid
                container
                spacing={isMobile ? 3 : 4}
                justifyContent="center"
                alignItems="stretch"
              >
                {visibleBlogs.length === 0 && !loading && (
                  <Typography
                    align="center"
                    color="text.secondary"
                    sx={{ mt: 4, width: "100%" }}
                  >
                    No articles available at the moment.
                  </Typography>
                )}

                {visibleBlogs.map((blog) => (
                  <Grid item xs={12} sm={6} md={4} key={blog.id}>
                    <motion.div
                      variants={itemVariants}
                      style={{ height: "100%" }}
                    >
                      <Card
                        sx={{
                          height: "100%",
                          borderRadius: "16px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          display: "flex",
                          flexDirection: "column",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow:
                              "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                          },
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
                            p: 3,
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="h3"
                            fontWeight={700}
                            gutterBottom
                            sx={{
                              color: "#111827",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {blog.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              my: 2,
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

                          {/* === Read More Button === */}
                          <Box sx={{ mt: "auto", mb: 2 }}>
                            <Button
                              component={RouterLink}
                              to={`/blogs/${blog.id}`}
                              variant="outlined"
                              size="small"
                              sx={{
                                borderRadius: "20px",
                                px: 3,
                                fontWeight: 600,
                                textTransform: "none",
                                borderColor: "#28a745",
                                color: "#28a745",
                                "&:hover": {
                                  bgcolor: "#28a745",
                                  color: "#fff",
                                },
                              }}
                            >
                              Read More →
                            </Button>
                          </Box>

                          <Box
                            sx={{
                              mt: "auto",
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              pt: 2,
                              borderTop: "1px solid #f3f4f6",
                            }}
                          >
                            <Avatar
                              src={blog.authorAvatar}
                              alt={blog.authorName}
                              sx={{ width: 40, height: 40 }}
                            />
                            <Box>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {blog.authorName}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {blog.publishDate}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>

            {blogs.length > 6 && (
              <Box textAlign="center" sx={{ mt: 6 }}>
                <Button
                  variant="contained"
                  onClick={() => setShowAll(!showAll)}
                  sx={{
                    borderRadius: "50px",
                    px: 5,
                    py: 1.5,
                    fontWeight: 600,
                    bgcolor: "#4caf50",
                    color: "#fff",
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
                    "&:hover": {
                      bgcolor: "#388e3c",
                      boxShadow: "0 6px 16px rgba(76, 175, 80, 0.4)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {showAll ? "Show Less" : "Load More Articles"}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default BlogPage;

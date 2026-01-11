// import React from "react";
// import { useParams, Link as RouterLink } from "react-router-dom";
// import {
//   Box,
//   Container,
//   Typography,
//   Avatar,
//   Button,
//   Divider,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   IconButton,
//   Chip,
// } from "@mui/material";
// import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";

// // === Updated Mock Data ===
// const mockBlogs = Array.from({ length: 20 }, (_, i) => ({
//   id: i + 1,
//   title: `The Future of Innovation in Business Operations #${i + 1}`,
//   content: `
// In today’s fast-changing world, businesses can no longer rely only on traditional
// methods. To grow and remain competitive, companies are embracing new ways of working,
// modern technologies, and customer-focused strategies.

// 🌟 Section 1: Why Innovation Matters
// ------------------------------------
// Innovation is about rethinking processes, building smarter workflows, and creating
// better customer experiences. 
// - Companies that innovate grow 3x faster than competitors.
// - Modern tools help reduce costs and improve efficiency.
// - Innovation builds resilience in uncertain markets.

// 📊 Section 2: Key Trends in Modern Business
// -------------------------------------------
// 1. Digital-First Operations  
//    Businesses are replacing paper-heavy tasks with cloud-based and mobile solutions.  
//    Example: Retailers offering virtual product try-ons.

// 2. Data-Driven Decisions  
//    Organizations rely on analytics for planning, customer insights, and forecasting.  
//    Example: Netflix predicting what viewers will enjoy.

// 3. Remote & Hybrid Work  
//    Tools for collaboration are shaping the way teams operate globally.  
//    Example: Global firms using real-time communication platforms.

// 4. Sustainability & Green Growth  
//    Companies are embedding eco-friendly practices to attract environmentally aware customers.  
//    Example: Tesla’s commitment to renewable energy.

// 💡 Section 3: Real-World Case Studies
// -------------------------------------
// - Amazon: Transformed logistics with advanced automation.  
// - Zoom: Became the global standard for virtual communication.  
// - Unilever: Gained loyalty through sustainability campaigns.

// ✅ Section 4: Challenges to Overcome
// ------------------------------------
// - Adapting employees to new ways of working.  
// - High initial costs of transformation.  
// - Ensuring security in digital ecosystems.

// 🚀 Section 5: The Road Ahead
// ----------------------------
// The next decade will highlight:  
// - Personalized customer experiences.  
// - Automated and flexible supply chains.  
// - More immersive digital workplaces.

// 📌 Conclusion
// ------------
// Innovation is the key to progress. Businesses that adapt, experiment, and evolve
// will not only survive but thrive in a competitive environment. 
// The future belongs to those who embrace change with confidence.
// `,
//   authorName:
//     i % 3 === 0 ? "Jane Doe" : i % 3 === 1 ? "John Smith" : "Alex Ray",
//   authorAvatar: `https://i.pravatar.cc/150?img=${i + 50}`,
//   publishDate: `September ${Math.floor(Math.random() * 30) + 1}, 2025`,
//   imageUrl: `https://picsum.photos/seed/${i + 1}/1920/1080`,
// }));

// const BlogDetails = () => {
//   const { id } = useParams();
//   const blog = mockBlogs.find((b) => b.id === parseInt(id));

//   if (!blog) {
//     return (
//       <Box textAlign="center" mt={10}>
//         <Typography variant="h2" color="error">
//           Blog not found
//         </Typography>
//         <Button
//           component={RouterLink}
//           to="/blogs"
//           variant="contained"
//           sx={{ mt: 2 }}
//         >
//           Back to Blogs
//         </Button>
//       </Box>
//     );
//   }

//   // Related posts (excluding current blog)
//   const relatedPosts = mockBlogs
//     .filter((b) => b.id !== blog.id)
//     .sort(() => 0.5 - Math.random())
//     .slice(0, 3);

//   return (
//     <>
//       <Navbar />

//       <Box
//         sx={{
//           position: "relative",
//           width: "100%",
//           height: { xs: "100vh", md: "100vh" },
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           color: "#fff",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             inset: 0,
//             backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url(${blog.imageUrl})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             zIndex: 1,
//           },
//         }}
//       >
//         <Container sx={{ position: "relative", zIndex: 2 }}>
//           <Box sx={{ maxWidth: "800px" }}>
//             <Chip
//               label="Business Insights"
//               sx={{
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 color: "#fff",
//                 mb: 2,
//                 fontWeight: 600,
//               }}
//             />
//             <Typography
//               variant="h2"
//               fontWeight={800}
//               gutterBottom
//               sx={{
//                 textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
//                 fontSize: { xs: "2rem", md: "3.5rem" },
//               }}
//             >
//               {blog.title}
//             </Typography>

//             {/* Author + Date Info */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
//               <Avatar
//                 src={blog.authorAvatar}
//                 alt={blog.authorName}
//                 sx={{ width: 56, height: 56, border: "2px solid #fff" }}
//               />
//               <Box>
//                 <Typography variant="subtitle1" fontWeight={600}>
//                   {blog.authorName}
//                 </Typography>
//                 <Typography variant="caption">{blog.publishDate}</Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Container>
//       </Box>

//       {/* === CONTENT SECTION === */}
//       <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "#f9fafb" }}>
//         <Container maxWidth="md">
//           {/* Blog Content */}
//           <Typography
//             variant="body1"
//             sx={{
//               lineHeight: 1.9,
//               whiteSpace: "pre-line",
//               color: "#333",
//               fontSize: "1.15rem",
//               mb: 6,
//               fontFamily: "Poppins, sans-serif",
//             }}
//           >
//             {blog.content}
//           </Typography>

//           {/* Social Share */}
//           <Box textAlign="center" mb={8}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
//               Share this article
//             </Typography>
//             <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
//               <IconButton
//                 sx={{
//                   bgcolor: "#1877f2",
//                   color: "#fff",
//                   "&:hover": { bgcolor: "#145dbf" },
//                 }}
//               >
//                 <Facebook />
//               </IconButton>
//               <IconButton
//                 sx={{
//                   bgcolor: "#1da1f2",
//                   color: "#fff",
//                   "&:hover": { bgcolor: "#0d8ddb" },
//                 }}
//               >
//                 <Twitter />
//               </IconButton>
//               <IconButton
//                 sx={{
//                   bgcolor: "#0077b5",
//                   color: "#fff",
//                   "&:hover": { bgcolor: "#005983" },
//                 }}
//               >
//                 <LinkedIn />
//               </IconButton>
//             </Box>
//           </Box>

//           <Divider sx={{ mb: 8 }} />

//           {/* Related Posts */}
//           <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 4 }}>
//             Related Articles
//           </Typography>
//           <Grid container spacing={4}>
//             {relatedPosts.map((post) => (
//               <Grid item xs={12} sm={6} md={4} key={post.id}>
//                 <Card
//                   component={RouterLink}
//                   to={`/blogs/${post.id}`}
//                   sx={{
//                     textDecoration: "none",
//                     borderRadius: 3,
//                     overflow: "hidden",
//                     boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
//                     transition: "0.3s",
//                     "&:hover": { transform: "translateY(-6px)" },
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     height="160"
//                     image={post.imageUrl}
//                     alt={post.title}
//                   />
//                   <CardContent sx={{ p: 2 }}>
//                     <Typography
//                       variant="subtitle1"
//                       fontWeight={600}
//                       sx={{
//                         display: "-webkit-box",
//                         WebkitLineClamp: 2,
//                         WebkitBoxOrient: "vertical",
//                         overflow: "hidden",
//                         color: "#111827",
//                       }}
//                     >
//                       {post.title}
//                     </Typography>
//                     <Typography
//                       variant="caption"
//                       color="text.secondary"
//                       sx={{ mt: 1, display: "block" }}
//                     >
//                       {post.publishDate}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Back Button */}
//           <Box textAlign="center" mt={8}>
//             <Button
//               component={RouterLink}
//               to="/blogs"
//               variant="contained"
//               sx={{
//                 borderRadius: "30px",
//                 px: 5,
//                 py: 1.3,
//                 fontWeight: 600,
//                 fontSize: "1rem",
//                 bgcolor: "#4caf50",
//                 "&:hover": { bgcolor: "#388e3c" },
//               }}
//             >
//               ← Back to Blogs
//             </Button>
//           </Box>
//         </Container>
//       </Box>

//       <Footer />
//     </>
//   );
// };

// export default BlogDetails;

import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  Divider,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// === Updated Mock Data ===
const mockBlogs = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `The Future of Innovation in Business Operations #${i + 1}`,
  content: `
In today’s fast-changing world, businesses can no longer rely only on traditional
methods. To grow and remain competitive, companies are embracing new ways of working,
modern technologies, and customer-focused strategies.

🌟 Section 1: Why Innovation Matters
------------------------------------
Innovation is about rethinking processes, building smarter workflows, and creating
better customer experiences. 
- Companies that innovate grow 3x faster than competitors.
- Modern tools help reduce costs and improve efficiency.
- Innovation builds resilience in uncertain markets.

📊 Section 2: Key Trends in Modern Business
-------------------------------------------
1. Digital-First Operations  
   Businesses are replacing paper-heavy tasks with cloud-based and mobile solutions.  
   Example: Retailers offering virtual product try-ons.

2. Data-Driven Decisions  
   Organizations rely on analytics for planning, customer insights, and forecasting.  
   Example: Netflix predicting what viewers will enjoy.

3. Remote & Hybrid Work  
   Tools for collaboration are shaping the way teams operate globally.  
   Example: Global firms using real-time communication platforms.

4. Sustainability & Green Growth  
   Companies are embedding eco-friendly practices to attract environmentally aware customers.  
   Example: Tesla’s commitment to renewable energy.

💡 Section 3: Real-World Case Studies
-------------------------------------
- Amazon: Transformed logistics with advanced automation.  
- Zoom: Became the global standard for virtual communication.  
- Unilever: Gained loyalty through sustainability campaigns.

✅ Section 4: Challenges to Overcome
------------------------------------
- Adapting employees to new ways of working.  
- High initial costs of transformation.  
- Ensuring security in digital ecosystems.

🚀 Section 5: The Road Ahead
----------------------------
The next decade will highlight:  
- Personalized customer experiences.  
- Automated and flexible supply chains.  
- More immersive digital workplaces.

📌 Conclusion
------------
Innovation is the key to progress. Businesses that adapt, experiment, and evolve
will not only survive but thrive in a competitive environment. 
The future belongs to those who embrace change with confidence.
`,
  authorName:
    i % 3 === 0 ? "Jane Doe" : i % 3 === 1 ? "John Smith" : "Alex Ray",
  authorAvatar: `https://i.pravatar.cc/150?img=${i + 50}`,
  publishDate: `September ${Math.floor(Math.random() * 30) + 1}, 2025`,
  imageUrl: `https://picsum.photos/seed/${i + 1}/1920/1080`,
}));

const BlogDetails = () => {
  const { id } = useParams();
  const blog = mockBlogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h2" color="error">
          Blog not found
        </Typography>
        <Button
          component={RouterLink}
          to="/blogs"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Blogs
        </Button>
      </Box>
    );
  }

  // Related posts (excluding current blog)
  const relatedPosts = mockBlogs
    .filter((b) => b.id !== blog.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "100vh", md: "100vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          color: "#fff",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url(${blog.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ maxWidth: "800px" }}>
            <Chip
              label="Business Insights"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "#fff",
                mb: 2,
                fontWeight: 600,
              }}
            />
            <Typography
              variant="h2"
              fontWeight={800}
              gutterBottom
              sx={{
                textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
                fontSize: { xs: "2rem", md: "3.5rem" },
              }}
            >
              {blog.title}
            </Typography>

            {/* Author + Date Info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
              <Avatar
                src={blog.authorAvatar}
                alt={blog.authorName}
                sx={{ width: 56, height: 56, border: "2px solid #fff" }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {blog.authorName}
                </Typography>
                <Typography variant="caption">{blog.publishDate}</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* === CONTENT SECTION === */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "#f9fafb" }}>
        <Container maxWidth="md">
          {/* Blog Content */}
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.9,
              whiteSpace: "pre-line",
              color: "#333",
              fontSize: "1.15rem",
              mb: 6,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {blog.content}
          </Typography>

          {/* Social Share */}
          <Box textAlign="center" mb={8}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              Share this article
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <IconButton
                sx={{
                  bgcolor: "#1877f2",
                  color: "#fff",
                  "&:hover": { bgcolor: "#145dbf" },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "#1da1f2",
                  color: "#fff",
                  "&:hover": { bgcolor: "#0d8ddb" },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "#0077b5",
                  color: "#fff",
                  "&:hover": { bgcolor: "#005983" },
                }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ mb: 8 }} />

          {/* Related Posts */}
          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 4 }}>
            Related Articles
          </Typography>
          <Grid container spacing={4}>
            {relatedPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card
                  component={RouterLink}
                  to={`/blogs/${post.id}`}
                  sx={{
                    textDecoration: "none",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                    transition: "0.3s",
                    "&:hover": { transform: "translateY(-6px)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={post.imageUrl}
                    alt={post.title}
                  />
                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        color: "#111827",
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 1, display: "block" }}
                    >
                      {post.publishDate}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Back Button */}
          <Box textAlign="center" mt={8}>
            <Button
              component={RouterLink}
              to="/blogs"
              variant="contained"
              sx={{
                borderRadius: "30px",
                px: 5,
                py: 1.3,
                fontWeight: 600,
                fontSize: "1rem",
                bgcolor: "#4caf50",
                "&:hover": { bgcolor: "#388e3c" },
              }}
            >
              ← Back to Blogs
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default BlogDetails;

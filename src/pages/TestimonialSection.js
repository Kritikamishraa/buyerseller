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
//   Rating,
//   CircularProgress,
//   Button,
//   Container, // Added Container to imports
// } from "@mui/material";
// import { motion } from "framer-motion";
// import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
// import Navbar from "../Components/Navbar";
// // We are removing HeaderSection, so this import is no longer needed
// // import HeaderSection from "../pages/HeaderSection";

// // === 20 MOCK TESTIMONIALS (SAMPLE DATA) ===
// const mockTestimonials = Array.from({ length: 20 }, (_, i) => ({
//   id: i + 1,
//   name: `Customer Name ${i + 1}`,
//   role: i % 3 === 0 ? "Startup Founder" : (i % 3 === 1 ? "Marketing Head" : "Tech Lead"),
//   avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
//   quote: "BizBridge has completely transformed our workflow. Their AI tools are intuitive and powerful, saving us countless hours. Highly recommended for any growing business!",
//   rating: 4.5 + (i % 5) / 10,
// }));

// // Animation variants for Framer Motion
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

// const TestimonialSection = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const imageUrl = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80";
//   const titleText = "What Our Clients Say";
//   const descriptionText = "Discover how businesses like yours have achieved success and growth by partnering with BizBridge. Real stories, real results.";

//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setTestimonials(mockTestimonials);
//       setLoading(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 6);

//   return (
//     <>
//       <Navbar />
      
//       {/* === HERO SECTION (NEW CODE ADDED) === */}
//       {/* The old HeaderSection component has been replaced with this Box */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           minHeight: "100vh",
//           py: { xs: 8, md: 10 },
//           position: 'relative',
//           // Using the responsive margin from the original file
//           mt: { xs: '-56px', sm: '-64px' }, 
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0, left: 0, right: 0, bottom: 0,
//             backgroundImage: `url(${imageUrl})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             filter: 'brightness(0.3)',
//             zIndex: 1,
//           },
//         }}
//       >
//         <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
//           <Grid container spacing={5} alignItems="center">
//             <Grid item xs={12} md={8}>
//               <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
//                 <Typography
//                   variant="h1"
//                   fontWeight={800}
//                   gutterBottom
//                   sx={{
//                     color: '#fff', 
//                     textShadow: '1px 1px 5px rgba(0,0,0,0.3)',
//                     fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem', lg: '4.5rem' }
//                   }}
//                 >
//                   {titleText}
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   component="p"
//                   sx={{
//                     color: 'rgba(255,255,255,0.9)',
//                     lineHeight: 1.8,
//                     fontSize: { xs: '1rem', md: '1.25rem' }
//                   }}
//                 >
//                   {descriptionText}
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* === TESTIMONIALS LISTING SECTION (No changes here) === */}
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
//             <Typography sx={{ mt: 2 }}>Loading Testimonials...</Typography>
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
//                 {visibleTestimonials.length === 0 && !loading && (
//                   <Typography align="center" color="text.secondary" sx={{ mt: 4, width: '100%' }}>
//                     No testimonials available at the moment.
//                   </Typography>
//                 )}

//                 {visibleTestimonials.map((t) => (
//                   <Grid item xs={12} sm={6} md={4} key={t.id}>
//                     <motion.div variants={itemVariants} style={{ height: '100%' }}>
//                       <Card
//                         sx={{
//                           height: "100%",
//                           borderRadius: "16px",
//                           boxShadow: "none",
//                           border: "1px solid #e5e7eb",
//                           display: 'flex',
//                           flexDirection: 'column',
//                           transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
//                           '&:hover': {
//                             transform: 'translateY(-8px)',
//                             boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
//                             borderColor: '#4caf50',
//                           }
//                         }}
//                       >
//                         <CardContent sx={{ textAlign: "left", p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
//                           <FormatQuoteIcon sx={{ color: '#4caf50', fontSize: 48, mb: 2 }} />
//                           <Typography
//                             variant="body1"
//                             color="#374151"
//                             sx={{ fontStyle: 'italic', mb: 3, flexGrow: 1 }}
//                           >
//                             {`"${t.quote}"`}
//                           </Typography>
                          
//                           <Box sx={{ mt: 'auto' }}>
//                             <Rating value={t.rating} readOnly precision={0.5} size="small" sx={{ mb: 2 }} />
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                               <Avatar
//                                 src={t.avatar}
//                                 alt={t.name}
//                                 sx={{ width: 48, height: 48 }}
//                               />
//                               <Box>
//                                 <Typography variant="subtitle1" fontWeight={700}>
//                                   {t.name}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                   {t.role}
//                                 </Typography>
//                               </Box>
//                             </Box>
//                           </Box>
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   </Grid>
//                 ))}
//               </Grid>
//             </motion.div>

//             {testimonials.length > 6 && (
//               <Box textAlign="center" sx={{ mt: 6 }}>
//                 <Button
//                   variant="contained"
//                   onClick={() => setShowAll(!showAll)}
//                   sx={{
//                     borderRadius: "50px",
//                     px: 5,
//                     py: 1.5,
//                     fontWeight: 600,
//                     bgcolor: '#4caf50',
//                     color: '#fff',
//                     textTransform: 'none',
//                     fontSize: '1rem',
//                     boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
//                     '&:hover': {
//                       bgcolor: '#388e3c',
//                       boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)',
//                       transform: 'translateY(-2px)'
//                     }
//                   }}
//                 >
//                   {showAll ? "Show Less" : "Load More Testimonials"}
//                 </Button>
//               </Box>
//             )}
//           </>
//         )}
//       </Box>
//     </>
//   );
// };

// export default TestimonialSection;

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
  Rating,
  CircularProgress,
  Button,
  Container, // Added Container to imports
} from "@mui/material";
import { motion } from "framer-motion";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Navbar from "../Components/Navbar";
// We are removing HeaderSection, so this import is no longer needed
// import HeaderSection from "../pages/HeaderSection";

// === 20 MOCK TESTIMONIALS (SAMPLE DATA) ===
const mockTestimonials = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Customer Name ${i + 1}`,
  role: i % 3 === 0 ? "Startup Founder" : (i % 3 === 1 ? "Marketing Head" : "Tech Lead"),
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  quote: "BizBridge has completely transformed our workflow. Their AI tools are intuitive and powerful, saving us countless hours. Highly recommended for any growing business!",
  rating: 4.5 + (i % 5) / 10,
}));

// Animation variants for Framer Motion
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

const TestimonialSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const imageUrl = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80";
  const titleText = "What Our Clients Say";
  const descriptionText = "Discover how businesses like yours have achieved success and growth by partnering with BizBridge. Real stories, real results.";

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setTestimonials(mockTestimonials);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 6);

  return (
    <>
      <Navbar />
      
      {/* === HERO SECTION (NEW CODE ADDED) === */}
      {/* The old HeaderSection component has been replaced with this Box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
          py: { xs: 8, md: 10 },
          position: 'relative',
          // Using the responsive margin from the original file
          mt: { xs: '-56px', sm: '-64px' }, 
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h1"
                  fontWeight={800}
                  gutterBottom
                  sx={{
                    color: '#fff', 
                    textShadow: '1px 1px 5px rgba(0,0,0,0.3)',
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem', lg: '4.5rem' }
                  }}
                >
                  {titleText}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1.8,
                    fontSize: { xs: '1rem', md: '1.25rem' }
                  }}
                >
                  {descriptionText}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* === TESTIMONIALS LISTING SECTION (No changes here) === */}
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
            <Typography sx={{ mt: 2 }}>Loading Testimonials...</Typography>
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
                {visibleTestimonials.length === 0 && !loading && (
                  <Typography align="center" color="text.secondary" sx={{ mt: 4, width: '100%' }}>
                    No testimonials available at the moment.
                  </Typography>
                )}

                {visibleTestimonials.map((t) => (
                  <Grid item xs={12} sm={6} md={4} key={t.id}>
                    <motion.div variants={itemVariants} style={{ height: '100%' }}>
                      <Card
                        sx={{
                          height: "100%",
                          borderRadius: "16px",
                          boxShadow: "none",
                          border: "1px solid #e5e7eb",
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                            borderColor: '#4caf50',
                          }
                        }}
                      >
                        <CardContent sx={{ textAlign: "left", p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <FormatQuoteIcon sx={{ color: '#4caf50', fontSize: 48, mb: 2 }} />
                          <Typography
                            variant="body1"
                            color="#374151"
                            sx={{ fontStyle: 'italic', mb: 3, flexGrow: 1 }}
                          >
                            {`"${t.quote}"`}
                          </Typography>
                          
                          <Box sx={{ mt: 'auto' }}>
                            <Rating value={t.rating} readOnly precision={0.5} size="small" sx={{ mb: 2 }} />
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Avatar
                                src={t.avatar}
                                alt={t.name}
                                sx={{ width: 48, height: 48 }}
                              />
                              <Box>
                                <Typography variant="subtitle1" fontWeight={700}>
                                  {t.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {t.role}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>

            {testimonials.length > 6 && (
              <Box textAlign="center" sx={{ mt: 6 }}>
                <Button
                  variant="contained"
                  onClick={() => setShowAll(!showAll)}
                  sx={{
                    borderRadius: "50px",
                    px: 5,
                    py: 1.5,
                    fontWeight: 600,
                    bgcolor: '#4caf50',
                    color: '#fff',
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                    '&:hover': {
                      bgcolor: '#388e3c',
                      boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {showAll ? "Show Less" : "Load More Testimonials"}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default TestimonialSection;
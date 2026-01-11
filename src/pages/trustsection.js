// import React from "react";

// import {
//   Box,
//   Grid,
//   Container,
//   Typography,
// } from "@mui/material";

// import Navbar from "../Components/Navbar";



// // === Services Data (from first code features) ===
// const servicesData = [
//   {
//     id: 1,
//     title: "Seller Dashboard",
//     description:
//       "The Seller Dashboard serves as a centralized hub that provides a clear overview of your business activities. It displays key insights such as the total number of buyers, active orders, and pending payments in a simplified format. With quick-access shortcuts, sellers can efficiently generate invoices, track transactions, and review top-performing products. Its intuitive design helps streamline operations, enabling faster decision-making and improved business performance.",
//     image:
//       "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 2,
//     title: "Catalog Management",
//     description:
//       "Catalog Management enables sellers to efficiently add, edit, and organize their product listings with precision. Products can be tailored with buyer-specific visibility, pricing controls, and flexible updates. This ensures that the right products reach the right audience at the right time. By simplifying catalog operations, sellers save time while enhancing the overall buying experience.",
//     image:
//       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 3,
//     title: "Buyer Categorization",
//     description:
//       "The Buyer Categorization feature allows sellers to classify buyers into meaningful groups such as retailers, distributors, or wholesalers. Each category can be assigned customized pricing rules and percentage-based discounts to suit different business needs. This segmentation ensures better personalization, loyalty, and more targeted sales strategies. By understanding buyer types, sellers can build stronger relationships and boost profitability.",
//     image:
//       "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 4,
//     title: "Creditworthiness Indicator",
//     description:
//       "The Creditworthiness Indicator provides valuable insights into each buyer’s reliability and payment behavior. It generates a credit score based on purchase history and payment timelines, helping sellers minimize risks. With this data, sellers can make more confident decisions about extending credit or setting order limits. Ultimately, it improves trust while safeguarding against financial losses.",
//     image:
//       "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//   id: 5,
//   title: "Kiosk & QR Mode",
//   description:
//     "Kiosk & QR Mode enables sellers to extend their reach directly to consumers in a fast and modern way. By generating a unique QR code, businesses can allow buyers to instantly scan, browse catalogs, and place orders without intermediaries. This feature is perfect for in-store promotions, exhibitions, or pop-up sales. It bridges the gap between offline and online trade, making buying seamless and accessible.",
//   image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
// },

//   {
//     id: 6,
//     title: "Advertisement Module",
//     description:
//       "The Advertisement Module empowers sellers to run highly targeted in-app promotional campaigns. With a dedicated Ad Wallet, businesses can control budgets, track campaign performance, and optimize reach. This feature helps attract new buyers while keeping existing customers engaged with tailored offers. It’s a cost-effective solution for scaling visibility and driving consistent growth.",
//     image:
//       "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 7,
//     title: "Buyer Dashboard",
//     description:
//     "The Buyer Dashboard is your personal command center, designed to streamline every aspect of your purchasing journey. You can effortlessly track your orders in real-time, from the moment they are shipped until they arrive at your doorstep. Access your complete purchase history for easy record-keeping and manage all your profile details with just a few clicks. It's everything you need, all in one convenient and user-friendly hub.",
//     image:
//       "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 8,
//     title: "Buyer-Seller Chat",
//     description:
//       "The Buyer-Seller Chat feature offers a secure, built-in communication channel for smooth interactions. Sellers can address product queries, discuss order details, and resolve issues instantly. This direct communication fosters trust, reduces delays, and strengthens long-term customer relationships. By integrating chat into the platform, sellers enhance both transparency and buyer satisfaction.",
//     image:
//       "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
//   },
// ];

// const Services = () => {
//   return (
//     <>
//           <Navbar />
    
//        {/* === HERO SECTION === */}
//      <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           minHeight: "100vh",
//           py: { xs: 8, md: 10 },
//           position: 'relative',
//           mt: "-64px",
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0, left: 0, right: 0, bottom: 0,
//             backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1484&q=80)',
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
//                   Our Services
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
// BizBridge delivers powerful tools to digitize your trade, streamline operations, and boost business growth.
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
   

//       {/* === Services Section === */}
//       <Container sx={{ pt: 8, pb: 10 }}>
//         {servicesData.map((service, index) => (
//           <Grid
//             container
//             spacing={4}
//             alignItems="center"
//             justifyContent="center"
//             sx={{ mb: { xs: 6, md: 10 } }}
//             key={service.id}
//           >
//             {/* Image */}
//             <Grid
//               item
//               xs={12}
//               md={5}
//               order={{ xs: 2, md: index % 2 === 0 ? 1 : 2 }}
//             >
//               <Box
//                 component="img"
//                 src={service.image}
//                 alt={service.title}
//                 sx={{
//                   width: "100%",
//                   height: { xs: 250, md: 350 },
//                   objectFit: "cover",
//                   borderRadius: "12px",
//                   boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
//                 }}
//               />
//             </Grid>

//             <Grid
//               item
//               xs={12}
//               md={7}
//               order={{ xs: 1, md: index % 2 === 0 ? 2 : 1 }}
//             >
//               <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
//                 <Typography
//                   variant="h3"
//                   sx={{
//                     fontWeight: 800,
//                     mb: 2,
//                     fontSize: { xs: "2rem", md: "2.5rem" },
//                     color: "#101828",
//                     textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
//                   }}
//                 >
//                   {service.title}
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     color: "#555",
//                     fontSize: { xs: "1rem", md: "1.15rem" },
//                     lineHeight: 1.7,
//                     maxWidth: 700,
//                   }}
//                 >
//                   {service.description}
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         ))}
//       </Container>

//           <Box sx={{ borderTop: "none", mt: 4 }}>
//         {/* <Footer /> */}
//       </Box>

//     </>
//   );
// };

// export default Services;

import React from "react";

import {
  Box,
  Grid,
  Container,
  Typography,
} from "@mui/material";

import Navbar from "../Components/Navbar";



// === Services Data (from first code features) ===
const servicesData = [
  {
    id: 1,
    title: "Seller Dashboard",
    description:
      "The Seller Dashboard serves as a centralized hub that provides a clear overview of your business activities. It displays key insights such as the total number of buyers, active orders, and pending payments in a simplified format. With quick-access shortcuts, sellers can efficiently generate invoices, track transactions, and review top-performing products. Its intuitive design helps streamline operations, enabling faster decision-making and improved business performance.",
    image:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Catalog Management",
    description:
      "Catalog Management enables sellers to efficiently add, edit, and organize their product listings with precision. Products can be tailored with buyer-specific visibility, pricing controls, and flexible updates. This ensures that the right products reach the right audience at the right time. By simplifying catalog operations, sellers save time while enhancing the overall buying experience.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Buyer Categorization",
    description:
      "The Buyer Categorization feature allows sellers to classify buyers into meaningful groups such as retailers, distributors, or wholesalers. Each category can be assigned customized pricing rules and percentage-based discounts to suit different business needs. This segmentation ensures better personalization, loyalty, and more targeted sales strategies. By understanding buyer types, sellers can build stronger relationships and boost profitability.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Creditworthiness Indicator",
    description:
      "The Creditworthiness Indicator provides valuable insights into each buyer’s reliability and payment behavior. It generates a credit score based on purchase history and payment timelines, helping sellers minimize risks. With this data, sellers can make more confident decisions about extending credit or setting order limits. Ultimately, it improves trust while safeguarding against financial losses.",
    image:
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80",
  },
  {
  id: 5,
  title: "Kiosk & QR Mode",
  description:
    "Kiosk & QR Mode enables sellers to extend their reach directly to consumers in a fast and modern way. By generating a unique QR code, businesses can allow buyers to instantly scan, browse catalogs, and place orders without intermediaries. This feature is perfect for in-store promotions, exhibitions, or pop-up sales. It bridges the gap between offline and online trade, making buying seamless and accessible.",
  image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
},

  {
    id: 6,
    title: "Advertisement Module",
    description:
      "The Advertisement Module empowers sellers to run highly targeted in-app promotional campaigns. With a dedicated Ad Wallet, businesses can control budgets, track campaign performance, and optimize reach. This feature helps attract new buyers while keeping existing customers engaged with tailored offers. It’s a cost-effective solution for scaling visibility and driving consistent growth.",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Buyer Dashboard",
    description:
    "The Buyer Dashboard is your personal command center, designed to streamline every aspect of your purchasing journey. You can effortlessly track your orders in real-time, from the moment they are shipped until they arrive at your doorstep. Access your complete purchase history for easy record-keeping and manage all your profile details with just a few clicks. It's everything you need, all in one convenient and user-friendly hub.",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Buyer-Seller Chat",
    description:
      "The Buyer-Seller Chat feature offers a secure, built-in communication channel for smooth interactions. Sellers can address product queries, discuss order details, and resolve issues instantly. This direct communication fosters trust, reduces delays, and strengthens long-term customer relationships. By integrating chat into the platform, sellers enhance both transparency and buyer satisfaction.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
  },
];

const Services = () => {
  return (
    <>
          <Navbar />
    
       {/* === HERO SECTION === */}
     <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
          py: { xs: 8, md: 10 },
          position: 'relative',
          mt: "-64px",
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1484&q=80)',
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
                  Our Services
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
BizBridge delivers powerful tools to digitize your trade, streamline operations, and boost business growth.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
   

      {/* === Services Section === */}
      <Container sx={{ pt: 8, pb: 10 }}>
        {servicesData.map((service, index) => (
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
            sx={{ mb: { xs: 6, md: 10 } }}
            key={service.id}
          >
            {/* Image */}
            <Grid
              item
              xs={12}
              md={5}
              order={{ xs: 2, md: index % 2 === 0 ? 1 : 2 }}
            >
              <Box
                component="img"
                src={service.image}
                alt={service.title}
                sx={{
                  width: "100%",
                  height: { xs: 250, md: 350 },
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={7}
              order={{ xs: 1, md: index % 2 === 0 ? 2 : 1 }}
            >
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    color: "#101828",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#555",
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    lineHeight: 1.7,
                    maxWidth: 700,
                  }}
                >
                  {service.description}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Container>

          <Box sx={{ borderTop: "none", mt: 4 }}>
        {/* <Footer /> */}
      </Box>

    </>
  );
};

export default Services;

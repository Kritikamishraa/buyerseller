// import React, { useState } from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Grid, 
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Footer from '../Components/Footer';
// import Navbar from '../Components/Navbar';


// // FAQ data
// const faqs = [
//   {
//     question: "What is BizBridge?",
//     answer: "BizBridge is a digital trade platform designed to streamline sales, credit management, buyer interactions, and overall business operations for sellers and distributors."
//   },
//   {
//     question: "Who can use BizBridge?",
//     answer: "BizBridge is built for manufacturers, wholesalers, distributors, and retailers who want to digitize their sales process, manage buyers, and improve payment collections."
//   },
//   {
//     question: "What features does BizBridge offer?",
//     answer: "BizBridge provides Seller Dashboard, Catalog Management, Buyer Categorization, Creditworthiness Indicator, Kiosk & QR mode, Advertisement Module, Business Analytics, and Buyer-Seller Chat."
//   },
//   {
//     question: "How does the Creditworthiness Indicator work?",
//     answer: "It assigns buyers a credit score based on their payment history, helping sellers make informed decisions before offering credit or approving large orders."
//   },
//   {
//     question: "Can I run promotions and ads on BizBridge?",
//     answer: "Yes. BizBridge includes an Advertisement Module with a dedicated Ad Wallet that lets sellers run targeted in-app campaigns to attract new buyers."
//   },
//   {
//     question: "How does BizBridge help in payment collections?",
//     answer: "The platform highlights pending payments in the dashboard, tracks outstanding dues, and uses buyer credit scores to reduce risks in extending credit."
//   },
//   {
//     question: "Does BizBridge support direct-to-consumer sales?",
//     answer: "Yes. Using Kiosk & QR Mode, sellers can generate a QR code for their catalog, enabling buyers to scan, browse, and order directly."
//   },
//   {
//     question: "Can I communicate directly with my buyers?",
//     answer: "Yes. BizBridge has a built-in secure Buyer-Seller Chat feature for order-specific and product-related communication."
//   },
//   {
//     question: "What kind of analytics does BizBridge provide?",
//     answer: "It offers insights into monthly sales, top-performing products, buyer trends, and outstanding payments, helping sellers make data-driven decisions."
//   },
//   {
//     question: "How does BizBridge benefit my business?",
//     answer: "By digitizing your trade, BizBridge saves time, reduces manual errors, improves buyer engagement, and enhances overall business efficiency."
//   },
// ];

// const FaqSection = () => {
//   const [expanded, setExpanded] = useState(false);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return ( 
//     <>
//     <Box sx={{ bgcolor: '#fff' }}>  
//       <Navbar />
//       <Box
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
//                   Frequently Asked Questions
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
//                   Have questions? We're here to help you understand BizBridge better.
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* === FAQ Section === */}
//       <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
//         <Box>
//           {faqs.map((faq, index) => (
//             <Accordion
//               key={index}
//               expanded={expanded === index}
//               onChange={handleChange(index)}
//               sx={{
//                 boxShadow: '0 4px 18px rgba(0,0,0,0.05)',
//                 border: '1px solid #e0e0e0',
//                 borderRadius: '12px !important',
//                 mb: 2,
//                 '&:before': { display: 'none' },
//                 '&.Mui-expanded': { margin: '0 0 16px 0' }
//               }}
//             >
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon sx={{ color: '#00C853' }} />}
//                 aria-controls={`panel${index}a-content`}
//                 id={`panel${index}a-header`}
//                 sx={{
//                   padding: '12px 20px',
//                   '& .MuiAccordionSummary-content': {
//                     fontWeight: 600,
//                     color: '#101828',
//                   }
//                 }}
//               >
//                 <Typography variant="h6" component="p" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
//                   {faq.question}
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails sx={{ padding: '0 20px 20px 20px' }}>
//                 <Typography sx={{ color: '#56616b', lineHeight: 1.7 }}>
//                   {faq.answer}
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//           ))}
//         </Box>
//       </Container>
//     </Box>
//     <Footer />  
//     </>
//   );
// };

// export default FaqSection;


import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid, 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';


// FAQ data
const faqs = [
  {
    question: "What is BizBridge?",
    answer: "BizBridge is a digital trade platform designed to streamline sales, credit management, buyer interactions, and overall business operations for sellers and distributors."
  },
  {
    question: "Who can use BizBridge?",
    answer: "BizBridge is built for manufacturers, wholesalers, distributors, and retailers who want to digitize their sales process, manage buyers, and improve payment collections."
  },
  {
    question: "What features does BizBridge offer?",
    answer: "BizBridge provides Seller Dashboard, Catalog Management, Buyer Categorization, Creditworthiness Indicator, Kiosk & QR mode, Advertisement Module, Business Analytics, and Buyer-Seller Chat."
  },
  {
    question: "How does the Creditworthiness Indicator work?",
    answer: "It assigns buyers a credit score based on their payment history, helping sellers make informed decisions before offering credit or approving large orders."
  },
  {
    question: "Can I run promotions and ads on BizBridge?",
    answer: "Yes. BizBridge includes an Advertisement Module with a dedicated Ad Wallet that lets sellers run targeted in-app campaigns to attract new buyers."
  },
  {
    question: "How does BizBridge help in payment collections?",
    answer: "The platform highlights pending payments in the dashboard, tracks outstanding dues, and uses buyer credit scores to reduce risks in extending credit."
  },
  {
    question: "Does BizBridge support direct-to-consumer sales?",
    answer: "Yes. Using Kiosk & QR Mode, sellers can generate a QR code for their catalog, enabling buyers to scan, browse, and order directly."
  },
  {
    question: "Can I communicate directly with my buyers?",
    answer: "Yes. BizBridge has a built-in secure Buyer-Seller Chat feature for order-specific and product-related communication."
  },
  {
    question: "What kind of analytics does BizBridge provide?",
    answer: "It offers insights into monthly sales, top-performing products, buyer trends, and outstanding payments, helping sellers make data-driven decisions."
  },
  {
    question: "How does BizBridge benefit my business?",
    answer: "By digitizing your trade, BizBridge saves time, reduces manual errors, improves buyer engagement, and enhances overall business efficiency."
  },
];

const FaqSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return ( 
    <>
    <Box sx={{ bgcolor: '#fff' }}>  
      <Navbar />
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
                  Frequently Asked Questions
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
                  Have questions? We're here to help you understand BizBridge better.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* === FAQ Section === */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Box>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
              sx={{
                boxShadow: '0 4px 18px rgba(0,0,0,0.05)',
                border: '1px solid #e0e0e0',
                borderRadius: '12px !important',
                mb: 2,
                '&:before': { display: 'none' },
                '&.Mui-expanded': { margin: '0 0 16px 0' }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#00C853' }} />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
                sx={{
                  padding: '12px 20px',
                  '& .MuiAccordionSummary-content': {
                    fontWeight: 600,
                    color: '#101828',
                  }
                }}
              >
                <Typography variant="h6" component="p" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: '0 20px 20px 20px' }}>
                <Typography sx={{ color: '#56616b', lineHeight: 1.7 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
    <Footer />  
    </>
  );
};

export default FaqSection;


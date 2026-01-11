// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   Switch,
//   Stack,
//   alpha,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   CssBaseline,
//   Divider,
//   Link,
//   Container, // <-- YEH IMPORT ADD KIYA GAYA HAI
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PropTypes from 'prop-types';
// import logo from "../Images/logo.jpg"; 
// import Footer from "../Components/Footer";
// import DrawerAppBar from '../Components/DrawerAppBar';


// // --- Data for the pricing plans ---
// const plans = [
//   {
//     name: 'Free',
//     monthlyPrice: 0,
//     yearlyPrice: 0,
//     description: 'For individuals and small teams just getting started.',
//     features: [
//       'Up to 10 integrations',
//       'Basic analytics and reporting',
//       '24/7 email support',
//       '1 custom dashboard',
//     ],
//     isPopular: false,
//   },
//   {
//     name: 'Pro',
//     monthlyPrice: 499,
//     yearlyPrice: 4990,
//     description: 'For growing businesses that need more power and features.',
//     features: [
//       'Unlimited integrations',
//       'Advanced analytics and reporting',
//       'Priority email & chat support',
//       'Unlimited custom dashboards',
//       'API access for custom solutions',
//     ],
//     isPopular: true,
//   },
//   {
//     name: 'Enterprise',
//     monthlyPrice: 999,
//     yearlyPrice: 9990,
//     description: 'For large organizations with advanced security and support needs.',
//     features: [
//       'All Pro features, plus:',
//       'Dedicated account manager',
//       'Single Sign-On (SSO)',
//       'Custom feature development',
//       '99.9% uptime SLA',
//     ],
//     isPopular: false,
//   },
// ];

// const navItems = [
//   { label: "Home", path: "/" },
//   { label: "About", path: "/about" },
//   { label: "Service", path: "/trust" },
//   { label: "Testimonials", path: "/testimonials" },
//   { label: "Contact", path: "/contact-page" },
//   { label: "Features", path: "/feature-analytics" },
//   { label: "How It Works", path: "/how-it-works" },
// ];

// const logoUrl = logo;


// // --- Navbar Component (Isme koi badlav nahi hai) ---
// function Navbar(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   // Logo section with image before text
//   const LogoSection = (
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       <Box
//         component="img"
//         src={logoUrl}
//         alt="BizBridge Logo"
//         sx={{
//           height: 55,
//           width: 55,
//           minWidth: 55,
//           minHeight: 55,
//           borderRadius: "8px",
//           objectFit: "contain",
//           mr: 1.3,
//         }}
//       />
//       <Typography
//         variant="h6"
//         component={Link}
//         href="/"
//         underline="none"
//         sx={{
//           color: "#2054a3",
//           fontFamily: '"Pacifico", cursive',
//           fontWeight: 700,
//           fontSize: { xs: "1.3rem", sm: "1.55rem" },
//           textDecoration: "none",
//           lineHeight: 1,
//         }}
//       >
//         BizBridge
//       </Typography>
//     </Box>
//   );

//   // Desktop nav menu
//   const NavMenuDesktop = (
//     <Box
//       sx={{
//         flexGrow: 1,
//         display: { xs: "none", md: "flex" },
//         justifyContent: "center",
//         alignItems: "center",
//         gap: { md: 1.5, lg: 3 },
//       }}
//     >
//       {navItems.map((item) => (
//         <Button
//           key={item.label}
//           sx={{
//             color: "#222",
//             fontWeight: 400,
//             mx: { md: 0.5, lg: 1 },
//             fontSize: { md: "1.07rem", lg: "1.13rem" },
//             background: "transparent",
//             textTransform: "none",
//             borderRadius: "6px",
//             px: { md: 1.5, lg: 2.2 },
//             minWidth: 0,
//             "&:hover": { bgcolor: "#f5f6fa" },
//           }}
//           href={item.path}
//           underline="none"
//         >
//           {item.label}
//         </Button>
//       ))}
//     </Box>
//   );

//   // Drawer for mobile
//   const drawer = (
//     <Box
//       sx={{
//         bgcolor: "#fff",
//         height: "100%",
//         px: { xs: 0, sm: 1 },
//         minWidth: 220,
//       }}
//       role="presentation"
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           px: 2,
//           py: 2,
//         }}
//       >
//         {LogoSection}
//         <IconButton onClick={handleDrawerToggle} sx={{ color: "#111" }}>
//           <CloseIcon />
//         </IconButton>
//       </Box>
//       <Divider />
//       <List sx={{ pt: 1 }}>
//         {navItems.map((item) => (
//           <ListItem key={item.label} disablePadding>
//             <ListItemButton
//               sx={{
//                 textAlign: "left",
//                 pl: 4,
//                 py: 1.5,
//                 fontSize: "1rem",
//               }}
//               href={item.path}
//               onClick={handleDrawerToggle}
//             >
//               <ListItemText
//                 primary={item.label}
//                 primaryTypographyProps={{
//                   color: "#222",
//                   fontWeight: 400,
//                   fontSize: { xs: "1.01rem", sm: "1.07rem" },
//                 }}
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//         <ListItem disablePadding>
//           <ListItemButton
//             sx={{ pl: 4, py: 1.5 }}
//             href="/login"
//             onClick={handleDrawerToggle}
//           >
//             <Button
//               variant="outlined"
//               fullWidth
//               sx={{
//                 borderRadius: "13px",
//                 color: "#2054a3",
//                 borderColor: "#bfc8d3",
//                 fontWeight: 600,
//                 textTransform: "none",
//                 fontSize: { xs: "1.02rem", sm: "1.09rem" },
//                 py: 1.1,
//               }}
//             >
//               Login
//             </Button>
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         elevation={0}
//         sx={{
//           bgcolor: "#fff",
//           color: "#111",
//           borderBottom: "1px solid #e6e7eb",
//           boxShadow: "none",
//         }}
//       >
//         <Toolbar
//           disableGutters
//           sx={{
//             minHeight: { xs: 56, sm: 64 },
//             px: { xs: 2, sm: 3, md: 6, lg: 11 },
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//           }}
//         >
//           <Box sx={{ minWidth: 0, flexShrink: 0 }}>{LogoSection}</Box>
//           {NavMenuDesktop}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1.2,
//               minWidth: 0,
//               flexShrink: 0,
//             }}
//           >
//             <Button
//               variant="outlined"
//               sx={{
//                 display: { xs: "none", md: "inline-flex" },
//                 borderRadius: "13px",
//                 color: "#2054a3",
//                 borderColor: "#bfc8d3",
//                 fontWeight: 600,
//                 px: { md: 3, lg: 4 },
//                 minWidth: { md: 86, lg: 120 },
//                 textTransform: "none",
//                 fontSize: { md: "1.09rem", lg: "1.14rem" },
//                 py: 1.09,
//               }}
//               href="/login"
//               underline="none"
//             >
//               Login
//             </Button>

//             <IconButton
//               color="inherit"
//               aria-label="open navigation"
//               edge="end"
//               onClick={handleDrawerToggle}
//               sx={{ display: { xs: "flex", md: "none" }, ml: 0.5 }}
//               size="large"
//             >
//               <MenuIcon sx={{ fontSize: "2.1rem" }} />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <nav>
//         <Drawer
//           container={container}
//           variant="temporary"
//           anchor="right"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: "block", md: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: "84vw",
//               maxWidth: 330,
//               minWidth: 210,
//               bgcolor: "#fff",
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//     </>
//   );
// }

// Navbar.propTypes = {
//   window: PropTypes.func,
// };


// // --- Main App Component ---
// export default function App() {
//   const [billingCycle, setBillingCycle] = useState('monthly');

//   const handleBillingChange = (event) => {
//     setBillingCycle(event.target.checked ? 'yearly' : 'monthly');
//   };

 
//    return (
//      <Box sx={{ bgcolor: "#fff" }}>
//       <DrawerAppBar/>
      
      
//  {/* === HERO SECTION === */}
//      <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           minHeight: "100vh",
//           position: 'relative',
//           mt: { xs: "-56px", sm: "-64px" },
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0, left: 0, right: 0, bottom: 0,
//             backgroundImage: `url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80")`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             filter: 'brightness(0.3)',
//             zIndex: 1,
//           },
//         }}
//       >
//         <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
//           <Grid container spacing={5} alignItems="center">
//             {/* CHANGE: Container ki chaudai 8 se 10 kar di hai */}
//             <Grid item xs={12} md={10}>
//               <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
//                 <Typography
//                   variant="h1"
//                   fontWeight={800}
//                   gutterBottom
//                   sx={{
//                     color: '#fff', 
//                     textShadow: '1px 1px 5px rgba(0,0,0,0.3)',
//                     // Font size ko original size par wapas kar sakte hain ya yahi rakh sakte hain
//                     fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem', lg: '4.5rem' }
//                   }}
//                 >
//                   Simple, Transparent Pricing
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
//                   Choose the perfect plan for your business needs. Start for free and scale as you grow. 🚀
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* --- PRICING SECTION AB YAHAN SE SHURU HOTA HAI --- */}
//       <Box
//         component="main"
//         sx={{
//           py: { xs: 6, md: 10 },
//           px: { xs: 2, md: 6 },
//           fontFamily: "'Inter', sans-serif",
//           bgcolor: '#fff' // Is section ko alag dikhane ke liye background color
//         }}
//       >
//         {/* Page Header ko upar hero section me move kar diya gaya hai */}

//         {/* Billing Cycle Toggle */}
//         <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 4 }}>
//           <Typography fontWeight={billingCycle === 'monthly' ? 'bold' : 'normal'} color={billingCycle === 'monthly' ? 'primary.main' : 'text.secondary'}>
//             Monthly
//           </Typography>
//           <Switch
//             checked={billingCycle === 'yearly'}
//             onChange={handleBillingChange}
//             inputProps={{ 'aria-label': 'billing cycle toggle' }}
//           />
//           <Typography fontWeight={billingCycle === 'yearly' ? 'bold' : 'normal'} color={billingCycle === 'yearly' ? 'primary.main' : 'text.secondary'}>
//             Yearly
//           </Typography>
//           <Chip label="2 months free!" color="success" size="small" sx={{ ml: 1, display: billingCycle === 'yearly' ? 'flex' : 'none' }}/>
//         </Stack>

//         {/* Pricing Cards Grid (Isme koi badlav nahi hai) */}
//         <Grid container spacing={4} justifyContent="center" alignItems="stretch">
//           {plans.map((plan) => (
//             <Grid item key={plan.name} xs={12} md={6} lg={4}>
//               <Card
//                 sx={{
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   borderRadius: 4,
//                   border: plan.isPopular ? '2px solid' : '1px solid',
//                   borderColor: plan.isPopular ? 'primary.main' : '#e5e7eb',
//                   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                   bgcolor: plan.isPopular ? alpha('#2563eb', 0.05) : '#ffffff',
//                   '&:hover': {
//                     transform: 'translateY(-8px)',
//                     boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
//                   },
//                   position: 'relative',
//                   overflow: 'visible',
//                 }}
//               >
//                 {plan.isPopular && (
//                   <Chip
//                     label="Most Popular"
//                     color="primary"
//                     size="small"
//                     sx={{
//                       position: 'absolute',
//                       top: -12,
//                       left: '50%',
//                       transform: 'translateX(-50%)',
//                       fontWeight: 'bold',
//                     }}
//                   />
//                 )}
//                 <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
//                   <Box sx={{ flexGrow: 1 }}>
//                     <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
//                       {plan.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ minHeight: '40px', mb: 2 }}>
//                       {plan.description}
//                     </Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'baseline', my: 2 }}>
//                       <Typography variant="h3" component="span" fontWeight="bold">
//                         ₹{billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
//                       </Typography>
//                       <Typography variant="body1" color="text.secondary" ml={1}>
//                         / {billingCycle === 'monthly' ? 'month' : 'year'}
//                       </Typography>
//                     </Box>

//                     {/* Features List */}
//                     <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', textAlign: 'left', mt: 3, mb: 4 }}>
//                       {plan.features.map((feature, index) => (
//                         <Typography
//                           component="li"
//                           key={index}
//                           variant="body1"
//                           sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}
//                         >
//                           <CheckCircleIcon color="primary" sx={{ fontSize: 22, mr: 1.5 }} />
//                           {feature}
//                         </Typography>
//                       ))}
//                     </Box>
//                   </Box>

//                   {/* Action Button */}
//                   <Button
//                     fullWidth
//                     variant={plan.isPopular ? 'contained' : 'outlined'}
//                     size="large"
//                     sx={{
//                       borderRadius: 2,
//                       fontWeight: 'bold',
//                       py: 1.5,
//                       mt: 'auto',
//                       textTransform: 'none',
//                       fontSize: '1rem',
//                     }}
//                   >
//                     {plan.name === 'Free' ? 'Get Started' : 'Start Free Trial'}
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//        <Footer /> {/* Footer added here */}
//     </Box>
//   );
// }

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Switch,
  Stack,
  alpha,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CssBaseline,
  Divider,
  Link,
  Container, // <-- YEH IMPORT ADD KIYA GAYA HAI
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';
import logo from "../Images/logo.jpg"; 
import Footer from "../Components/Footer";
import DrawerAppBar from '../Components/DrawerAppBar';


// --- Data for the pricing plans ---
const plans = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'For individuals and small teams just getting started.',
    features: [
      'Up to 10 integrations',
      'Basic analytics and reporting',
      '24/7 email support',
      '1 custom dashboard',
    ],
    isPopular: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 499,
    yearlyPrice: 4990,
    description: 'For growing businesses that need more power and features.',
    features: [
      'Unlimited integrations',
      'Advanced analytics and reporting',
      'Priority email & chat support',
      'Unlimited custom dashboards',
      'API access for custom solutions',
    ],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 999,
    yearlyPrice: 9990,
    description: 'For large organizations with advanced security and support needs.',
    features: [
      'All Pro features, plus:',
      'Dedicated account manager',
      'Single Sign-On (SSO)',
      'Custom feature development',
      '99.9% uptime SLA',
    ],
    isPopular: false,
  },
];

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Service", path: "/trust" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact-page" },
  { label: "Features", path: "/feature-analytics" },
  { label: "How It Works", path: "/how-it-works" },
];

const logoUrl = logo;


// --- Navbar Component (Isme koi badlav nahi hai) ---
function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // Logo section with image before text
  const LogoSection = (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        src={logoUrl}
        alt="BizBridge Logo"
        sx={{
          height: 55,
          width: 55,
          minWidth: 55,
          minHeight: 55,
          borderRadius: "8px",
          objectFit: "contain",
          mr: 1.3,
        }}
      />
      <Typography
        variant="h6"
        component={Link}
        href="/"
        underline="none"
        sx={{
          color: "#2054a3",
          fontFamily: '"Pacifico", cursive',
          fontWeight: 700,
          fontSize: { xs: "1.3rem", sm: "1.55rem" },
          textDecoration: "none",
          lineHeight: 1,
        }}
      >
        BizBridge
      </Typography>
    </Box>
  );

  // Desktop nav menu
  const NavMenuDesktop = (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
        alignItems: "center",
        gap: { md: 1.5, lg: 3 },
      }}
    >
      {navItems.map((item) => (
        <Button
          key={item.label}
          sx={{
            color: "#222",
            fontWeight: 400,
            mx: { md: 0.5, lg: 1 },
            fontSize: { md: "1.07rem", lg: "1.13rem" },
            background: "transparent",
            textTransform: "none",
            borderRadius: "6px",
            px: { md: 1.5, lg: 2.2 },
            minWidth: 0,
            "&:hover": { bgcolor: "#f5f6fa" },
          }}
          href={item.path}
          underline="none"
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );

  // Drawer for mobile
  const drawer = (
    <Box
      sx={{
        bgcolor: "#fff",
        height: "100%",
        px: { xs: 0, sm: 1 },
        minWidth: 220,
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 2,
        }}
      >
        {LogoSection}
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#111" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ pt: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "left",
                pl: 4,
                py: 1.5,
                fontSize: "1rem",
              }}
              href={item.path}
              onClick={handleDrawerToggle}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  color: "#222",
                  fontWeight: 400,
                  fontSize: { xs: "1.01rem", sm: "1.07rem" },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            sx={{ pl: 4, py: 1.5 }}
            href="/login"
            onClick={handleDrawerToggle}
          >
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "13px",
                color: "#2054a3",
                borderColor: "#bfc8d3",
                fontWeight: 600,
                textTransform: "none",
                fontSize: { xs: "1.02rem", sm: "1.09rem" },
                py: 1.1,
              }}
            >
              Login
            </Button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          color: "#111",
          borderBottom: "1px solid #e6e7eb",
          boxShadow: "none",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 56, sm: 64 },
            px: { xs: 2, sm: 3, md: 6, lg: 11 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ minWidth: 0, flexShrink: 0 }}>{LogoSection}</Box>
          {NavMenuDesktop}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              minWidth: 0,
              flexShrink: 0,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                display: { xs: "none", md: "inline-flex" },
                borderRadius: "13px",
                color: "#2054a3",
                borderColor: "#bfc8d3",
                fontWeight: 600,
                px: { md: 3, lg: 4 },
                minWidth: { md: 86, lg: 120 },
                textTransform: "none",
                fontSize: { md: "1.09rem", lg: "1.14rem" },
                py: 1.09,
              }}
              href="/login"
              underline="none"
            >
              Login
            </Button>

            <IconButton
              color="inherit"
              aria-label="open navigation"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "flex", md: "none" }, ml: 0.5 }}
              size="large"
            >
              <MenuIcon sx={{ fontSize: "2.1rem" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "84vw",
              maxWidth: 330,
              minWidth: 210,
              bgcolor: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};


// --- Main App Component ---
export default function App() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const handleBillingChange = (event) => {
    setBillingCycle(event.target.checked ? 'yearly' : 'monthly');
  };

 
   return (
     <Box sx={{ bgcolor: "#fff" }}>
      <DrawerAppBar/>
      
      
 {/* === HERO SECTION === */}
     <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
          position: 'relative',
          mt: { xs: "-56px", sm: "-64px" },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={5} alignItems="center">
            {/* CHANGE: Container ki chaudai 8 se 10 kar di hai */}
            <Grid item xs={12} md={10}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h1"
                  fontWeight={800}
                  gutterBottom
                  sx={{
                    color: '#fff', 
                    textShadow: '1px 1px 5px rgba(0,0,0,0.3)',
                    // Font size ko original size par wapas kar sakte hain ya yahi rakh sakte hain
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem', lg: '4.5rem' }
                  }}
                >
                  Simple, Transparent Pricing
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
                  Choose the perfect plan for your business needs. Start for free and scale as you grow. 🚀
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- PRICING SECTION AB YAHAN SE SHURU HOTA HAI --- */}
      <Box
        component="main"
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 6 },
          fontFamily: "'Inter', sans-serif",
          bgcolor: '#fff' // Is section ko alag dikhane ke liye background color
        }}
      >
        {/* Page Header ko upar hero section me move kar diya gaya hai */}

        {/* Billing Cycle Toggle */}
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 4 }}>
          <Typography fontWeight={billingCycle === 'monthly' ? 'bold' : 'normal'} color={billingCycle === 'monthly' ? 'primary.main' : 'text.secondary'}>
            Monthly
          </Typography>
          <Switch
            checked={billingCycle === 'yearly'}
            onChange={handleBillingChange}
            inputProps={{ 'aria-label': 'billing cycle toggle' }}
          />
          <Typography fontWeight={billingCycle === 'yearly' ? 'bold' : 'normal'} color={billingCycle === 'yearly' ? 'primary.main' : 'text.secondary'}>
            Yearly
          </Typography>
          <Chip label="2 months free!" color="success" size="small" sx={{ ml: 1, display: billingCycle === 'yearly' ? 'flex' : 'none' }}/>
        </Stack>

        {/* Pricing Cards Grid (Isme koi badlav nahi hai) */}
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {plans.map((plan) => (
            <Grid item key={plan.name} xs={12} md={6} lg={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  border: plan.isPopular ? '2px solid' : '1px solid',
                  borderColor: plan.isPopular ? 'primary.main' : '#e5e7eb',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  bgcolor: plan.isPopular ? alpha('#2563eb', 0.05) : '#ffffff',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  },
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {plan.isPopular && (
                  <Chip
                    label="Most Popular"
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontWeight: 'bold',
                    }}
                  />
                )}
                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                      {plan.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ minHeight: '40px', mb: 2 }}>
                      {plan.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', my: 2 }}>
                      <Typography variant="h3" component="span" fontWeight="bold">
                        ₹{billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" ml={1}>
                        / {billingCycle === 'monthly' ? 'month' : 'year'}
                      </Typography>
                    </Box>

                    {/* Features List */}
                    <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', textAlign: 'left', mt: 3, mb: 4 }}>
                      {plan.features.map((feature, index) => (
                        <Typography
                          component="li"
                          key={index}
                          variant="body1"
                          sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}
                        >
                          <CheckCircleIcon color="primary" sx={{ fontSize: 22, mr: 1.5 }} />
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                  </Box>

                  {/* Action Button */}
                  <Button
                    fullWidth
                    variant={plan.isPopular ? 'contained' : 'outlined'}
                    size="large"
                    sx={{
                      borderRadius: 2,
                      fontWeight: 'bold',
                      py: 1.5,
                      mt: 'auto',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                  >
                    {plan.name === 'Free' ? 'Get Started' : 'Start Free Trial'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
       <Footer /> {/* Footer added here */}
    </Box>
  );
}
import React, { useState } from "react";
import { Box, Typography, Grid, Container, Chip, Divider, Paper, Avatar, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Visibility, TrackChanges, PeopleAlt, WorkspacePremium, Close as CloseIcon } from "@mui/icons-material";
import Navbar from "../Components/Navbar";

const recognitions = [
  "A DPIIT Recognised Startup under Startup India",
  "Registered with iStart Rajasthan",
  "Incubated at BTH, under the iStart program",
];

const coreValues = [
  { icon: <Visibility sx={{ fontSize: 40, color: '#4caf50' }} />, title: 'Our Vision', text: 'To be the leading platform that seamlessly integrates businesses with technology, fostering growth and innovation worldwide.' },
  { icon: <TrackChanges sx={{ fontSize: 40, color: '#4caf50' }} />, title: 'Our Mission', text: 'To empower entrepreneurs and SMEs with intelligent, affordable, and accessible digital solutions.' },
  { icon: <PeopleAlt sx={{ fontSize: 40, color: '#4caf50' }} />, title: 'Our Culture', text: 'A dedicated group of innovators, strategists, and tech enthusiasts committed to your success.' },
];

const teamMembers = [
  { name: 'Arpesh Agrawal', role: 'CEO & Founder', avatar: 'https://placehold.co/150x150/EFEFEFF/31343C?text=PS', social: { linkedin: '', twitter: '#' } },
  { name: 'Sanjeev Kumar', role: 'Full Stack Developer', avatar: 'https://placehold.co/150x150/EFEFEFF/31343C?text=JD', social: { linkedin: '', twitter: '#' } },
  { name: 'Kritika Mishra', role: 'ReactJs Developer', avatar: 'https://placehold.co/150x150/EFEFEFF/31343C?text=EW', social: { linkedin: '', twitter: '#' } },
];

const expertiseAreas = [
  'Digital Transformation', 
  'SaaS Platform Development',
  'Business Automation',
  'Data Analytics & Insights',
  'Seamless Integrations',
  'Cloud Solutions & DevOps',
  'IT Consulting',
  'Web & App Development',
];

const timelineEvents = [
  { year: 'Late 2024', event: 'Concept & Foundation', description: 'The idea for BizBridge was born, and our core team was assembled to tackle a big challenge.' },
  { year: 'Early 2025', event: 'Platform Development', description: 'Months of dedicated work led to the creation of our robust, feature-rich beta platform.' },
  { year: 'Mid 2025', event: 'Official Launch', description: 'BizBridge officially launched, onboarding our first set of valued customers and partners.' },
  { year: 'Future', event: 'Expanding Horizons', description: 'We are continuously working on new features, including advanced analytics and mobile apps.' },
];

export default function AdvancedAboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const GREEN_ACCENT = '#28a745'; 

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);
  const handleFormSubmit = (event) => { event.preventDefault(); setIsDialogOpen(false); };
  const textFieldStyles = {
    '& label.Mui-focused': { color: GREEN_ACCENT },
    '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: GREEN_ACCENT } },
  };
  
  return (
   <>
   <Navbar />
    <Box sx={{ bgcolor: "#fff", width: '100%' }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
          py: { xs: 6, md: 10 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1484&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h1" fontWeight={800} gutterBottom sx={{ color: '#fff', textShadow: '1px 1px 5px rgba(0,0,0,0.3)', fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4rem' } }}>
                  About BizBridge
                </Typography>
                <Typography variant="h6" component="p" sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, fontSize: { xs: '1rem', md: '1.15rem' } }}>
                  We are a team of innovators, strategists, and tech enthusiasts dedicated to bridging the gap between business potential and technological advancement.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{xs: 4, md: 8}} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box component="img" src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1300&q=80" alt="Collaborative business environment" sx={{ width: '100%', borderRadius: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant={isMobile ? "h4" : "h3"} fontWeight={800} sx={{ color: '#101828', textAlign: {xs: 'center', md: 'left'} }}>
              Who We <Box component="span" sx={{ color: GREEN_ACCENT }}>Are</Box>
            </Typography>
            <Divider sx={{ width: 70, height: 4, bgcolor: GREEN_ACCENT, borderRadius: 2, mt: 2, mb: 3, mx: { xs: 'auto', md: 0 } }} />
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.1rem', textAlign: {xs: 'center', md: 'left'}, mb: 4 }}>
              We harness the power of technology to make buying and selling businesses easier, faster, and more affordable.
              We empower entrepreneurs with innovative solutions, connecting opportunities and driving growth across industries.
            </Typography>
            <Typography variant="h5" fontWeight={700} sx={{ color: '#101828', textAlign: {xs: 'center', md: 'left'} }}>
              Our <Box component="span" sx={{ color: GREEN_ACCENT }}>Expertise</Box>
            </Typography>
            <Divider sx={{ width: 70, height: 4, bgcolor: GREEN_ACCENT, borderRadius: 2, mt: 2, mb: 3, mx: { xs: 'auto', md: 0 } }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 2, justifyContent: {xs: 'center', md: 'flex-start'} }}>
              {expertiseAreas.map((skill) => (
                <Chip key={skill} icon={<CheckCircleOutline />} label={skill} variant="outlined" sx={{ fontSize: '0.9rem', p: '20px 12px', color: '#1a5929', borderColor: '#a7d7b9', '& .MuiChip-icon': { color: GREEN_ACCENT } }} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={3} justifyContent="center">
          {recognitions.map((text) => (
            <Grid item xs={12} sm={6} md={4} key={text}>
              <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 3, height: '100%', transition: 'all 0.3s ease', bgcolor: '#fff', cursor: 'pointer', border: '1px solid transparent', '&:hover': { transform: 'translateY(-6px)', background: 'linear-gradient(90deg, #00C853, #FFD600)', color: '#fff', boxShadow: '0 12px 30px -10px rgba(0,0,0,0.2)' }, '&:active': { transform: 'translateY(-6px) scale(0.99)', background: 'linear-gradient(90deg, #00C853, #FFD600)', color: '#fff', boxShadow: '0 12px 30px -10px rgba(0,0,0,0.2)' } }}>
                <WorkspacePremium sx={{ fontSize: 40, color: 'inherit', transition: '0.3s' }} />
                <Typography fontWeight={500}>{text}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: '#f9fafb', py: { xs: 6, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight={700} textAlign="center" gutterBottom sx={{ mb: { xs: 4, md: 6 }, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
            Our Core <Box component="span" sx={{color: '#4caf50'}}>Values</Box>
          </Typography>
          <Grid container spacing={4}>
            {coreValues.map((item) => (
              <Grid item xs={12} md={4} key={item.title}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4, height: '100%', transition: 'all 0.3s ease', bgcolor: '#fff', cursor: 'pointer', border: '1px solid transparent', '&:hover': { transform: 'translateY(-8px)', background: 'linear-gradient(90deg, #00C853, #FFD600)', color: '#fff', boxShadow: '0 12px 30px -10px rgba(0,0,0,0.2)' }, '&:active': { transform: 'translateY(-8px) scale(0.99)', background: 'linear-gradient(90deg, #00C853, #FFD600)', color: '#fff', boxShadow: '0 12px 30px -10px rgba(0,0,0,0.2)' }, '&:hover .MuiSvgIcon-root': { color: '#fff' } }}>
                  <Box mb={2} sx={{ color: '#4caf50', transition: '0.3s' }}>{item.icon}</Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>{item.title}</Typography>
                  <Typography>{item.text}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 12 } }}>
        <Typography variant="h2" fontWeight={700} textAlign="center" gutterBottom mb={5} sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
          Our <Box component="span" sx={{color: '#4caf50'}}>Journey</Box>
        </Typography>
        <Timeline position={isMobileOrTablet ? "right" : "alternate"}>
          {timelineEvents.map((item, index) => (
            <TimelineItem key={index} sx={{ ...(isMobileOrTablet && { '&::before': { content: 'none' } }) }}>
              {!isMobileOrTablet && (<TimelineOppositeContent color="text.secondary">{item.year}</TimelineOppositeContent>)}
              <TimelineSeparator>
                <TimelineDot sx={{ background: 'linear-gradient(90deg, #00C853, #FFD600)' }} />
                {index < timelineEvents.length - 1 && <TimelineConnector sx={{ background: 'linear-gradient(90deg, #00C853, #FFD600)' }} />}
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Paper elevation={3} sx={{ p: '12px 16px', borderRadius: 3, transition: 'all 0.3s ease', bgcolor: '#fff', cursor: 'pointer', border: '1px solid transparent', '&:hover': { transform: 'translateY(-6px)', background: 'linear-gradient(90deg, #00C853, #FFD600)', color: '#fff', boxShadow: '0 12px 30px -10px rgba(0,0,0,0.2)' }, '&:active': { transform: 'translateY(-6px) scale(0.99)', background: 'linear-gradient(90deg, #00C853, #FFD600)', color: '#fff', boxShadow: '0 12px 30px -10px rgba(0,0,0,0.2)' } }}>
                  <Typography variant="h6" component="span" fontWeight="bold">{item.event}</Typography>
                  {isMobileOrTablet && <Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>{item.year}</Typography>}
                  <Typography>{item.description}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>

      <Box sx={{ bgcolor: '#f9fafb', py: { xs: 6, md: 12 } }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
            Meet <Box component="span" sx={{ color: '#4caf50' }}>Our Team</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', mb: { xs: 4, md: 6 } }}>
            The passionate minds behind BizBridge, dedicated to innovating and leading the industry forward.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={3} key={member.name}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 4, textAlign: 'center', transition: 'all 0.4s ease', cursor: 'pointer', background: '#fff', border: '2px solid transparent', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 15px 35px rgba(0,0,0,0.15)', border: '2px solid', borderImage: 'linear-gradient(90deg, #00C853, #FFD600) 1' }, '&:active': { transform: 'translateY(-10px) scale(0.98)', boxShadow: '0 15px 35px rgba(0,0,0,0.15)', border: '2px solid', borderImage: 'linear-gradient(90deg, #00C853, #FFD600) 1' } }}>
                  <Box sx={{ width: { xs: 120, sm: 150 }, height: { xs: 120, sm: 150 }, mx: 'auto', borderRadius: '50%', p: '4px', background: 'linear-gradient(90deg, #00C853, #FFD600)', mb: 2 }}>
                    <Avatar alt={member.name} src={member.avatar} sx={{ width: '100%', height: '100%', border: '4px solid #fff', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.05)' } }} />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>{member.name}</Typography>
                  <Typography color="primary.main" sx={{ mb: 0 }}>{member.role}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={handleDialogOpen} size="large" sx={{ px: {xs: 4, sm: 6}, py: {xs: 1.5, sm: 2}, fontSize: {xs: '1rem', sm: '1.1rem'}, fontWeight: 600, borderRadius: '40px', color: '#fff', backgroundColor: GREEN_ACCENT, boxShadow: '0 3px 10px rgba(40, 167, 69, 0.4)', transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease', '&:hover': { transform: 'translateY(-2px)', backgroundColor: '#218838', boxShadow: '0 5px 18px rgba(40, 167, 69, 0.6)' }, '&:active': { transform: 'translateY(0px) scale(0.98)', boxShadow: '0 2px 5px rgba(40, 167, 69, 0.5)' } }}>
          Contact Us
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm" fullScreen={isMobileOrTablet}>
        <DialogTitle>
          <Typography variant="h4" fontWeight={700} textAlign="center" sx={{ mt: 2, mb: 1 }}>
            Send Us an <Box component="span" sx={{ color: GREEN_ACCENT }}>Enquiry</Box>
          </Typography>
          <IconButton aria-label="close" onClick={handleDialogClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box component="form" onSubmit={handleFormSubmit}>
          <DialogContent>
            <Grid container spacing={2} sx={{pt: 1}}>
              <Grid item xs={12}><TextField autoFocus required margin="dense" id="name" label="Your Name" type="text" fullWidth variant="outlined" sx={textFieldStyles} /></Grid>
              <Grid item xs={12}><TextField required margin="dense" id="email" label="Email Address" type="email" fullWidth variant="outlined" sx={textFieldStyles} /></Grid>
              <Grid item xs={12}><TextField required margin="dense" id="subject" label="Subject" type="text" fullWidth variant="outlined" sx={textFieldStyles} /></Grid>
              <Grid item xs={12}><TextField required margin="dense" id="message" label="Your Message" multiline rows={4} fullWidth variant="outlined" sx={textFieldStyles} /></Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
            <Button onClick={handleDialogClose} variant="contained" sx={{ px: 4, py: 1.2, fontWeight: 600, borderRadius: '40px', color: '#fff', backgroundColor: GREEN_ACCENT, boxShadow: '0 3px 10px rgba(40, 167, 69, 0.4)', '&:hover': { transform: 'translateY(-2px)', backgroundColor: '#218838', boxShadow: '0 5px 18px rgba(40, 167, 69, 0.6)' } }}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ px: 4, py: 1.2, fontWeight: 600, borderRadius: '40px', color: '#fff', backgroundColor: GREEN_ACCENT, boxShadow: '0 3px 10px rgba(40, 167, 69, 0.4)', '&:hover': { transform: 'translateY(-2px)', backgroundColor: '#218838', boxShadow: '0 5px 18px rgba(40, 167, 69, 0.6)' } }}>Send Message</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
   </>
  );
}
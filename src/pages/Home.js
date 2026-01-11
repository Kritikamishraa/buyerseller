import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "./Hero";
import FeatureAnalyticsSection from "../Components/FeatureAnalyticsSection";
import HowItWorksPage from "../Components/HowItWorksPage";
import AboutPage from "../Components/AboutPage";
import Footer from "../Components/Footer";
import BlogSectionHome from "./BlogSectionHome";
import OurClients from "../Components/OurClients";
import TestimonialSectionHome from "./TestimonialSectionHome";
import Contact from "../Components/Contact";
import ExpertiseSection from "../Components/ExpertiseSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureAnalyticsSection />
      <AboutPage />
      <ExpertiseSection />
      <HowItWorksPage />
      <OurClients />     
      <TestimonialSectionHome />
      <BlogSectionHome />
      {/* <Contact /> */}
      <Footer />
    </>
  );
};

export default Home;

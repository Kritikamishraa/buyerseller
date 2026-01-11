import React, { useEffect } from "react";
import { Box, Typography, Card, CardMedia, Grid } from "@mui/material";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../redux/slices/brandsSlice"; // import thunk
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OurClients = () => {
  const dispatch = useDispatch();
  const { items: brands, loading, error } = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const sliderSettings = {
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{
      width: "100%",
      px: { xs: 3, sm: 6, md: 10, lg: 16 },
      py: { xs: 3, sm: 6, md: 8, lg: 10 },
      display: "flex",
      flexDirection: "column",
      gap: "50px",
    }}>
      {/* Section Heading */}
      <Box sx={{ textAlign: "center", }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: "10px",
            color: "#101828",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "2.8rem" },
          }}
        >
          <Box component="span" sx={{ color: "#000" }}>
            Our{" "}
          </Box>
          <Box component="span" sx={{ color: "#28a745" }}>
            Clients
          </Box>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#8b8e94",
            fontSize: { xs: "1rem", md: "1.1rem" },
            maxWidth: 700,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          From local startups to top enterprises, BizBridge has partnered with
          amazing brands to deliver solutions that drive growth and success.
        </Typography>
      </Box>

      {/* Loader or Error */}
      {loading && <Typography align="center">Loading...</Typography>}
      {error && <Typography color="error" align="center">{error}</Typography>}

      {/* Mobile Carousel */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Slider {...sliderSettings}>
          {brands?.map((brand) => (
            <Box key={brand._id} sx={{ textAlign: "center", p: 2 }}>
              <Card
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "none",
                  border: "1px solid #c3fad5"
                }}
              >
                <CardMedia
                  component="img"
                  image={brand.image}
                  alt={`Brand ${brand._id}`}
                  sx={{ height: 120, objectFit: "contain" }}
                />
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Desktop Grid */}
      <Grid
        container
        spacing={4}
        sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}
      >
        {brands?.map((brand) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={2}
            key={brand._id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: 160,
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                boxShadow: "none",
                border: "1px solid #c3fad5"

              }}
            >
              <CardMedia
                component="img"
                image={brand.image}
                alt={`Brand ${brand._id}`}
                sx={{ height: 80, objectFit: "contain" }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurClients;

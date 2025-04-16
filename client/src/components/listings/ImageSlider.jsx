import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CardMedia } from "@mui/material";

const ImageSlider = ({ images }) => {
  return (
    <Carousel showThumbs={false} showStatus={false}>
      {images.map((image, index) => (
        <div key={index}>
          <CardMedia
            component="img"
            height="200"
            image={typeof image === 'string' ? image : image.url}
            alt={`Property image ${index + 1}`}
            style={{ objectFit: "cover", height: "200px" }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
/* eslint-disable react/jsx-no-undef */
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import '@mantine/carousel/styles.css';

const images = [
 'src/assets/carousel/carousel-1.avif',
 'src/assets/carousel/carousel-2.jpg',
];

export function CarouselComponent() {
    return (
      <>
        <Carousel withIndicators loop align="center">
            {images.map((url) =>
                <Carousel.Slide key={url}>
                    <Image src={url} h={700} />
                </Carousel.Slide>
            )}
        </Carousel>
      </>
    );
  }

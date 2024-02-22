/* eslint-disable import/extensions */
import { CarouselComponent } from '@/components/carousel/Carousel';
import SectionCards from '../../components/sectionCards/SectionCards';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';

const brandsData = [
  {
    name: 'Adidas',
    image: 'src/assets/brands/adidas.png',
  },
  {
    name: 'Nike',
    image: 'src/assets/brands/nike.png',
  },
  {
    name: 'Puma',
    image: 'src/assets/brands/puma.png',
  },
  {
    name: 'Under Armour',
    image: 'src/assets/brands/under-armour.png',
  },
  {
    name: 'Asics',
    image: 'src/assets/brands/asics.png',
  },
  {
    name: 'Fila',
    image: 'src/assets/brands/fila.png',
  },
  {
    name: 'Crocs',
    image: 'src/assets/brands/crocs.png',
  },
  {
    name: 'Bata',
    image: 'src/assets/brands/bata.png',
  },
  {
    name: 'Reebok',
    image: 'src/assets/brands/reebok.png',
  },
  {
    name: 'Kappa',
    image: 'src/assets/brands/kappa.png',
  },
];

const categoryData = [
  {
    name: 'Boots',
    image: 'src/assets/categories/boots.webp',
    footer: 'Boots',
    footerSubtitle: 'Lightweight leather boots for men and women',
  },
  {
    name: 'Sneakers',
    image: 'src/assets/categories/sneakers.webp',
    footer: 'Sneakers',
    footerSubtitle: 'A go-to choice for athletic activities',
  },
  {
    name: 'Sandals',
    image: 'src/assets/categories/sandals.webp',
    footer: 'Sandals',
    footerSubtitle: 'Perfect for relaxed dress codes and beaches',
  },
  {
    name: 'Heels',
    image: 'src/assets/categories/heels.webp',
    footer: 'Heels',
    footerSubtitle: 'A must have thing to wear under your great dress',
  },
  {
    name: 'Flip Flops',
    image: 'src/assets/categories/flip-flops.webp',
    footer: 'Flip Flops',
    footerSubtitle: 'Easy to wear, perfect for beach, pools',
  },
];

export function HomePage() {
  return (
    <>
      <Header />
      <CarouselComponent />
      <SectionCards title="SHOP BY BIGGEST BRANDS" items={brandsData} colInRow={6} />
      <SectionCards title="SHOP BY CATEGORY" items={categoryData} colInRow={5} />
      <Footer />
    </>
  );
}

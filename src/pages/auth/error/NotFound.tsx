/* eslint-disable import/extensions */
import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';
import image from '../../../assets/404.svg';
import classes from './NotFound.module.css';
import { Header } from '@/components/header/Header';

const NotFound = () => (
  <>
    <Header />
    <Container mt={50} className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Button variant="outline" c="custom-indigo" size="md" mt="xl" component={Link} to="/" className={classes.control}>
            Get back to home page
          </Button>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  </>
);

export default NotFound;

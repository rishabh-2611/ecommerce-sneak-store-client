/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Card, Image, Text } from '@mantine/core';
import classes from './SectionCard.module.css';

interface SectionCard {
    name: string;
    image: string;
    footer?: string;
    footerSubtitle?: string;
}

const SectionCard = ({ name, image, footer, footerSubtitle }:SectionCard) => (
    <Card shadow="sm" withBorder radius="md" padding="lg" className={classes.card} component="a" href="#">
      <Card.Section>
        <Image
          p={10}
          src={image}
          alt={name}
          height={280}
        />
      </Card.Section>
       {footer && <Text fw={500} size="lg" mt="md">{footer}</Text>}
       {footerSubtitle && <Text mt="xs" c="dimmed" size="sm">{footerSubtitle}</Text>}
    </Card>
  );

export default SectionCard;

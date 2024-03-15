/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable max-len */
/* eslint-disable no-lone-blocks */
import { Card, Image, Text, Flex } from '@mantine/core';
import classes from './ProductCard.module.css';
import { ProductCardProps } from '@/types/Product';

function ProductCard(props:ProductCardProps) {
    const { name, details, originalPrice, price, discount, images } = props;
    return (
        <>
        <Card withBorder radius="sm" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image h="100%" src={images && images.length ? `${process.env.SERVER_APP}/${images[0].url}` : `${process.env.SERVER_APP}/assets/images/product_default.webp`} alt={name} />
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text size="sm" fw={700}>{details.brand}</Text>
                <Text size="sm" c="dimmed" fw={500} my={3}>{name}</Text>
                <Flex>
                    <Text fw={700} mr={5} style={{ lineHeight: 1 }}>Rs. {price}</Text>
                    <Text size="xs" mr={5} td="line-through" c="dimmed" style={{ lineHeight: 1.4 }}>Rs. {originalPrice}</Text>
                    <Text size="xs" c="orange" style={{ lineHeight: 1.4 }}>({discount}% OFF)</Text>
                </Flex>
            </Card.Section>
        </Card>
        </>
    );
}

export default ProductCard;

/* eslint-disable max-len */
import { Container, SimpleGrid, Title } from '@mantine/core';
import SectionCard from '../sectionCard/SectionCard';

/* eslint-disable no-lone-blocks */

interface SectionCards {
    title: 'string',
    items: [{
        name: 'string',
        image: 'string',
        footer?: 'string',
        footerSubtitle?: 'string',
    }],
    colInRow: 'Number',
}

function SectionCards({ title, items, colInRow }:SectionCards) {
    return (
        <>
        <Container fluid px={40} my={50}>
            <Title mb={20} order={1}>{title}</Title>
            <SimpleGrid cols={colInRow}>
            {
                items.map((item) => (
                    <SectionCard key={item.name} name={item.name} image={item.image} footer={item.footer} footerSubtitle={item.footerSubtitle} />
                ))
            }
            </SimpleGrid>
        </Container>
        </>
    );
}

export default SectionCards;

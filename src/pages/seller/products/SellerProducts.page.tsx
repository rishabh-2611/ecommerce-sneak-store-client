/* eslint-disable max-len */
/* eslint-disable import/extensions */

import { Container, Badge, Paper, Button, Flex, Avatar, Table, Group, Text, ActionIcon, rem, Skeleton } from '@mantine/core';
import {
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchInput from '@/components/form/SearchInput';
import { AppDispatch } from '@/store';
import { getSellerProducts } from '@/store/slices/ProductSlice';
import { ProductCardProps } from '@/types/Product';

const DEFAULT_IMAGE = `${process.env.SERVER_APP}/assets/images/product_default.webp`;

const getGenderBadge = (gender:string) => {
    if (gender === 'Men' || gender === 'Boy') {
        return <Badge variant="light" color="blue">{gender}</Badge>;
    } if (gender === 'Women' || gender === 'Girl') {
        return <Badge variant="light" color="pink">{gender}</Badge>;
    }

    return <Badge variant="light" color="gray">{gender}</Badge>;
};

const getStatusBadge = (status:string) => {
  if (status === 'Out of stock') {
      return <Badge variant="dot" color="red">Out of stock</Badge>;
  }

  return <Badge variant="dot" color="green">In stock</Badge>;
};

const TableSkeleton = ({ rows }: { rows: number }) => {
    const rowSkeleton = Array.from({ length: rows }, (_, index) => (
        <Table.Tr key={index}>
            <Table.Td> <Skeleton height={20} mb="sm" /> </Table.Td>
            <Table.Td> <Skeleton height={20} mb="sm" /> </Table.Td>
            <Table.Td> <Skeleton height={20} mb="sm" /> </Table.Td>
            <Table.Td> <Skeleton height={20} mb="sm" /> </Table.Td>
            <Table.Td> <Skeleton height={20} mb="sm" /> </Table.Td>
        </Table.Tr>
    ));
    return (<>{rowSkeleton}</>);
};

export function SellerProductsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const [sellerProducts, setSellerProducts] = useState<ProductCardProps[]>([]);

    const loadSellerProducts = async () => {
        const result = await dispatch(getSellerProducts());
        if (result.payload.data && result.payload.data.length > 0) {
            setSellerProducts(result.payload.data);
        }
    };

    const getTableRows = () => sellerProducts.map((item) => (
        <Table.Tr key={item._id}>
          <Table.Td>
            <Group gap="sm">
              <Avatar size={40} src={item.images && item.images.length ? `${process.env.SERVER_APP}/${item.images[0].url}` : DEFAULT_IMAGE} radius={5} />
              <div>
                <Text fz="sm" fw={500}>
                  {item.name}
                </Text>
                <Text fz="xs" fw="bold">
                  Rs.{item.price}
                </Text>
              </div>
            </Group>
          </Table.Td>
          <Table.Td>
            <Text fz="sm">{item.details.category}</Text>
          </Table.Td>
          <Table.Td>
            <Text fz="sm">{item.details.brand}</Text>
          </Table.Td>
          <Table.Td>
            <Text fz="sm">{getGenderBadge(item.details.gender)}</Text>
          </Table.Td>
          <Table.Td>
            <Text fz="sm">{getStatusBadge(item.status)}</Text>
          </Table.Td>
          <Table.Td>
            <Group gap={0} justify="flex-end">
              <ActionIcon variant="subtle" color="gray">
                <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="red">
                <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Table.Td>
        </Table.Tr>
    ));

    useEffect(() => {
      loadSellerProducts();
    }, [dispatch]);

    useEffect(() => {
        getTableRows();
    }, [sellerProducts]);

    return (
        <Container fluid>
            <Flex mb="md" justify="space-between">
                <SearchInput placeholder="Search products.." />
                <Button color="green" component={Link} to="add">Add Product</Button>
            </Flex>
            <Paper px={20}>
                <Table.ScrollContainer minWidth={800}>
                    <Table verticalSpacing="sm">
                        <Table.Thead c="dimmed">
                            <Table.Tr>
                                <Table.Th>PRODUCT</Table.Th>
                                <Table.Th>CATEGORY</Table.Th>
                                <Table.Th>BRAND</Table.Th>
                                <Table.Th>GENDER</Table.Th>
                                <Table.Th>STATUS</Table.Th>
                                <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{sellerProducts.length ? getTableRows() : <TableSkeleton rows={5} />}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Paper>
        </Container>
    );
}

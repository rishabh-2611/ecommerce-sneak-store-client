/* eslint-disable max-len */
/* eslint-disable import/extensions */
import { Box, Container, Flex, SimpleGrid } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '@/components/header/Header';
import { FilterSidebar } from '@/components/filterSidebar/FilterSidebar';
import { ProductFilterForm, ProductCardProps } from '@/types/Product';
import ProductCard from '@/components/productCard/ProductCard';
import { AppDispatch } from '@/store';
import { getProducts } from '@/store/slices/ProductSlice';
import { showErrorToast } from '@/utils/toastUtils';

export function ProductsPage() {
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm<ProductFilterForm>();
    const dispatch = useDispatch<AppDispatch>();
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        try {
            console.log('Loading products...');

            const result = await dispatch(getProducts());
            if (result.payload.data && result.payload.data.length > 0) {
                setProducts(result.payload.data);
            }
        } catch (error) {
            showErrorToast('Something went wrong. Products cannot be fetched.');
        }
    };

    useEffect(() => {
      loadProducts();
    }, []);

    const onProductFilter = () => {
        const values = getValues();
        console.log(values);
    };

    return (
        <>
            <Header />
            <Container fluid>
                <Flex>
                    <div>
                        <FilterSidebar {...{ register, handleSubmit, onProductFilter, setValue }} />
                    </div>
                    <Box mt={72} px={20}>
                        <SimpleGrid cols={5}>
                            {products.map((product:ProductCardProps) =>
                                <ProductCard key={product._id} {...product} />
                            )}
                        </SimpleGrid>
                    </Box>
                </Flex>
            </Container>
        </>
    );
}

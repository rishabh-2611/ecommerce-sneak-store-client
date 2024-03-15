/* eslint-disable import/extensions */
import { Title, ScrollArea, Divider, Paper, Stack, Radio, Checkbox, Button, Group } from '@mantine/core';
import classes from './Sidebar.module.css';
import { ProductBrands, ProductCategories, ProductGenders, ProductMaterials, ProductSizes } from '@/types/Product';

export function Sidebar({ register, handleSubmit, onProductFilter, setValue }:any) {
   const productDiscountRadios = [];
   for (let i = 10; i <= 100; i += 10) {
    productDiscountRadios.push(<Radio key={i} name="discount" {...register('discount')} size="xs" label={`${i}% and above`} value={i} />);
   }

  return (
    <>
        <nav className={classes.navbar}>
          <Group justify="space-between">
            <Title order={6}>FILTERS</Title>
            <Button variant="default" size="xs">Clear All</Button>
          </Group>
          <Divider my="sm" />
          <Paper withBorder shadow="xs" p="md">
            <ScrollArea h={750}>
                <Title order={6}>GENDER</Title>
                <Stack gap="sm" my="md">
                    { ProductGenders.map(el =>
                        <Radio key={el} name="gender" {...register('gender')} size="xs" label={el} value={el} />
                    )}
                </Stack>
                <Divider my="md" />
                <Title order={6} mt="md">CATEGORIES</Title>
                <Stack gap="sm" my="md">
                    { ProductCategories.map(el =>
                        <Checkbox key={el} name="category" {...register('category')} size="xs" label={el} value={el} />
                    )}
                </Stack>
                <Divider my="md" />
                <Title order={6} mt="md">BRAND</Title>
                <Stack gap="sm" my="md">
                    { ProductBrands.map(el =>
                        <Checkbox key={el} name="brand" {...register('brand')} size="xs" label={el} value={el} />
                    )}
                </Stack>
                <Divider my="md" />
                <Title order={6} mt="md">SIZES</Title>
                <Stack gap="sm" my="md">
                    { ProductSizes.map(el =>
                        <Checkbox key={el} name="size" {...register('size')} size="xs" label={el} value={el} />
                    )}
                </Stack>
                <Divider my="md" />
                <Title order={6} mt="md">MATERIAL</Title>
                <Stack gap="sm" my="md">
                    { ProductMaterials.map(el =>
                        <Checkbox key={el} name="material" {...register('material')} size="xs" label={el} value={el} />
                    )}
                </Stack>
                <Divider my="md" />
                <Title order={6} mt="md">DISCOUNT</Title>
                <Stack gap="sm" my="md">
                    {productDiscountRadios}
                </Stack>
            </ScrollArea>
          </Paper>
        </nav>
    </>
  );
}

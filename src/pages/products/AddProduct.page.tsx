/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable import/extensions */
import { TextInput, Button, Container, Text, Image, Title, rem, Flex, Input, Grid, Paper, NativeSelect, SimpleGrid, FileButton, ActionIcon, ScrollArea, MultiSelect } from '@mantine/core';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrowNarrowLeft, IconPlus, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { Header } from '@/components/header/Header';
import { AppDispatch } from '@/store';
import { AddProductForm, ProductBrands, ProductCategories, ProductGenders, ProductMaterials, ProductSizes } from '../../types/Product';
import { TextEditor } from '@/components/form/TextEditor';
import { uploadMedia } from '@/store/slices/MediaSlice';
import { MediaObject } from '@/types/Media';
import { addProduct } from '@/store/slices/ProductSlice';
import { showErrorToast } from '@/utils/toastUtils';

export function AddProductPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { register, handleSubmit, getValues, setValue, control, formState: { errors } } = useForm<AddProductForm>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sizes',
    });

    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [currentImage, setCurrentImage] = useState<File>();
    const [fieldsCounter, setFieldsCounter] = useState<number>(0);

    const handleSubmitProduct: SubmitHandler<AddProductForm> = async (data) => {
        try {
            const images:string[] = [];
            if (uploadedImages && uploadedImages.length > 0) {
                const result = await dispatch(uploadMedia({ files: uploadedImages, category: 'product' }));
                if (result.payload.data && result.payload.data.length > 0) {
                    result.payload.data.forEach((el:MediaObject) => {
                        images.push(el._id);
                    });
                }
            }

            data.images = images;
            const result:any = await dispatch(addProduct(data));
            if (!result.error) {
               navigate('/');
            }
        } catch (error) {
            showErrorToast('Something went wrong');
        }
    };

    const calculatePriceAfterDiscount = () => {
        const discount = getValues('discount');
        const originalPrice = getValues('originalPrice');
        const price = Number(originalPrice) - (Number(originalPrice) * discount / 100);

        setValue('price', price);
    };

    const onUpdateUploadedImages = (files: File[]) => {
        setUploadedImages([...uploadedImages, ...files]);
        if (currentImage === undefined) setCurrentImage(files[0]);
    };

    const onRemoveUploadedImage = (name: string) => {
        const updatedImages = uploadedImages.filter(file => file.name !== name);
        setUploadedImages(updatedImages);
        if (currentImage && currentImage.name === name) setCurrentImage(updatedImages[0]);
    };

    const onShowClickedImage = (name: string) => {
        const clickedImage = uploadedImages.find(file => file.name === name);
        setCurrentImage(clickedImage);
    };

    const onProductSizeSelectionChanged = (values: any) => {
        const fieldNames = fields.map(el => el.name);
        if (values.length === 0) {
            remove();
        } else if (fieldsCounter > values.length) {
            // A selection has been removed
            const fieldIndexToRemove = fieldNames.findIndex((name) => !values.includes(name));
            if (fieldIndexToRemove >= 0) remove(fieldIndexToRemove);
        } else if (fieldsCounter < values.length) {
            // A selection has been submitted
            append({ name: values[values.length - 1], quantity: 0 });
        }

        setFieldsCounter(values.length);
    };

    return (
      <>
        <Header />
        <Container size="lg" my="xl">
            {/* <Breadcrumbs my="lg" separator="•" separatorMargin="md">{links}</Breadcrumbs> */}
            <Text c="dimmed" size="md" component={Link} to="/products">
                <IconArrowNarrowLeft style={{ width: rem(18), height: rem(12) }} stroke={1.5} />
                Back to Products
            </Text>
            <form onSubmit={handleSubmit(handleSubmitProduct)}>
                <Flex my="md" justify="space-between">
                    <Title order={2}>Add Product</Title>
                    <Button type="submit" color="green">Submit</Button>
                </Flex>

                <Grid>
                    <Grid.Col span={7}>
                        <Paper p="lg" mb="md">
                            <Title order={5}>General Information</Title>
                            <Input.Wrapper my="md" label="Name" error={errors.name && <Text size="xs" c="red">Please enter a valid name</Text>}>
                                <TextInput size="sm" {...register('name', { required: true })} aria-invalid={errors.name ? 'true' : 'false'} placeholder="Enter product name" withAsterisk={false} />
                            </Input.Wrapper>

                            <Input.Wrapper my="md" label="Description" error={errors.description && <Text size="xs" c="red">Please enter product description</Text>}>
                                {/* <Textarea minRows={5} autosize maxRows={5} size="sm" {...register('description', { required: true })} aria-invalid={errors.description ? 'true' : 'false'} placeholder="Enter product description" withAsterisk={false} /> */}
                                <TextEditor
                                  {...register('description', { required: true })}
                                  aria-invalid={errors.description ? 'true' : 'false'}
                                  name="description"
                                  content=""
                                  setValue={setValue}
                                />
                            </Input.Wrapper>
                        </Paper>

                        <Paper p="lg" mb="md">
                            <Title order={5} pb="md">Product Details</Title>
                            <SimpleGrid cols={2}>
                                <Input.Wrapper label="Category" error={errors.details && errors.details.category && <Text size="xs" c="red">Please select a valid category</Text>}>
                                    <NativeSelect size="sm" {...register('details.category', { required: true })} aria-invalid={errors.details && errors.details.category ? 'true' : 'false'} data={ProductCategories} />
                                </Input.Wrapper>

                                <Input.Wrapper label="Brand" error={errors.details && errors.details.brand && <Text size="xs" c="red">Please select a valid brand</Text>}>
                                    <NativeSelect size="sm" {...register('details.brand', { required: true })} aria-invalid={errors.details && errors.details.brand ? 'true' : 'false'} data={ProductBrands} />
                                </Input.Wrapper>

                                <Input.Wrapper label="Material" error={errors.details && errors.details.material && <Text size="xs" c="red">Please select a material</Text>}>
                                    <NativeSelect size="sm" {...register('details.material', { required: true })} aria-invalid={errors.details && errors.details.material ? 'true' : 'false'} data={ProductMaterials} />
                                </Input.Wrapper>

                                <Input.Wrapper label="Gender" error={errors.details && errors.details.gender && <Text size="xs" c="red">Please select a gender</Text>}>
                                    <NativeSelect size="sm" {...register('details.gender', { required: true })} aria-invalid={errors.details && errors.details.gender ? 'true' : 'false'} data={ProductGenders} />
                                </Input.Wrapper>
                            </SimpleGrid>

                        </Paper>

                        <Paper p="lg">
                            <Title order={5} pb="md">Product Stock</Title>
                            <Input.Wrapper my="sm" label="Size" description="Please select the different sizes for this product">
                                <MultiSelect size="sm" onChange={(values: any) => onProductSizeSelectionChanged(values)} required checkIconPosition="right" searchable clearable hidePickedOptions placeholder="Select sizes" data={ProductSizes} withAsterisk={false} />
                            </Input.Wrapper>

                            { fieldsCounter > 0
                            && <Input.Wrapper my="sm" label="Quantity" description="Please enter the available quantity for sizes">
                                    <SimpleGrid cols={4}>
                                        {fields.map((item, index) => (
                                            <>
                                            <Input.Wrapper label={item.name} key={item.name}>
                                                <TextInput style={{ display: 'none' }} size="sm" {...register(`sizes.${index}.name` as const)} withAsterisk={false} />
                                                <TextInput
                                                  placeholder="Quantity"
                                                  type="number"
                                                  {...register(`sizes.${index}.quantity` as const, {
                                                        valueAsNumber: true,
                                                        required: true,
                                                    })}
                                                  className={errors?.sizes?.[index]?.quantity ? 'error' : ''}
                                                />
                                            </Input.Wrapper>
                                            </>

                                        ))}
                                    </SimpleGrid>
                               </Input.Wrapper>
                            }

                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={5}>
                        <Paper p="lg" mb="md">
                            <Title order={5} pb="md">Upload Images</Title>
                            <Image radius="sm" h={220} src={currentImage ? URL.createObjectURL(currentImage) : ''} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                            <ScrollArea h={80} mt="sm">
                                <SimpleGrid cols={4} py="sm">
                                    {uploadedImages.map((image) =>
                                        <div key={image.name} style={{ position: 'relative', display: 'inline-block' }}>
                                            <Image onClick={() => onShowClickedImage(image.name)} radius="sm" h={60} src={URL.createObjectURL(image)} />
                                            <ActionIcon
                                              size="xs"
                                              variant="filled"
                                              color="red"
                                              radius="lg"
                                              onClick={() => onRemoveUploadedImage(image.name)}
                                              style={{
                                                position: 'absolute',
                                                top: -10,
                                                right: 0,
                                            }}
                                            >
                                                <IconX />
                                            </ActionIcon>
                                        </div>
                                    )}
                                    <FileButton onChange={(files) => onUpdateUploadedImages(files)} accept="image/png,image/jpeg" multiple>
                                        {(props) => <Button h={60} style={{ borderStyle: 'dotted' }} variant="outline" {...props}><IconPlus /></Button>}
                                    </FileButton>
                                </SimpleGrid>
                            </ScrollArea>
                        </Paper>

                        <Paper p="lg">
                            <Title order={5} pb="md">Price</Title>
                            <Input.Wrapper my="sm" label="Original Price" error={errors.originalPrice && <Text size="xs" c="red">Please enter base price</Text>}>
                                <TextInput size="sm" type="number" {...register('originalPrice', { valueAsNumber: true, required: true })} min={1} onKeyUp={() => calculatePriceAfterDiscount()} aria-invalid={errors.originalPrice ? 'true' : 'false'} placeholder="Enter base price" withAsterisk={false} />
                            </Input.Wrapper>

                            <Input.Wrapper my="sm" label="Discount (In %)" error={errors.discount && <Text size="xs" c="red">Please enter discount</Text>}>
                                <TextInput size="sm" type="number" {...register('discount', { valueAsNumber: true, required: true })} min={0} max={100} onKeyUp={() => calculatePriceAfterDiscount()} aria-invalid={errors.discount ? 'true' : 'false'} placeholder="Enter base price" withAsterisk={false} />
                            </Input.Wrapper>

                            <Input.Wrapper my="sm" label="Price" description="The final price will be auto calculated">
                                <TextInput readOnly size="sm" type="number" {...register('price', { valueAsNumber: true })} aria-invalid={errors.price ? 'true' : 'false'} placeholder="Enter price" withAsterisk={false} />
                            </Input.Wrapper>
                        </Paper>
                    </Grid.Col>
                </Grid>

            </form>
        </Container>
      </>
    );
}

export interface AddProductForm {
    name: string;
    description: string;
    details: {
        category: string,
        brand: string,
        gender: string,
        material: string
    };
    productSizes: string[];
    sizes:{
        name: string;
        quantity: number;
    }[];
    originalPrice: number;
    discount: 0;
    price: number;
    videos: string[];
    images: string[];
}

export const ProductCategories = ['Sneakers', 'Boots', 'Sandals', 'Shoes', 'Heels', 'Slippers', 'Flip Flops', 'Other'];

export const ProductBrands = ['Adidas', 'Asics', 'Bata', 'Crocs', 'Fila', 'Kappa', 'Nike', 'Puma', 'Reebok', 'Skechers', 'Under Armour'];

export const ProductGenders = ['Men', 'Women', 'Unisex', 'Boy', 'Girl'];

export const ProductMaterials = ['Leather', 'Textile', 'Synthetic', 'Rubber', 'Foam', 'Plastic', 'N/A'];

export const ProductSizes = ['US 3', 'US 4', 'US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'US 13', 'US 14', 'Onesize'];

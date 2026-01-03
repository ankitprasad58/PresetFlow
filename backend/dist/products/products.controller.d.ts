import { ProductsService } from './products.service';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        category: string;
        previewUrl: string | null;
        fileUrl: string;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        category: string;
        previewUrl: string | null;
        fileUrl: string;
    } | null>;
}
//# sourceMappingURL=products.controller.d.ts.map
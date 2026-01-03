import { PrismaService } from '../shared/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
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
    findById(id: string): Promise<{
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
    create(data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        category: string;
        previewUrl: string | null;
        fileUrl: string;
    }>;
}
//# sourceMappingURL=products.service.d.ts.map
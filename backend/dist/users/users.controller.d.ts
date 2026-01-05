import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    register(body: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        credits: number;
        lastCreditDeductedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=users.controller.d.ts.map
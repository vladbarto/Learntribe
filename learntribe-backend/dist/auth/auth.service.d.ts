import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    createUser(registerDto: RegisterUserDto): Promise<any>;
    findUserByUsername(username: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
}

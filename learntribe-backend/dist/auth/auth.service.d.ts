import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<User>);
    validateUser(username: string, password: string): Promise<any>;
    createUser(registerDto: RegisterUserDto): Promise<any>;
    findUserByUsername(username: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
}

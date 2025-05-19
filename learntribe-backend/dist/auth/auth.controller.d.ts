import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginUserDto): Promise<{
        access_token: string;
        user: any;
    }>;
    register(registerDto: RegisterUserDto): Promise<{
        user: any;
    }>;
}

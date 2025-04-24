import { isEmail, IsNotEmpty, IsString, Validate } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @Validate(isEmail)
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }


  async createUser(registerDto: RegisterUserDto): Promise<any> {
    const existingUser = await this.userModel.findOne({
      $or: [
        { username: registerDto.username },
        { email: registerDto.email }
      ]
    }).exec();

    if (existingUser) {
      throw new Error('Numele de utilizator sau email-ul exista deja');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = new this.userModel({
      email: registerDto.email,
      username: registerDto.username,
      password: hashedPassword,
      role: registerDto.role,
    });

    const savedUser = await newUser.save();
    const { password, ...result } = savedUser.toObject();
    return result;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

}
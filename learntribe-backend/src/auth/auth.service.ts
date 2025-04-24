import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateLectureDto } from '../lectures/dto/create-lecture.dto';
import { Lecture } from '../lectures/schemas/lecture.schema';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();

    if (user && user.password === password) {
      // Nu trimite parola înapoi clientului
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async createUser(registerDto: RegisterUserDto): Promise<any> {
    // Verifică dacă utilizatorul există deja
    const existingUser = await this.userModel.findOne({
      $or: [
        { username: registerDto.username },
        { email: registerDto.email }
      ]
    }).exec();

    if (existingUser) {
      throw new Error('Numele de utilizator sau email-ul exista deja');
    }

    // Crează noul utilizator
    const newUser = new this.userModel({
      email: registerDto.email,
      username: registerDto.username,
      password: registerDto.password,
      role: registerDto.role,
    });

    // Save and return created user, without password
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

}
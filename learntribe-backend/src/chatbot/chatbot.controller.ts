// chatbot.controller.ts
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly geminiService: GeminiService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async chat(@Body('message') message: string) {
    return {
      response: await this.geminiService.chat(message),
    };
  }
}

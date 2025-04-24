// chatbot.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post()
  async chat(@Body('message') message: string) {
    return {
      response: await this.geminiService.chat(message),
    };
  }
}

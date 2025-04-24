import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { GeminiService } from './gemini.service';

@Module({
  imports: [],
  controllers: [ChatbotController],
  providers: [GeminiService],
  exports: [GeminiService],
})
export class ChatbotModule {}

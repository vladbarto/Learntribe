import { GeminiService } from './gemini.service';
export declare class ChatbotController {
    private readonly geminiService;
    constructor(geminiService: GeminiService);
    chat(message: string): Promise<{
        response: string;
    }>;
}

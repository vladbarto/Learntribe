// gemini.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeminiService {
  private readonly apiKey = 'AIzaSyDlTlvPVqsmOspP8GDGiiiPq0L9CIZBBcc';
  private readonly endpoint =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  async chat(prompt: string): Promise<string> {
    const response = await axios.post(
      `${this.endpoint}?key=${this.apiKey}`,
      {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response';
  }
}

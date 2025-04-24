"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let GeminiService = class GeminiService {
    apiKey = 'AIzaSyDlTlvPVqsmOspP8GDGiiiPq0L9CIZBBcc';
    endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    async chat(prompt) {
        const response = await axios_1.default.post(`${this.endpoint}?key=${this.apiKey}`, {
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
        });
        return response.data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response';
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = __decorate([
    (0, common_1.Injectable)()
], GeminiService);
//# sourceMappingURL=gemini.service.js.map
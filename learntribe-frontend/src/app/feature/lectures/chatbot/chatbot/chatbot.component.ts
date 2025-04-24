import { Component } from '@angular/core';
import {ChatbotService} from '../../../../core/service/chatbot/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  isOpen = false;
  userMessage = '';
  botResponse = '';
  chatBotReponseList: string[] = [];
  chatUserRequestList: string[] = [];

  constructor(private chatbot: ChatbotService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  send() {
    if (!this.userMessage.trim()) return;

    this.chatUserRequestList.push(this.userMessage);
    this.chatbot.chat(this.userMessage).subscribe(res => {
      this.botResponse = res.response;
      this.chatBotReponseList.push(this.botResponse);
      this.userMessage = '';
    });
  }
}

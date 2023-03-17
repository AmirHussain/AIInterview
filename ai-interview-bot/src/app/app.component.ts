import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';
import { ChatgptService } from '../services/chatgpt.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AI Interview';
  showInterViewSection = false;
  loading = false;
  questions: any[] = [];
  showResult = false;
  constructor(private chatgptService: ChatgptService) {

  }

  async setInterviewQuestions(event: {}) {
    this.loading = true;
    this.showInterViewSection = true
    await this.generateQuestions();
    this.loading = false;
  }
  async generateQuestions() {


    try {
      this.questions = await this.chatgptService.generateQuestions(`Create a list of 8 interview questions of web developer with 5 years of experience in Angular`);

    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      console.log(error)
    }
  }
}

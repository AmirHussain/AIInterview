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
    const prompt = this.generaPromptForQuestions(event);
    await this.generateQuestions(prompt);
    this.loading = false;
  }


  getSkillSentence(){

  }
  generaPromptForQuestions(event: any) {
    console.log(event);

return `Generate 20 interview questions for \nAnswer:${event.title} having \njobDescription:( ${event.description} ).
User is having following skills: ${event.skills.forEach((skill:any, index:number) => {
  return `${index}-  ${skill.skill} expertise of ${skill.Level} level`
})}
User is having following education: ${event.education.forEach((edu:any, index:number) => {
  return `${index}-  ${edu.degree} from ${edu.institution}`
})}

User is having this experience: ${event.experience.forEach((exp:any, index:number) => {
  return `${index}-  ${exp.Role} in  ${exp.Organization} for ${exp.NoOfYears} years and was performing responsibilities ${exp.Responsibilities}`
})}
`

    // return `Create a list of 8 interview questions of web developer with 5 years of experience in Angular`;
  }

  async generateQuestions(prompt: string) {


    try {
      this.questions = await this.chatgptService.generateQuestions(prompt);

    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      console.log(error)
    }
  }
}

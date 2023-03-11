import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AI Interview';
  topic = new FormControl('');
  openai: OpenAIApi;
  configuration: Configuration;
  questions: any[] = [];
  constructor() {
    this.configuration = new Configuration({
      apiKey: environment.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);

  }

  async generateQuestions() {
    if (!this.configuration.apiKey) {
      alert("OpenAI API key not configured, please follow instructions in README.md")
      return;
    }

    if (this.title.trim().length === 0) {
      alert("Please enter a valid animal")
      return;
    }

    try {
      const completion = await this.openai.createCompletion({
        temperature: 0.5,
        model: 'text-davinci-003',
        prompt: `Create a list of 8 interview questions of ${this.topic.value} developer`,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      });
      console.log(completion.data.choices)
if(completion.data.choices[0]&&completion.data.choices[0].text){
  this.questions =  completion.data.choices[0].text.split('\n').filter(question=>!!question)
  
}
    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      console.log(error)
    }
  }
}

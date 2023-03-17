import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {
  configuration: Configuration;
  openai: OpenAIApi;

  constructor() {
    this.configuration = new Configuration({
      apiKey: environment.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);

  }

  async generateQuestions(prompt: string): Promise<any[]> {
    if (!this.configuration.apiKey) {
      alert("OpenAI API key not configured, please follow instructions in README.md")
      return [];
    }

    const completion = await this.openai.createCompletion({
      temperature: 0.1,
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0
    });
    console.log(completion.data.choices)
    if (completion.data.choices[0] && completion.data.choices[0].text) {
      const questions = completion.data.choices[0].text.split('\n').filter(qs => !!qs)
      return questions.map((question) => {
        return { question, score: 0, idealAnswer: '', userAnswer: '' }
      })
    }

    return []
  }



  async scoreAnswer(question: string, userAnswer: string) {
    try {
      const prompt = `${question}\nAnswer: ${userAnswer}`;
      const completion = await this.openai.createCompletion({
        temperature: 0.1,
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 1024,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      });
      console.log(completion.data.choices)
      if (completion.data.choices[0] && completion.data.choices[0].text) {
        const idealAnswer = completion.data.choices[0].text.trim();
        const similarityScore = this.computeSimilarityScore(userAnswer, idealAnswer);
        return { score: similarityScore, userAnswer, idealAnswer };
      }
      return 0;
    } catch (error) {
      console.error(error);
      return 0;

    }
  }

  computeSimilarityScore(userAnswer: string, idealAnswer: string): number {
    // Implement a similarity metric to compare the user's answer and the ideal answer.
    // Here's an example using the Jaccard similarity coefficient:
    const intersection = new Set([...userAnswer.split(' ')].filter(x => idealAnswer.split(' ').includes(x)));
    const union = new Set([...userAnswer.split(' '), ...idealAnswer.split(' ')]);
    const similarity = intersection.size / union.size;
    return similarity;
  }
}

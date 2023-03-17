import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ChatgptService } from '../../services/chatgpt.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnChanges {
  @Input() loading: boolean = false;
  @Input() questions: any[] = [];
  @Output() userAnswers = new EventEmitter<any[]>();

  questionsForm: FormGroup;
  showStepper = true;
  averageScore = 0;
  submittedAnswers = 0;
  constructor(private _formBuilder: FormBuilder, private chatgptService: ChatgptService) {
    this.questionsForm = this._formBuilder.group({})
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questions'] && changes['questions'].currentValue !== changes['questions'].previousValue) {
      console.log(this.questions)
      this.questions.forEach((question, index) => {
        this.questionsForm.addControl(`Q${index}`, new FormControl('', Validators.required));

      })
    }
  }
  async submitResult(index: number) {
    const answer = await this.chatgptService.scoreAnswer(this.questions[index].question, this.questionsForm.controls['Q' + index].value);

    if (answer) {
      this.submittedAnswers++;
      this.questions[index].score = answer.score;
      this.questions[index].userAnswer = answer.userAnswer;
      this.questions[index].idealAnswer = answer.idealAnswer;
      if (this.submittedAnswers === this.questions.length) {
        this.showStepper = false;
        this.averageScore = this.questions.reduce((a, b) => a + b['score'], 0) / (this.questions.length - 1);
        this.loading = true;
        this.userAnswers.emit(this.questions);
      }

    }
  }

}

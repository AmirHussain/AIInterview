import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnChanges {
  imagePaths = ['https://e7.pngegg.com/pngimages/166/567/png-clipart-%E4%B8%8D%E5%87%8B%E8%8A%B1-i-fail-stamp-text-label.png', 'https://images.squarespace-cdn.com/content/v1/609320326df7672dc3ee6205/1620254871445-L8UATWJHT8RDHGE2TXZ7/PASS+Logo+Horizontal+Full+Color+CROP.png'];
  image = '';
  score = 0;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questions'].currentValue !== changes['questions'].previousValue) {
      this.calculateScore()
    }
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  @Input() questions: any[] = []

  calculateScore() {
    this.score = (this.questions.reduce((a, b) => a + b['score'], 0) / (this.questions.length - 1))

    this.image = this.imagePaths[Math.round(this.score)]
  }

  getResult() {
    return (Math.round((this.score + Number.EPSILON) * 100 ) / 100)*100
  }
}

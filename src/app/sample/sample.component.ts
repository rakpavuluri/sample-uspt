import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  showError = false;
  inputText: string;
  errorMessage: string;
  constructor() { }

  ngOnInit(): void {
  }

  validateInput() {
    if (this.inputText) {
      this.errorMessage = null;
      this.showError = false;
      const strs = Array.from(this.inputText.match(/[^\r\n]+/g)).map(item => Number(item));
      if (strs.length > 500) {
        this.showError = true;
        this.errorMessage = 'Exceeds more than 500 lines!';
        return;
      }
      let areAllNumbers = true;
      for (let item of strs) {
        if (isNaN(item)) {
          areAllNumbers = false;
          break;
        }
      }
      if (!areAllNumbers) {
        this.showError = true;
        this.errorMessage = 'Not all are Numbers! Please Check Again!';
        return;
      }
      let areAllSameLength = true;
      for (let item of strs) {
        const str = item.toString().split('');
        if (str.length != 8) {
          areAllSameLength = false;
          break;
        }
      }
      if (!areAllSameLength) {
        this.showError = true;
        this.errorMessage = 'Please Check that all the IDs must be of length 8';
        return;
      }
    }
  }

}

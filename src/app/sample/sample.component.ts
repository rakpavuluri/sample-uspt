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
  errorLengthLimit = 80;
  showMore = false;
  constructor() { }

  ngOnInit(): void {
  }

  displayError(str: string) {
    this.showMore = false;
    this.showError = true;
    this.errorMessage = str;
  }

  validateInput() {
    if (this.inputText) {
      this.errorMessage = null;
      this.showError = false;
      const strs = Array.from(this.inputText.match(/[^\r\n]+/g)).map(item => Number(item));
      const strVals = Array.from(this.inputText.match(/[^\r\n]+/g)).map(item => String(item));
      if (strs.length > 500) {
        this.displayError('Exceeds more than 500 lines!');
        return;
      }
      const inValidValues = [];
      // Check for, are all numbers
      let areAllNumbers = true;
      // if (!areAllNumbers) {
      //   this.displayError('Following are not numbers: ' + inValidValues.join(', '));
      // }
      // Check for, are all of valid length
      let areAllSameLength = true;
      for (let i = 0; i < strs.length; i++) {
        const str = strs[i].toString().split('');
        if (str.length != 8) {
          areAllSameLength = false;
          inValidValues.push(strVals[i]);
        }
        if (isNaN(strs[i])) {
          areAllNumbers = false;
          inValidValues.push(strVals[i]);
        }
      }
      const uniqueArray = inValidValues.filter(function (item, pos) {
        return inValidValues.indexOf(item) == pos;
      })
      // Displaying all errors
      if (!areAllSameLength || !areAllNumbers) {
        this.displayError('Following are the errors: ' + uniqueArray.join(', '));
        return;
      }
    }
  }

  checkErrorMessageLength() {
    if (this.errorMessage.split('').length > this.errorLengthLimit && !this.showMore) {
      return true;
    } else {
      return false;
    }
  }

  showMoreErrorMsg() {
    this.showMore = !this.showMore;
  }

  showTrimmedMsg(str: string) {
    if (!this.showMore) {
      const initialErrors = str.split(',')[0] + ', ' + str.split(',')[1];
      return initialErrors;
    } else {
      return str;
    }
  }

}

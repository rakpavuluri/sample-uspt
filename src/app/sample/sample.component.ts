import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { BsLocaleService, defineLocale } from 'ngx-bootstrap'
import { itLocale } from 'ngx-bootstrap/locale';
import { Router } from '@angular/router';
import { GenerateReportService } from '../services/generate-report.service';

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

  dateValues = {
    fromDate: null,
    toDate: null
  };

  dateValidationError = '';

  maxToDate = null;
  minToDate = null;
  minFromDate = null;
  maxFromDate = null;

  constructor(private formBuilder: FormBuilder, private localeService: BsLocaleService, private router: Router, private generateReportService: GenerateReportService) {
    this.setMinDates();
  }

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
      this.generateReportService.generateReportObj.type = 'numeric';
      this.generateReportService.generateReportObj.values = uniqueArray;
      this.router.navigateByUrl('/report-generated');
    }
  }

  checkErrorMessageLength() {
    if (this.errorMessage.split(', ').length > 2 && !this.showMore) {
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
      let initialErrors = '';
      // if (str.split(', ').length > 2) {
      //   for (let item of str.split(',')) {
      //     if(initialErrors.split(', ').length <= this.errorLengthLimit){
      //       initialErrors += ', ' + item;
      //     }
      //   }
      //   initialErrors = initialErrors.slice(2);
      // } else {
      initialErrors = str.split(',').length === 1 ? str.split(',')[0] : (str.split(',')[0] + ', ' + str.split(',')[1]);
      // }
      return initialErrors;
    } else {
      return str;
    }
  }


  // --------------------------------------------------------- Date Functions -------------------------------------------

  verifyDates() {
    const fromDate = new Date(this.dateValues.fromDate);
    const toDate = new Date(this.dateValues.toDate);
    const pastYearDate = new Date();
    const futureYearDate = new Date();
    const validToDate = new Date(fromDate);
    pastYearDate.setDate(pastYearDate.getDate() - 365);
    futureYearDate.setDate(futureYearDate.getDate() + 365);
    validToDate.setDate(validToDate.getDate() + 7);
    if (fromDate < pastYearDate || toDate < pastYearDate || fromDate > futureYearDate || toDate > futureYearDate) {
      this.dateValidationError = 'Please choose dates within the past year';
      return false;
    }
    // if(toDate > validToDate){
    //   this.dateValidationError = 'Please choose from 1 to 7 days';
    //   return false;
    // }
    if (fromDate <= toDate && toDate <= validToDate) {
      this.generateReportService.generateReportObj.type = 'date';
      this.generateReportService.generateReportObj.fromDate = fromDate;
      this.generateReportService.generateReportObj.toDate = toDate;
      this.router.navigateByUrl('/report-generated');
    } else {
      this.dateValidationError = 'Please choose from 1 to 7 days';
      return false;
    }
  }

  onFromDateValueChange(event: any) {
    var maxToDate = new Date(event);
    maxToDate.setDate(maxToDate.getDate() + 7);
    this.maxToDate = maxToDate;
    this.minToDate = event;
    this.dateValidationError = '';
  }

  setMinDates() {
    var minDate = new Date();
    var maxDate = new Date();
    minDate.setDate(minDate.getDate() - 365);
    maxDate.setDate(maxDate.getDate() + 365);
    this.minToDate = minDate;
    this.minFromDate = minDate;
    this.maxToDate = maxDate;
    this.maxFromDate = maxDate;
  }

  onToDateValueChange(event: any) {
    console.log(event);
    this.dateValidationError = '';
  }

  checkIfDatesAreValid() {
    if (this.dateValues.fromDate && this.dateValues.toDate) {
      return true;
    } else {
      return false;
    }
  }


}

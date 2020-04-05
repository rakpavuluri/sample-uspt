import { Component, OnInit } from '@angular/core';
import { GenerateReportService } from '../services/generate-report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-generated',
  templateUrl: './report-generated.component.html',
  styleUrls: ['./report-generated.component.css']
})
export class ReportGeneratedComponent implements OnInit {

  tabs = [
    {
      title: 'title 1',
      contentType: 'table',
      content: [
        {
          id: 1,
          name: 'fwefe',
          imageLink: 'https://via.placeholder.com/150'
        }, {
          id: 2,
          name: 'verber',
          imageLink: 'https://via.placeholder.com/150'
        }, {
          id: 3,
          name: 'beberb',
          imageLink: 'https://via.placeholder.com/150'
        }
      ],
      id: 1,
      active: true
    }, {
      title: 'title 2',
      contentType: 'image',
      url: 'https://via.placeholder.com/150',
      id: 2,
      active: false
    }, {
      title: 'title 3',
      contentType: 'image',
      url: 'https://via.placeholder.com/150',
      id: 3,
      active: false
    }
  ]
  constructor(private generateReportService: GenerateReportService, private router: Router) { }

  ngOnInit(): void {
    if (this.generateReportService.generateReportObj.type) {
      this.generateReportService.getReportResults().subscribe((data) => {

      }, error => {

      });
    } else {
      console.log('No data found!');
      this.router.navigateByUrl('/');
    }
  }

  openImage(tab: any) {
    console.log(tab);
    const nextIndex = this.tabs.length + 1;
    this.tabs.forEach((item) => {
      item.active = false;
    });
    setTimeout(() => {
      this.tabs.push({
        title: 'title ' + nextIndex,
        contentType: 'image',
        url: tab.imageLink,
        id: nextIndex,
        active: true
      });
    }, 300);
  }

  selectTabActive(id: number) {
    setTimeout(() => {
      this.tabs.forEach((item) => {
        item.active = item.id === id ? true : false;
      });
    }, 200);
  }

}

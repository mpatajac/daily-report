import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Report } from '../../common/models/report';
import { ReportService } from 'src/app/common/services/report.service';


@Component({
  selector: 'app-display-report',
  templateUrl: './display-report.component.html',
  styleUrls: ['./display-report.component.scss']
})
export class DisplayReportComponent implements OnInit {
  @Input() report: Report;

  date: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService
  ) { }

  async ngOnInit() {
    await this.getReport();
    this.date = this.report.date.toDateString();
  }


  async getReport() {
    const id = this.route.snapshot.paramMap.get('id');
    this.report = await this.reportService.getReportById(id);

    // redirect to 404 if no report with given ID is found
    if (!this.report) {
      this.router.navigateByUrl("/not-found");
    }
  }
}

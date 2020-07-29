import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { User } from "../../common/models/user";
import { Report } from 'src/app/common/models/report';

import { UserService } from "../../common/services/user.service";
import { ReportService } from 'src/app/common/services/report.service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {
  user: User;
  reportName: string;
  done: Array<string>;
  inProgress: Array<string>;
  scheduled: Array<string>;
  problems: Array<string>;

  // used to "deactivate" guard on return to dashboard
  wantsBack: boolean;

  // used to check if user decided to proceed with empty fields
  warningConfirmed: boolean;


  constructor(
    private userService: UserService,
    private reportService: ReportService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.done = [];
    this.inProgress = [];
    this.scheduled = [];
    this.problems = [];

    this.wantsBack = false;
    this.warningConfirmed = !this.user.showWarning;
  }

  updateDone(reportContent: Array<string>) {
    this.done = reportContent;
  }

  updateInProgress(reportContent: Array<string>) {
    this.inProgress = reportContent;
  }

  updateScheduled(reportContent: Array<string>) {
    this.scheduled = reportContent;
  }

  updateProblems(reportContent: Array<string>) {
    this.problems = reportContent;
  }

  submitReport() {
    // Cancel report creation if warning needs to be shown
    if (this.shouldShowWarning() && !this.warningConfirmed) return;

    let report = new Report(
      this.user,
      this.reportName,
      this.done,
      this.inProgress,
      this.scheduled,
      this.problems
    );

    // temporary fix; will be done differently when connected to DB
    report.id = this.reportService.getNextID();

    this.reportService.addReport(report);
    this.router.navigateByUrl("/app/dashboard")
  }

  /**
   * User can submit report if it has a name and
   * at least one element (done, in progress, scheduled, done) is filled.
   * @param form Form used in creating a new report
   */
  canSubmit(form: NgForm): boolean {
    return form.valid && (
      !!this.done.length ||
      !!this.inProgress.length ||
      !!this.scheduled.length ||
      !!this.problems.length
    );
  }

  /**
   * Detects should a warning be displayed
   * 
   * Displays a warning if user hasn't disabled it
   * and at least one of the fields is empty
   */
  shouldShowWarning(): boolean {
    return this.user.showWarning && (
      this.done.length === 0 ||
      this.inProgress.length === 0 ||
      this.scheduled.length === 0 ||
      this.problems.length === 0
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    // proceed if user doesn't want a warning
    // or all of the fields are filled
    if (!this.shouldShowWarning() || this.wantsBack) {
      return true;
    }

    return this.proceed();
  }

  proceed(): Observable<boolean> {
    if (this.warningConfirmed) this.submitReport();
    return of(this.warningConfirmed);
  }

}

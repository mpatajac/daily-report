import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { CreateReportComponent } from '@app/route-components/create-report/create-report.component';


@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CreateReportComponent> {
  canDeactivate (
    component: CreateReportComponent,
  ): Observable<boolean> | boolean {
    if (!component.shouldShowWarning() || component.wantsBack) {
      return true;
    }

    return component.proceed();
  }
  
}

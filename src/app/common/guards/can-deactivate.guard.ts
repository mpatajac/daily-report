import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CreateReportComponent } from 'src/app/route-components/create-report/create-report.component';


@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CreateReportComponent> {
  canDeactivate (
    component: CreateReportComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (!component.shouldShowWarning() || component.wantsBack) {
      return true;
    }

    return component.proceed();
  }
  
}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from '@app/common/models/user';
import { UserService } from '@app/common/services/user.service';


@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {
  user: User;
  showWarning: boolean;

  @Input() warningAccepted: boolean;
  @Output() warningAcceptedChange = new EventEmitter<boolean>();

  constructor(
    private userService: UserService,
  ) { }

  async ngOnInit() {
    this.user = await this.userService.getUser();
  }

  onChange(e) {
    this.showWarning = !e.target.checked;
  }

  submitChange() {
    // update user preference (if needed)
    if (this.user.showWarning !== this.showWarning) {
      this.userService.updateWarning(this.showWarning);
    }

    this.warningAccepted = true;
    this.warningAcceptedChange.emit(this.warningAccepted);
  }

}

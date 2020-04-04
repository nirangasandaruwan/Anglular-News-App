import { Component, OnInit } from '@angular/core';
import { NotificationsService,Command } from '../notifications.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  messages: Observable<Command[]>;

  constructor(private notificationService: NotificationsService) {
    this.messages = notificationService.messagesOutput;

    // setInterval(() => {

    //   notificationService.addError('IT IS ERROR');

    // },500);

   }

  ngOnInit(): void {
  }


  clearMessage(id:number) {
    this.notificationService.clearMessage(id);
  }

}

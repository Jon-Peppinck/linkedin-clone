import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  newMessage$: Observable<string>;
  messages: string[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // TODO: refactor - unsubscribe
    return this.chatService.getNewMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  onSubmit() {
    const { message } = this.form.value;
    if (!message) return;
    this.chatService.sendMessage(message);
    this.form.reset();
  }
}

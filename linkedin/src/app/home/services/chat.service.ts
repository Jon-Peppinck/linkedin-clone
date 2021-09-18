import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket) {}

  sendMessage(message: string): void {
    this.socket.emit('sendMessage', message);
  }

  getNewMessage(): Observable<string> {
    return this.socket.fromEvent<string>('newMessage');
  }
}

import { Component } from '@angular/core';
import {Client} from "@stomp/stompjs";
import {HttpClient} from "@angular/common/http";
import {Message} from "./model/message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  client: Client = new Client({});
  message: string[] = [];
  messages: Message[] = [];
  connected: boolean = false;

  constructor(private http: HttpClient) {
  }

  connect() {
    this.client = new Client({
      brokerURL: 'ws://' + window.location.hostname + ':4200/websocket-manager',
      logRawCommunication: true,
      debug: (msg) => {
        console.log('debugging...' + msg);
      },
      onWebSocketError: (evt) => {
        console.log(evt)
      },
      onStompError: (evt) => {
        console.log(evt)
      },
      onConnect: () => {
        console.log(`Connected !`);
        this.client.subscribe('/topic/messages', data => {
          console.log(`Received: ${data.body}`);

          this.messages.push(JSON.parse(data.body));
        });
        this.connected = true;
      },
    });

    this.client.activate();
  }

  send() {
    this.client.publish({
      destination: '/app/message', body: JSON.stringify({
        'text': this.message
      })
    });
  }
}

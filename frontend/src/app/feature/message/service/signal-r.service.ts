import { Inject, Injectable, Optional } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BASE_PATH } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  public data: any[];
  public basePath;

  constructor(@Optional() @Inject(BASE_PATH) basePath: string) {
    this.basePath = basePath;
  }
  public hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.basePath + '/MessageHub')
      .configureLogging(signalR.LogLevel.Debug)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
}

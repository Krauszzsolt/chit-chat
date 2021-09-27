import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MessageListDto } from 'src/app/shared/client';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit, AfterViewInit {
  public messageInput = '';

  @Input()
  public messageList: MessageListDto;
  @Output()
  public messageInputEmit: EventEmitter<string> = new EventEmitter();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  public sendMessage(message) {
    this.messageInputEmit.emit(message);
    this.messageInput = '';
  }
}

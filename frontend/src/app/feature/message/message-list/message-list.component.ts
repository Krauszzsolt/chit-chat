import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MessageListModel } from '../../../shared/model/message-list.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit, AfterViewInit {
  public messageInput = '';

  @Input()
  public messageList: MessageListModel;
  @Output()
  public messageInputEmit: EventEmitter<string> = new EventEmitter();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  public sendMessage() {
    this.messageInputEmit.emit(this.messageInput);
    this.messageInput = '';
  }
}

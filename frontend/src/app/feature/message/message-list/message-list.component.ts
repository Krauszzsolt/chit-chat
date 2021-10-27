import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MessageListModel } from '../../../shared/model/message-list.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit, AfterViewInit {
  public messageInput = '';
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @Input()
  public messageList: MessageListModel;
  @Output()
  public messageInputEmit: EventEmitter<string> = new EventEmitter();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  public sendMessage() {
    this.messageInputEmit.emit(this.messageInput);
    this.messageInput = '';
  }
}

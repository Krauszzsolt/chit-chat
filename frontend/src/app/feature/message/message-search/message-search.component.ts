import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageES } from 'src/app/shared/client';
import { searchtermEmit } from '../model/search.model';

@Component({
  selector: 'app-message-search',
  templateUrl: './message-search.component.html',
  styleUrls: ['./message-search.component.scss'],
})
export class MessageSearchComponent implements OnInit {
  constructor() {}

  @Input()
  public searchResults: MessageES[];

  @Output()
  public searchTermEmit: EventEmitter<searchtermEmit> = new EventEmitter();
  @Output()
  public selectedMessageEmit: EventEmitter<MessageES> = new EventEmitter();

  public searchTerm = '';
  public selectedMessageId = '';
  public isGlobal: boolean = true;
  ngOnInit() {}

  public search() {
    this.searchTermEmit.emit({ searchterm: this.searchTerm, isGlobal: this.isGlobal });
  }

  public selectMessage(selectedMessage: MessageES) {
    this.selectedMessageId = selectedMessage.id;
    this.selectedMessageEmit.emit(selectedMessage);
  }
}

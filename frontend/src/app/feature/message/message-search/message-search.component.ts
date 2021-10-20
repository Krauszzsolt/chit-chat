import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material';
import { MessageES } from 'src/app/shared/client';

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
  public searchTermEmit: EventEmitter<string> = new EventEmitter();
  @Output()
  public selectedMessageEmit: EventEmitter<MessageES> = new EventEmitter();

  public searchTerm = '';
  public selectedMessageId = '';

  ngOnInit() {}

  public search() {
    this.searchTermEmit.emit(this.searchTerm);
  }

  public selectMessage(selectedMessage: MessageES) {
    this.selectedMessageId = selectedMessage.id;
    this.selectedMessageEmit.emit(selectedMessage);
  }
}

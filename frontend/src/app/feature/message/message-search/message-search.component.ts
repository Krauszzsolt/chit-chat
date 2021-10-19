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
  public selectedMessage: EventEmitter<MessageES> = new EventEmitter();

  public searchTerm: '';

  @ViewChild(MatSelectionList)
  private selectionList: MatSelectionList;

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  public search() {
    this.searchTermEmit.emit(this.searchTerm);
  }

  public selectMessage(selectedMessage: MessageES) {
    this.selectedMessage.emit(selectedMessage);
  }
}

import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  public loading: boolean;
  constructor(private loadingService: LoadingService) {
    this.loadingService.getisLoading().subscribe((v) => {
      this.loading = v;
    });
  }
  ngOnInit() {}
}

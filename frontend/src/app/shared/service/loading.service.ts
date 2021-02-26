import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading: BehaviorSubject<boolean>;
  private requests: HttpRequest<any>[] = [];

  constructor() {
    this.isLoading = new BehaviorSubject<boolean>(false);
  }

  public pushRequest(request) {
    this.requests.push(request);
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.isLoading.next(this.requests.length > 0);
  }

  public getisLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
  public setisLoading(isLoading) {
    return this.isLoading.next(isLoading);
  }
}

// loader-interceptor.service.ts
import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/service/loading.service';

@Injectable({ providedIn: 'root' })
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.pushRequest(req);

    this.loadingService.setisLoading(true);

    return next.handle(req).pipe(
      finalize(() => {
        this.loadingService.removeRequest(req);
      })
    );
    // tap(() => this.loadingService.removeRequest(req)));
  }
}

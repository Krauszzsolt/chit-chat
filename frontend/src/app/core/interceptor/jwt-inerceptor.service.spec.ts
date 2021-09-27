import { TestBed } from '@angular/core/testing';

import { JwtInerceptorService } from './jwt-inerceptor.service';

describe('JwtInerceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtInerceptorService = TestBed.get(JwtInerceptorService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { QrCodeCallerService } from './qr-code-caller.service';

describe('QrCodeCallerService', () => {
  let service: QrCodeCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrCodeCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

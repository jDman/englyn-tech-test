import { TestBed } from '@angular/core/testing';

import { SocketSetupService } from './socket-setup';

describe('SocketSetupService', () => {
  let service: SocketSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

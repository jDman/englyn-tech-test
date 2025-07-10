import { TestBed } from '@angular/core/testing';

import { SocketSetup } from './socket-setup';

describe('SocketSetup', () => {
  let service: SocketSetup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketSetup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InformationsService } from './services/iinformations.service';

describe('IinformationsService', () => {
  let service: InformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

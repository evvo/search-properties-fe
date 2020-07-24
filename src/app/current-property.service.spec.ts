import { TestBed } from '@angular/core/testing';

import { CurrentPropertyService } from './current-property.service';

describe('CurrentPropertyService', () => {
  let service: CurrentPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

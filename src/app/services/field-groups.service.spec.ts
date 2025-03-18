import { TestBed } from '@angular/core/testing';

import { FieldGroupsService } from './field-groups.service';

describe('FieldGroupsService', () => {
  let service: FieldGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

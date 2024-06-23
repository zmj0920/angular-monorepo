import { TestBed } from '@angular/core/testing';

import { NgModalFormService } from './ng-modal-form.service';

describe('NgModalFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgModalFormService = TestBed.get(NgModalFormService);
    expect(service).toBeTruthy();
  });
});

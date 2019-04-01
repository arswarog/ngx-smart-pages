import { TestBed } from '@angular/core/testing';

import { NgxSmartPagesService } from './ngx-smart-pages.service';

describe('NgxSmartPagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxSmartPagesService = TestBed.get(NgxSmartPagesService);
    expect(service).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSmartPagesComponent } from './ngx-smart-pages.component';

describe('NgxSmartPagesComponent', () => {
  let component: NgxSmartPagesComponent;
  let fixture: ComponentFixture<NgxSmartPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSmartPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSmartPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

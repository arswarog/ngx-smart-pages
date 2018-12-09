import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBaseWidgetComponent } from './custom-base-widget.component';

describe('CustomBaseWidgetComponent', () => {
  let component: CustomBaseWidgetComponent;
  let fixture: ComponentFixture<CustomBaseWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBaseWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBaseWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

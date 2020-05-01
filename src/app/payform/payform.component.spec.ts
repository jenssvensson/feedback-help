import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayformComponent } from './payform.component';

describe('PayformComponent', () => {
  let component: PayformComponent;
  let fixture: ComponentFixture<PayformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

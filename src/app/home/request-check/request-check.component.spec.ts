import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCheckComponent } from './request-check.component';

describe('RequestCheckComponent', () => {
  let component: RequestCheckComponent;
  let fixture: ComponentFixture<RequestCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

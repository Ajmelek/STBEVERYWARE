import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequierManagementComponent } from './chequier-management.component';

describe('ChequierManagementComponent', () => {
  let component: ChequierManagementComponent;
  let fixture: ComponentFixture<ChequierManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequierManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChequierManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSnipperComponent } from './loading-snipper.component';

describe('LoadingSnipperComponent', () => {
  let component: LoadingSnipperComponent;
  let fixture: ComponentFixture<LoadingSnipperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingSnipperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSnipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

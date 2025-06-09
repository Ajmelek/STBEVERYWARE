import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteBancaireManagementComponent } from './carte-bancaire-management.component';

describe('CarteBancaireManagementComponent', () => {
  let component: CarteBancaireManagementComponent;
  let fixture: ComponentFixture<CarteBancaireManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteBancaireManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteBancaireManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetefBankComponent } from './competef-bank.component';

describe('CompetefBankComponent', () => {
  let component: CompetefBankComponent;
  let fixture: ComponentFixture<CompetefBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetefBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetefBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.title).toBe('Competef Bank Services');
  });

  it('should call selectAccount when clicked', () => {
    spyOn(component, 'selectAccount');
    const card = fixture.nativeElement.querySelector('.option-card');
    card.click();
    expect(component.selectAccount).toHaveBeenCalled();
  });
});
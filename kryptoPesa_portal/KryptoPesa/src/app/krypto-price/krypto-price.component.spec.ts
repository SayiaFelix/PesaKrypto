import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KryptoPriceComponent } from './krypto-price.component';

describe('KryptoPriceComponent', () => {
  let component: KryptoPriceComponent;
  let fixture: ComponentFixture<KryptoPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KryptoPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KryptoPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

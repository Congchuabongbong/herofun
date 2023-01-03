import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouterUpComponent } from './couter-up.component';

describe('CouterUpComponent', () => {
  let component: CouterUpComponent;
  let fixture: ComponentFixture<CouterUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouterUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouterUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

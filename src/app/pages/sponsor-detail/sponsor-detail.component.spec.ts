import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorDetailComponent } from './sponsor-detail.component';

describe('PaymentFormComponent', () => {
  let component: SponsorDetailComponent;
  let fixture: ComponentFixture<SponsorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

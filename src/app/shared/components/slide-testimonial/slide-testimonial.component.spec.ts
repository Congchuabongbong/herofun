import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideTestimonialComponent } from './slide-testimonial.component';

describe('SlideTestimonialComponent', () => {
  let component: SlideTestimonialComponent;
  let fixture: ComponentFixture<SlideTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideTestimonialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

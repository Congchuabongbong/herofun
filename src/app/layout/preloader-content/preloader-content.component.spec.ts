import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderContentComponent } from './preloader-content.component';

describe('PreloaderContentComponent', () => {
  let component: PreloaderContentComponent;
  let fixture: ComponentFixture<PreloaderContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloaderContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreloaderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTitleAreaComponent } from './page-title-area.component';

describe('PageTitleAreaComponent', () => {
  let component: PageTitleAreaComponent;
  let fixture: ComponentFixture<PageTitleAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTitleAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTitleAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

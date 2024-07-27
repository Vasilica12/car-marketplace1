import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPostsComponent } from './car-posts.component';

describe('CarPostsComponent', () => {
  let component: CarPostsComponent;
  let fixture: ComponentFixture<CarPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisplayComponent } from './add-display.component';

describe('AddDisplayComponent', () => {
  let component: AddDisplayComponent;
  let fixture: ComponentFixture<AddDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

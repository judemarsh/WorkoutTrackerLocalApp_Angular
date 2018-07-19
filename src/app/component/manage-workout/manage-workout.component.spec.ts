import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkoutComponent } from './manage-workout.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { WorkoutService } from '../../service/workout.service';

describe('ManageWorkoutComponent', () => {
  let component: ManageWorkoutComponent;
  let fixture: ComponentFixture<ManageWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWorkoutComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule],
      providers: [CategoryService, WorkoutService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

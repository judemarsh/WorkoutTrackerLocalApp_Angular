import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkoutComponent } from './view-workout.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../service/workout.service';
import { WorkoutPipe } from '../../pipe/workout.pipe';
import { MatDialog } from '@angular/material';

describe('ViewWorkoutComponent', () => {
  let component: ViewWorkoutComponent;
  let fixture: ComponentFixture<ViewWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWorkoutComponent, WorkoutPipe ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule],
      providers: [WorkoutService, {provide: MatDialog, useValue: ""}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

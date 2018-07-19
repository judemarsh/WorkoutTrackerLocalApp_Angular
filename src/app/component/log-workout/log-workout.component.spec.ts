import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogWorkoutComponent } from './log-workout.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Location } from '@angular/common';
import { WorkoutActiveService } from '../../service/workout-active.service';
import { WorkoutService } from '../../service/workout.service';

describe('LogWorkoutComponent', () => {
  let component: LogWorkoutComponent;
  let fixture: ComponentFixture<LogWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogWorkoutComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, MatDialogModule],
      providers: [WorkoutService, WorkoutActiveService, {provide: MAT_DIALOG_DATA, useValue: ""}, {provide: MatDialogRef, useValue: ""}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

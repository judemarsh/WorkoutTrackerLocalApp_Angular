import { TestBed, inject } from '@angular/core/testing';

import { WorkoutService } from './workout.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('WorkoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([WorkoutService], (service: WorkoutService) => {
    expect(service).toBeTruthy();
  }));
});

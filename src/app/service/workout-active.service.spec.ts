import { TestBed, inject } from '@angular/core/testing';

import { WorkoutActiveService } from './workout-active.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('WorkoutActiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutActiveService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([WorkoutActiveService], (service: WorkoutActiveService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ReportService } from './report.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('ReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([ReportService], (service: ReportService) => {
    expect(service).toBeTruthy();
  }));
});

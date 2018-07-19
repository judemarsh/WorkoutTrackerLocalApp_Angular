import { TestBed, inject } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));
});

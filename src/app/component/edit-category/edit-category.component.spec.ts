import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { EditCategoryComponent } from './edit-category.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../model/category';
import { Observable,of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('EditCategoryComponent', () => {
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;

  const mockCategoryObj: Category = {
    categoryId: 1,
    categoryName: "Category 1"
  };

  let mockCategoryService = {
    getCategoryById(categoryId: number): Observable<Category>{
      return of(mockCategoryObj);
    },
    updateCategory(categoryData: Category): Observable<number> {
      return of(4);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, MatDialogModule, MatInputModule],
      providers: [CategoryService, {provide: MAT_DIALOG_DATA, useValue: ""}, {provide: MatDialogRef, useValue: ""}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should render the category data for update', () => {
    const element = fixture.nativeElement;
    element.querySelector('#categoryName').value = "Category 1";
    fixture.detectChanges();
    expect(element.querySelector('#categoryName').value).toEqual("Category 1");
  });

  

  
});

import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { Category } from '../../model/category';
import { ManageCategoryComponent } from './manage-category.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material';
import { CategoryService } from '../../service/category.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable,of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CategoryPipe } from '../../pipe/category.pipe';

describe('ManageCategoryComponent', () => {
  let component: ManageCategoryComponent;
  let fixture: ComponentFixture<ManageCategoryComponent>;
  const mockCategoryList: Category[] = [
    {
      categoryId: 1,
      categoryName: "Category 1"
    },
    {
      categoryId: 2,
      categoryName: "Category 2"
    },
    {
      categoryId: 3,
      categoryName: "Category 3"
    },
  ];

  let mockCategoryService = {
    getCategoryList(): Observable<Category[]> {
      return of(mockCategoryList);
    },
    saveCategory(categoryData: Category): Observable<number> {
      mockCategoryList.unshift(categoryData);
      return of(4);
    },
    deleteCategory(categoryId: number): Observable<boolean> {
      let categoryObj: Category = mockCategoryList.find(x => x.categoryId == categoryId);
      let index = mockCategoryList.indexOf(categoryObj);
      mockCategoryList.splice(index, 1);
      return of(true);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCategoryComponent,CategoryPipe ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, MatDialogModule],
      providers: [{provide: CategoryService, useValue: mockCategoryService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should get all the categories', () => {
    component.ngOnInit();
    expect(component.categoryList).toEqual(mockCategoryList);
  });

  it('it should render the category list', () => {
    const element = fixture.nativeElement;
    fixture.detectChanges();
    expect(element.querySelectorAll('div.workoutRow').length).toBe(3);
  });

  it('it should add new category', async(inject([CategoryService], (categoryService: CategoryService) => {
    const element = fixture.nativeElement;
    element.querySelector('#categoryName').value = "Category 4";
    fixture.detectChanges();
    expect(element.querySelector('#categoryName').value).toEqual("Category 4");
    let buttonClick = fixture.debugElement.query(By.css('.form-horizontal button[type="submit"]')).nativeElement.click();
    fixture.detectChanges();
    let newCategory: Category = {
      categoryId: null,
      categoryName: "Category 4"
    };
    let responseData: Category = new Category(null,null);
    fixture.detectChanges();
    categoryService.saveCategory(newCategory).subscribe(data => { 
      responseData.categoryId = data;
    });
    fixture.detectChanges();
    expect(component.categoryList).toEqual(mockCategoryList);
    expect(element.querySelectorAll('div.workoutRow').length - 1).toBe(5);
  })));

  it('it should delete category', async(inject([CategoryService], (categoryService: CategoryService) => {
    const element = fixture.nativeElement;
    let responseData: boolean;
    categoryService.deleteCategory(3).subscribe(data => {
      responseData = data;
    });
    fixture.detectChanges();
    expect(component.categoryList).toEqual(mockCategoryList);
    expect(element.querySelectorAll('div.workoutRow').length - 1).toBe(4);
  })));



});

import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 
  categoryList: Category[];

  constructor() {
    this.categoryList = [];
   }

  public getCategoryList() : Observable<any> {
    let categoryArray: Category[] = [];
    if(localStorage.length > 0){
      categoryArray = JSON.parse(localStorage.getItem("CATEGORIES")) as Category[];
    }
    return of(categoryArray);
  }

  public getCategoryById(categoryId: number) : Observable<Category>{
    let categoryArray: Category[] = [];
    if(localStorage.length > 0){
      categoryArray = JSON.parse(localStorage.getItem("CATEGORIES")) as Category[];
    }
    if(categoryArray == null || categoryArray == undefined){
      categoryArray = [];
    }
    for(var i=0;i<categoryArray.length;i++){
      let category: Category = categoryArray[i];
      if(category.categoryId == categoryId) {
        return of(category);
      }
    }
    return null;
  }

  public saveCategory(categoryObj: Category): Observable<number>{
    let categoryArray: Category[] = [];
    let globalSequence;
    let newSequence = 1;
    if(localStorage.length > 0){
      categoryArray = JSON.parse(localStorage.getItem("CATEGORIES")) as Category[];
      globalSequence = localStorage.getItem("GLOBAL_SEQUENCE");
    }
    if(globalSequence != null){
      newSequence = parseInt(globalSequence) + 1;
    }
    if(categoryArray == null || categoryArray == undefined){
      categoryArray = [];
    }
    globalSequence = String(newSequence);
    categoryObj.categoryId = newSequence;
    categoryArray.push(categoryObj);
    localStorage.setItem("GLOBAL_SEQUENCE",globalSequence);
    localStorage.setItem("CATEGORIES",JSON.stringify(categoryArray));
    return of(newSequence);
  }

  public updateCategory(categoryObj: Category): Observable<number>{
    let categoryArray: Category[] = [];
    let updatedCategoryArray: Category[] = [];
    if(localStorage.length > 0){
      categoryArray = JSON.parse(localStorage.getItem("CATEGORIES")) as Category[];
    }
    if(categoryArray == null || categoryArray == undefined){
      categoryArray = [];
    }
    for(var i=0;i<categoryArray.length;i++){
      let category: Category = categoryArray[i];
      if(category.categoryId != categoryObj.categoryId) {
        updatedCategoryArray.push(category);
      }
    }
    updatedCategoryArray.push(categoryObj);
    localStorage.setItem("CATEGORIES",JSON.stringify(updatedCategoryArray));
    return of(categoryObj.categoryId);
  }

  public deleteCategory(categoryId: number): Observable<boolean>{
    let categoryArray: Category[] = [];
    let updatedCategoryArray: Category[] = [];
    if(localStorage.length > 0){
      categoryArray = JSON.parse(localStorage.getItem("CATEGORIES")) as Category[];
    }
    if(categoryArray == null || categoryArray == undefined){
      categoryArray = [];
    }
    for(var i=0;i<categoryArray.length;i++){
      let category: Category = categoryArray[i];
      if(category.categoryId != categoryId) {
        updatedCategoryArray.push(category);
      }
    }
    return of(true);
  }
}

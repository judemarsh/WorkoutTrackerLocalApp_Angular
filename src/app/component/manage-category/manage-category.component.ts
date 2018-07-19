import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {

  public contentHeader: string;
  public categoryList: Category[];
  public categoryObj: Category;

  constructor(private router: Router,private route: ActivatedRoute,private categoryService: CategoryService, private dialog: MatDialog) {
    this.contentHeader = this.route.snapshot.queryParams['contentHeader'];
    this.categoryObj = new Category(null,null);
   }

  ngOnInit() {
    this.getCategoryDetails();
  }

  getCategoryDetails(){
    this.categoryService.getCategoryList().subscribe(responseData => {
      this.categoryList = responseData;
    });
  }

  editCategory(categoryId: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "150px";
    dialogConfig.width = "400px";
    dialogConfig.data =
      {
        contentHeader: "Update Category",
        categoryId: categoryId
      }
    this.dialog.open(EditCategoryComponent, dialogConfig);
  }

  addCategory(){
    if(this.categoryObj.categoryName == null || this.categoryObj.categoryName.trim() == ""){
      alert("Please enter category name.");
    } else {
      this.categoryService.saveCategory(this.categoryObj).subscribe(responseData => { 
        this.categoryObj.categoryId= responseData;
        this.categoryList.push(this.categoryObj);
        this.categoryObj = new Category(null,null);
      });
    }
  }

  deleteCategory(delCatObj: Category): void{
    if(confirm("Are you sure you want to delete this category?")){
      this.categoryService.deleteCategory(delCatObj.categoryId).subscribe(responseData => { 
        let index = this.categoryList.indexOf(delCatObj);
        if(index != -1){
          this.categoryList.splice(index,1);
        }
      });
    }
  
  }

}

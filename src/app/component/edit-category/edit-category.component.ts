import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../model/category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  public categoryObj: Category = new Category(null, null);

  constructor(private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, 
    private route: ActivatedRoute, 
    private categoryService: CategoryService) { 
      if(data.categoryId != null && data.categoryId != undefined && data.categoryId != "") {
        this.getCategoryById(data.categoryId);
      }
    
    }

  ngOnInit() {}

  getCategoryById(categoryId: number){
    this.categoryService.getCategoryById(categoryId).subscribe(responseData => { 
      this.categoryObj = responseData;
    });
  }

  updateCategory(){
    this.categoryService.updateCategory(this.categoryObj).subscribe(responseData => { 
      this.router.navigate(['/manageCategory']);
      this.dialogRef.close();
    });
  }

  cancel(){
    this.router.navigate(['/manageCategory']);
    this.dialogRef.close();
  }
}
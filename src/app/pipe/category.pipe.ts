import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryPipe implements PipeTransform {

  transform(value: any, searchTxt: any): any {
    if(!value) return [];
    if(!searchTxt) return value;

    return value.filter(categoryObj => {
      return categoryObj.categoryName.toLowerCase().includes(searchTxt.toLowerCase());
    });
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workoutFilter'
})
export class WorkoutPipe implements PipeTransform {

  transform(value: any, searchTxt: any): any {
    if(!value) return [];
    if(!searchTxt) return value;

    return value.filter(workoutObj => {
      return workoutObj.workoutTitle.toLowerCase().includes(searchTxt.toLowerCase());
    });
  }

}

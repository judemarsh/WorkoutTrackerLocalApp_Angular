import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../model/category';
import { Workout } from '../model/workout';
import { WorkoutActive } from '../model/workout-active';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  workoutList: Workout[];

  constructor() {
    this.workoutList = [];
   }

  public getWorkoutList() : Observable<any> {
    let workoutArray: Workout[] = [];
    let workoutActiveArray: WorkoutActive[] = [];
    let updatedWorkoutArray: Workout[] = [];
    if(localStorage.length > 0){
      workoutArray = JSON.parse(localStorage.getItem("WORKOUTS")) as Workout[];
      workoutActiveArray = JSON.parse(localStorage.getItem("WORKOUT_ACTIVE")) as WorkoutActive[];
    }
    if(workoutArray == null || workoutArray == undefined){
      workoutArray = [];
    }
    for(var i=0;i<workoutArray.length;i++){
      let workout: Workout = workoutArray[i];
      workout.hasStarted = false;
      if(workoutActiveArray != null && workoutActiveArray != undefined && workoutActiveArray.length > 0){
        for(var j=0;j<workoutActiveArray.length;j++){
          let workoutActive: WorkoutActive = workoutActiveArray[j];
          if(workoutActive.workoutId == workout.workoutId && workoutActive.status == true){
            workout.hasStarted = true;
            break;
          }
        }
      }
      updatedWorkoutArray.push(workout);
    }
    return of(workoutArray);
  }

  public getWorkoutById(workoutId: number) : Observable<Workout>{
    let workoutArray: Workout[] = [];
    if(localStorage.length > 0){
      workoutArray = JSON.parse(localStorage.getItem("WORKOUTS")) as Workout[];
    }
    if(workoutArray == null || workoutArray == undefined){
      workoutArray = [];
    }
    for(var i=0;i<workoutArray.length;i++){
      let workout: Workout = workoutArray[i];
      if(workout.workoutId == workoutId) {
        return of(workout);
      }
    }
    return null;
  }

  public saveWorkout(workoutObj: Workout) : Observable<number>{
    let workoutArray: Workout[] = [];
    let globalSequence;
    let newSequence = 1;
    if(localStorage.length > 0){
      workoutArray = JSON.parse(localStorage.getItem("WORKOUTS")) as Workout[];
      globalSequence = localStorage.getItem("GLOBAL_SEQUENCE");
    }
    if(globalSequence != null){
      newSequence = parseInt(globalSequence) + 1;
    }
    globalSequence = String(newSequence);
    workoutObj.workoutId = newSequence;
    if(workoutArray == null || workoutArray == undefined){
      workoutArray = [];
    }
    workoutArray.push(workoutObj);
    localStorage.setItem("GLOBAL_SEQUENCE",globalSequence);
    localStorage.setItem("WORKOUTS",JSON.stringify(workoutArray));
    return of(newSequence);
  }

  public updateWorkout(workoutObj: Workout) : Observable<number>{
    let workoutArray: Workout[] = [];
    let updatedWorkoutArray: Workout[] = [];
    if(localStorage.length > 0){
      workoutArray = JSON.parse(localStorage.getItem("WORKOUTS")) as Workout[];
    }
    if(workoutArray == null || workoutArray == undefined){
      workoutArray = [];
    }
    for(var i=0;i<workoutArray.length;i++){
      let workout: Workout = workoutArray[i];
      if(workout.workoutId != workoutObj.workoutId) {
        updatedWorkoutArray.push(workout);
      }
    }
    updatedWorkoutArray.push(workoutObj);
    localStorage.setItem("WORKOUTS",JSON.stringify(updatedWorkoutArray));
    return of(workoutObj.workoutId);
  }

  public deleteWorkout(workoutId: number) : Observable<boolean>{
    let workoutArray: Workout[] = [];
    let updatedWorkoutArray: Workout[] = [];
    if(localStorage.length > 0){
      workoutArray = JSON.parse(localStorage.getItem("WORKOUTS")) as Workout[];
    }
    if(workoutArray == null || workoutArray == undefined){
      workoutArray = [];
    }
    for(var i=0;i<workoutArray.length;i++){
      let workout: Workout = workoutArray[i];
      if(workout.workoutId != workoutId) {
        updatedWorkoutArray.push(workout);
      }
    }
    return of(true);
  }
}

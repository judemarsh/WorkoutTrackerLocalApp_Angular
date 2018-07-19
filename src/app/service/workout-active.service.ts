import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../model/category';
import { Workout } from '../model/workout';
import { WorkoutActive } from '../model/workout-active';

@Injectable({
  providedIn: 'root'
})
export class WorkoutActiveService {

  constructor() { }

  public getWorkoutActive(workoutId: number) : Observable<WorkoutActive>{
    let workoutActiveArray: WorkoutActive[] = [];
    if(localStorage.length > 0){
      workoutActiveArray = JSON.parse(localStorage.getItem("WORKOUT_ACTIVE")) as WorkoutActive[];
    }
    if(workoutActiveArray == null || workoutActiveArray == undefined){
      workoutActiveArray = [];
    }
    for(var i=0;i<workoutActiveArray.length;i++){
      let workoutActive: WorkoutActive = workoutActiveArray[i];
      if(workoutActive.workoutId == workoutId) {
        return of(workoutActive);
      }
    }
    return null;
  }

  public startWorkout(workoutActiveObj: WorkoutActive) : Observable<number>{
    let workoutActiveArray: WorkoutActive[] = [];
    let globalSequence;
    let newSequence = 1;
    if(localStorage.length > 0){
      workoutActiveArray = JSON.parse(localStorage.getItem("WORKOUT_ACTIVE")) as WorkoutActive[];
      globalSequence = localStorage.getItem("GLOBAL_SEQUENCE");
    }
    if(workoutActiveArray == null || workoutActiveArray == undefined){
      workoutActiveArray = [];
    }
    if(globalSequence != null){
      newSequence = parseInt(globalSequence) + 1;
    }
    globalSequence = String(newSequence);
    workoutActiveObj.workoutActiveId = newSequence;
    workoutActiveObj.status = true;
    workoutActiveArray.push(workoutActiveObj);
    localStorage.setItem("GLOBAL_SEQUENCE",globalSequence);
    localStorage.setItem("WORKOUT_ACTIVE",JSON.stringify(workoutActiveArray));
    return of(newSequence);
  }

  public endWorkout(workoutActiveObj: WorkoutActive) : Observable<number>{
    let workoutActiveArray: WorkoutActive[] = [];
    let updatedWorkoutActiveArray: WorkoutActive[] = [];
    let startedWorkoutActiveObj: WorkoutActive;
    if(localStorage.length > 0){
      workoutActiveArray = JSON.parse(localStorage.getItem("WORKOUT_ACTIVE")) as WorkoutActive[];
    }
    if(workoutActiveArray == null || workoutActiveArray == undefined){
      workoutActiveArray = [];
    }
    for(var i=0;i<workoutActiveArray.length;i++){
      let workoutActive: WorkoutActive = workoutActiveArray[i];
      if(workoutActive.workoutActiveId != workoutActiveObj.workoutActiveId) {
        updatedWorkoutActiveArray.push(workoutActive);
      }
      if(workoutActive.workoutActiveId == workoutActiveObj.workoutActiveId) {
        startedWorkoutActiveObj = workoutActive;
      }
    }
    startedWorkoutActiveObj.endDate = workoutActiveObj.endDate;
    startedWorkoutActiveObj.endTime = workoutActiveObj.endTime;
    startedWorkoutActiveObj.status = false;
    updatedWorkoutActiveArray.push(startedWorkoutActiveObj);
    localStorage.setItem("WORKOUT_ACTIVE",JSON.stringify(updatedWorkoutActiveArray));
    return of(workoutActiveObj.workoutActiveId);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Report } from '../model/report';
import { WorkoutActive } from '../model/workout-active';
import { Workout } from '../model/workout';
import { Chart } from '../model/chart';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  public getWorkoutReport() : Observable<any> {
    let reportObj: Report = new Report(null,null,null,null,null,null, null);
    let workoutActiveArray: WorkoutActive[] = [];
    let currentDayWorkoutArray: WorkoutActive[] = [];
    let currentWeekWorkoutArray: WorkoutActive[] = [];
    let currentMonthWorkoutArray: WorkoutActive[] = [];
    if(localStorage.length > 0){
      workoutActiveArray = JSON.parse(localStorage.getItem("WORKOUT_ACTIVE")) as WorkoutActive[];
    }
    if(workoutActiveArray == null || workoutActiveArray == undefined){
      workoutActiveArray = [];
    }
    for(var i=0;i<workoutActiveArray.length;i++){
      let workoutActive: WorkoutActive = workoutActiveArray[i];
      workoutActive.startDate = new Date(workoutActive.startDate);
      workoutActive.endDate = new Date(workoutActive.endDate);
      if(workoutActive.status == false){
        if(this.checkIfToday(workoutActive.startDate) && this.checkIfToday(workoutActive.endDate)){
          currentDayWorkoutArray.push(workoutActive);
          currentWeekWorkoutArray.push(workoutActive);
          currentMonthWorkoutArray.push(workoutActive);
        } else if(this.checkIfCurrentWeek(workoutActive.startDate) && this.checkIfCurrentWeek(workoutActive.endDate)){
          currentWeekWorkoutArray.push(workoutActive);
          currentMonthWorkoutArray.push(workoutActive);
        }else if(this.checkIfCurrentMonth(workoutActive.startDate) && this.checkIfCurrentMonth(workoutActive.endDate)){
          currentMonthWorkoutArray.push(workoutActive);
        }
      }
    }
    reportObj.workoutTimeOfDay = String(this.getTotalWorkoutTimeOfDay(currentDayWorkoutArray));
    reportObj.workoutTimeOfWeek = String(this.getTotalWorkoutTimeOfWeek(currentWeekWorkoutArray));
    reportObj.workoutTimeOfMonth = String(this.getTotalWorkoutTimeOfMonth(currentMonthWorkoutArray));
    reportObj.caloriesWeekChart = this.getWeeklyCaloriesChartData(currentWeekWorkoutArray);
    return of(reportObj);
  }

  private checkIfToday(inputDate: Date) : boolean {
    let currentDate: Date = new Date();
    if(inputDate.getDate() == currentDate.getDate() && inputDate.getMonth() == currentDate.getMonth() && inputDate.getFullYear() == currentDate.getFullYear()){
      return true;
    }
    return false;
  }

  private checkIfCurrentWeek(inputDate: Date) : boolean {
    let currentDate: Date = new Date();
    let updatedDate: Date = new Date();
    updatedDate.setDate(updatedDate.getDate() - currentDate.getDay());
    let currentWeekFirstDate: Date = new Date(updatedDate.getFullYear(),updatedDate.getMonth(),updatedDate.getDate());
    if(inputDate >= currentWeekFirstDate && inputDate <= currentDate){
      return true;
    }
    return false;
  }

  private checkIfCurrentMonth(inputDate: Date) : boolean {
    let currentDate: Date = new Date();
    let updatedDate: Date = new Date();
    let currentMonthFirstDate: Date = new Date(updatedDate.getFullYear(),updatedDate.getMonth(),1);
    if(inputDate >= currentMonthFirstDate && inputDate <= currentDate){
      return true;
    }
    return false;
  }

  private getTotalWorkoutTimeOfDay(currentDayWorkoutArray: WorkoutActive[]) : number {
    let totalWorkoutTime: number = 0;
    for(var i = 0;i<currentDayWorkoutArray.length;i++){
      let workoutActiveObj: WorkoutActive = currentDayWorkoutArray[i];
      totalWorkoutTime = totalWorkoutTime + (workoutActiveObj.endTime - workoutActiveObj.startTime)/60000;
    }
    return totalWorkoutTime;
  }

  private getTotalWorkoutTimeOfWeek(currentWeekWorkoutArray: WorkoutActive[]) : number {
    let totalWorkoutTime: number = 0;
    for(var i = 0;i<currentWeekWorkoutArray.length;i++){
      let workoutActiveObj: WorkoutActive = currentWeekWorkoutArray[i];
      totalWorkoutTime = totalWorkoutTime + (workoutActiveObj.endTime - workoutActiveObj.startTime)/60000;
    }
    return totalWorkoutTime;
  }

  private getTotalWorkoutTimeOfMonth(currentMonthWorkoutArray: WorkoutActive[]) : number {
    let totalWorkoutTime: number = 0;
    for(var i = 0;i<currentMonthWorkoutArray.length;i++){
      let workoutActiveObj: WorkoutActive = currentMonthWorkoutArray[i];
      totalWorkoutTime = totalWorkoutTime + (workoutActiveObj.endTime - workoutActiveObj.startTime)/60000;
    }
    return totalWorkoutTime;
  }

  private getWeeklyCaloriesChartData(currentWeekWorkoutArray: WorkoutActive[]) : Array<Chart>{
    let dayArray: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let totalCaloriesBurntOnDay: Array<number> = [0,0,0,0,0,0,0]
    for(var i = 0;i<currentWeekWorkoutArray.length;i++){
      let workoutActiveObj: WorkoutActive = currentWeekWorkoutArray[i];
      let caloriesBurntOnDay: number = totalCaloriesBurntOnDay[workoutActiveObj.startDate.getDay()];
      caloriesBurntOnDay = caloriesBurntOnDay + ((workoutActiveObj.endTime - workoutActiveObj.startTime)/60000 * this.getWorkoutCalories(workoutActiveObj.workoutId));
      totalCaloriesBurntOnDay[workoutActiveObj.startDate.getDay()] = caloriesBurntOnDay;
    }
    let weeklyCaloriesArray: Array<Chart> = [];
    for(var i=0;i<7;i++){
      let chart: Chart = new Chart(null,null);
      chart.label = dayArray[i];
      chart.value = String(totalCaloriesBurntOnDay[i]);
      weeklyCaloriesArray[i] = chart;
    }
    return weeklyCaloriesArray;
  }

  private getWorkoutCalories(workoutId: number): number{
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
        return workout.caloriesBurnPerMin;
      }
    }
    return 0;
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WorkoutService } from '../../service/workout.service';
import { WorkoutActive } from '../../model/workout-active';
import { Workout } from '../../model/workout';
import { WorkoutActiveService } from '../../service/workout-active.service';
import { Location } from '@angular/common';
import { Window } from 'selenium-webdriver';


@Component({
  selector: 'app-log-workout',
  templateUrl: './log-workout.component.html',
  styleUrls: ['./log-workout.component.css']
})

export class LogWorkoutComponent implements OnInit {

  public hasStarted: boolean;
  public workoutId: number;
  public workoutActiveObj: WorkoutActive = new WorkoutActive(null,null,null,null,null,null,null,null,null,null);

  constructor(private dialogRef: MatDialogRef<LogWorkoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, 
    private route: ActivatedRoute, 
    private workoutService: WorkoutService, 
    private workoutActivtyService: WorkoutActiveService,
    private location: Location
  ) {
    //this.workoutId = this.route.snapshot.queryParams['workoutId'];
    this.workoutId = data.workoutId;
    this.hasStarted = data.hasStarted;
    /*if(this.route.snapshot.queryParams['hasStarted'] == "true"){*/
    /*if(data.hasStarted == "true"){
      this.hasStarted = true;
    } else {
      this.hasStarted = false;
    } */
  }

  ngOnInit() {
    if(this.hasStarted){
      this.workoutActivtyService.getWorkoutActive(this.workoutId).subscribe(responseData => {
        this.workoutActiveObj.workoutActiveId = responseData.workoutActiveId;
        this.workoutActiveObj.workoutId = responseData.workoutId;
        this.workoutActiveObj.workoutNote = responseData.workoutNote;
        this.workoutActiveObj.workoutTitle = responseData.workoutTitle;
        this.workoutActiveObj.comments = responseData.comments;
        this.workoutActiveObj.status = responseData.status;
        this.workoutActiveObj.endDate = new Date();
      });
    } else {
      this.workoutService.getWorkoutById(this.workoutId).subscribe(res => {
        this.workoutActiveObj.workoutId = res.workoutId;
        this.workoutActiveObj.workoutNote = res.workoutNote;
        this.workoutActiveObj.workoutTitle = res.workoutTitle;
        /*let currentDate = new Date();
        let currentDateStr = currentDate.getMonth()+'/'+currentDate.getDay()+'/'+currentDate.getFullYear();*/
        this.workoutActiveObj.startDate = new Date();
      })
    }
  }

  endWorkout(){
    this.workoutActiveObj.endDate = new Date(this.workoutActiveObj.endDate);
    if(this.workoutActiveObj.endDate >= new Date()){
      alert("Workout cannot be ended in the future date and time.");
      return;
    }
    let endTime = this.workoutActiveObj.endDate.getTime();
    this.workoutActiveObj.endTime = endTime;
    this.workoutActivtyService.endWorkout(this.workoutActiveObj).subscribe(res => {
      this.workoutActiveObj.workoutActiveId = res;
      this.dialogRef.close();
      window.location.reload();
    });
  }

  startWorkout(){
    this.workoutActiveObj.startDate = new Date(this.workoutActiveObj.startDate);
    if(this.workoutActiveObj.startDate >= new Date()){
      alert("Workout cannot be started in the future date and time.");
      return;
    }
    let startTime = this.workoutActiveObj.startDate.getTime();
    this.workoutActiveObj.startTime = startTime;
    this.workoutActivtyService.startWorkout(this.workoutActiveObj).subscribe(res => {
      this.workoutActiveObj.workoutActiveId = res;
      this.dialogRef.close();
      window.location.reload();
    });
  }

  cancel(){
    this.dialogRef.close();
  }

}

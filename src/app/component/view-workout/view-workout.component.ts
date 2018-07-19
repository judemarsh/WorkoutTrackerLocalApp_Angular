import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workout } from '../../model/workout';
import { WorkoutService } from '../../service/workout.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LogWorkoutComponent } from '../log-workout/log-workout.component';

@Component({
  selector: 'app-view-workout',
  templateUrl: './view-workout.component.html',
  styleUrls: ['./view-workout.component.css'],
  providers: [WorkoutService]
})
export class ViewWorkoutComponent implements OnInit {

  public workoutList: Workout[];
  public searchWorkout: string;

  constructor(private router: Router, private workoutService: WorkoutService, private dialog: MatDialog) {
  }
  ngOnInit() {
    this.getWorkoutList();
  }

  getWorkoutList() {
    this.workoutService.getWorkoutList().subscribe(responseData => {
      this.workoutList = responseData;
    });
  }
  startWorkoutActive(startWorkoutObj: Workout) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "400px";
    dialogConfig.width = "750px";
    dialogConfig.data =
      {
        contentHeader: "Start Workout",
        hasStarted: false,
        workoutId: startWorkoutObj.workoutId
      }
    this.dialog.open(LogWorkoutComponent, dialogConfig);
    //this.router.navigate(['/startWorkout/'+startWorkoutObj.workoutId], {queryParams : {workoutId: startWorkoutObj.workoutId, hasStarted: startWorkoutObj.hasStarted}});
  }

  endWorkoutActive(startWorkoutObj: Workout) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "400px";
    dialogConfig.width = "750px";
    dialogConfig.data =
      {
        contentHeader: "End Workout",
        hasStarted: true,
        workoutId: startWorkoutObj.workoutId
      }
    this.dialog.open(LogWorkoutComponent, dialogConfig);
    //this.router.navigate(['/startWorkout/'+startWorkoutObj.workoutId], {queryParams : {workoutId: startWorkoutObj.workoutId, hasStarted: startWorkoutObj.hasStarted}});
  }

  editWorkout(id: number) {
    this.router.navigate(['/editWorkout/' + id], { queryParams: { id: id, contentHeader: "Edit Workout" } });
  }

  deleteWorkout(delWorkoutObj: Workout) {
    if (confirm("Are you sure you want to delete this Workout?")) {
      this.workoutService.deleteWorkout(delWorkoutObj.workoutId).subscribe(responseData => {
        let index = this.workoutList.indexOf(delWorkoutObj);
        if (index != -1) {
          this.workoutList.splice(index, 1);
        }
      });
    }
  }
}

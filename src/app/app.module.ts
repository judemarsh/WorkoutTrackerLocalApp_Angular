import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogWorkoutComponent } from './component/log-workout/log-workout.component';
import { ManageWorkoutComponent } from './component/manage-workout/manage-workout.component';
import { ManageCategoryComponent } from './component/manage-category/manage-category.component';
import { MenuComponent } from './component/menu/menu.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ViewWorkoutComponent } from './component/view-workout/view-workout.component';
import { CategoryPipe } from './pipe/category.pipe';
import { WorkoutPipe } from './pipe/workout.pipe';
import { EditCategoryComponent } from './component/edit-category/edit-category.component';
import { ReportComponent } from './component/report/report.component';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';

const appRoutes: Routes = [ 
  {path: 'viewWorkout', component: ViewWorkoutComponent},
  {path: 'addWorkout', component: ManageWorkoutComponent, data: {contentHeader: "Add Workout"}},
  {path: 'editWorkout/:id', component: ManageWorkoutComponent, data: {contentHeader: "Edit Workout"}},
  {path: 'startWorkout/:workoutId', component: LogWorkoutComponent, data: {contentHeader: "Start Workout", hasStarted: false}},
  {path: 'endWorkout/:workoutId', component: LogWorkoutComponent, data: {contentHeader: "End Workout", hasStarted: true}},
  {path: 'manageCategory', component: ManageCategoryComponent},
  {path: 'report', component: ReportComponent},
  {path: '', redirectTo:'/viewWorkout', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ManageWorkoutComponent,
    ManageCategoryComponent,
    MenuComponent,
    PageNotFoundComponent,
    ViewWorkoutComponent,
    CategoryPipe,
    WorkoutPipe,
    LogWorkoutComponent,
    EditCategoryComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{enableTracing: false}),
    CommonModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    FusionChartsModule.forRoot(FusionCharts, Charts, FintTheme)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LogWorkoutComponent,
    EditCategoryComponent
  ]
})
export class AppModule { }

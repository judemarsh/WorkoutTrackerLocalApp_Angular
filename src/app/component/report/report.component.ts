import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../service/report.service';
import { Report } from '../../model/report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public reportObj: Report = new Report(null,null,null,null,null,null,null);

  width = 600;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  caloriesWeekChartData = {};
  caloriesMonthChartData = {};
  caloriesYearChartData = {};

  constructor(private reportService: ReportService) {
   }

  ngOnInit() {
    this.reportService.getWorkoutReport().subscribe(responseData => {
      this.reportObj.workoutTimeOfDay = responseData.workoutTimeOfDay;
      this.reportObj.workoutTimeOfWeek = responseData.workoutTimeOfWeek;
      this.reportObj.workoutTimeOfMonth = responseData.workoutTimeOfMonth;
      this.caloriesWeekChartData = {
        chart: {
          caption: "Calories burnt - Week report",
          subCaption: "The amount of calories burnt by working out during the current week.",
          numberPrefix: "",
          theme: "fint"
        },
        data: responseData.caloriesWeekChart
      };
    });
  }

}

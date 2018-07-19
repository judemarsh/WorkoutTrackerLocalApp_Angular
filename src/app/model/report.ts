import { Chart } from "./chart";

export class Report {

    constructor(
        public workoutTimeOfDay: string,
        public workoutTimeOfWeek: string,
        public workoutTimeOfMonth: string,
        public totalCaloriesInWeek: string,
        public totalCaloriesInMonth: string,
        public totalCaloriesInYear: string,
        public caloriesWeekChart: Array<Chart>
    ){ }
}

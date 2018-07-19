import { Time } from "@angular/common";

export class WorkoutActive {
    constructor(
        public workoutActiveId: number, 
        public startTime: number, 
        public startDate: Date, 
        public endDate: Date, 
        public endTime: number, 
        public comments: string, 
        public status: boolean, 
        public workoutId: number,
        public workoutNote: string,
        public workoutTitle: string
    ){}
}

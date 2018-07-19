export class Workout {
    constructor (
        public workoutId: number, 
        public workoutTitle: string, 
        public workoutNote: string, 
        public caloriesBurnPerMin: number, 
        public hasStarted: boolean, 
        public categoryId: number,
        public categoryName: string
    ) {}
}

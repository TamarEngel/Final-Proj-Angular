import { Lesson } from "./lesson";

export class Course{
    constructor(
        public title: string,
        public description: string,
        public teacherId?: number,
        public id?:number,
        public lessons?:Lesson[]|null
    ){}
}

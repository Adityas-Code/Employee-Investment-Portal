export class Employee {
    employeeID!: number;
    name: string;
    email: string;
    age: number;
    gender: string;
    department: string;
    contactDetails: string;
    grade: string;
    salary: number;

    constructor() {
      this.name = '';
      this.email = '';
      this.age = 0;
      this.gender = '';
      this.department = '';
      this.contactDetails = '';
      this.grade = '';
      this.salary = 0;
    }


}
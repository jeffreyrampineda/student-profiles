import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  // URL to web api.
  private apiUrl = 'https://www.hatchways.io/api/assessment/students';

  constructor(
    private http: HttpClient,
  ) { }

  /** GET students data from the api */
  getStudents(): Observable<Student[]> {
    return this.http.get<any>(this.apiUrl).pipe(

      // The data received is an object with the array of students. This maps
      // the data to just purely an array of students.
      map(result => result.students)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  private students: Student[];
  filteredStudents: Student[];
  searchName = '';
  searchTag = '';

  constructor(
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.getStudents();
  }

  /** Uses the StudentService to retrieve the students data. */
  getStudents(): void {
    this.studentService.getStudents().subscribe(
      result => {
        this.students = result;

        // Sets an empty tags array into each student locally.
        this.students.map(s => {
          s.tags = [];
        });

        // Sets a fresh non-filtered students data.
        this.filteredStudents = this.students;
      }
    );
  }

  /** Applies name and/or tag filter to the rendered data. */
  applyFilters(): void {

    const cleanName = this.searchName.trim().toLowerCase();
    const cleanTag = this.searchTag.trim().toLowerCase();

    // Sets a fresh non-filtered students data.
    this.filteredStudents = this.students;

    if (cleanName) {
      this.filteredStudents = this.filteredStudents.filter(s => {
        return s.firstName.toLowerCase().includes(cleanName) ||
               s.lastName.toLowerCase().includes(cleanName);
      });
    }

    if (cleanTag) {

      // Re-use filteredStudents to apply both name filtering and tag filtering
      // for more accuracy.
      this.filteredStudents = this.filteredStudents.filter(s => {
        return s.tags.join().toLowerCase().includes(cleanTag);
      });
    }
  }
}

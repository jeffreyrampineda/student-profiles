import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  @Input() student: Student;
  expandMoreIcon = 'add';

  constructor() { }

  ngOnInit() {
  }


  /**
   * Calculates the overall test average of this student.
   * @returns number - The calculated average.
   */
  getAvg(): number {

    // Converts array of string into array of numbers.
    const asNumbers = this.student.grades.map(Number);
    const sum = asNumbers.reduce((prev, curr) => curr += prev);

    return sum / asNumbers.length;
  }

  /**
   * Toggles 'expandMoreIcon', which expands or minimizes this student's
   * tests history and tag options.
   */
  expandMore(): void {
    this.expandMoreIcon = this.expandMoreIcon === 'add' ? 'remove' : 'add';
  }

  /**
   * Adds the specified tag into this student's tags list locally.
   * @param name - The name of the tag.
   */
  addTag(name: string): void {

    // Use StudentService.addTag instead if can post to api.
    this.student.tags.push(name);
  }
}

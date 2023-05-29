/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-droupdown',
  templateUrl: './droupdown.component.html',
  styleUrls: ['./droupdown.component.css'],
})
export class DroupdownComponent implements OnInit {
  @Input() field:any = {};

    @Input() form:FormGroup;

    get isValid() { return this.form.controls[this.field.name].valid; }

    get isDirty() { return this.form.controls[this.field.name].dirty; }

  @Output() public dropDownChanged = new EventEmitter<any>();

  InputValue :any = ''

  constructor() { }

  ngOnInit(): void {
  }

  optionChange(event, field) {
    if (event.source.selected) {
      this.dropDownChanged.emit(field);
    }
  }

  compareFn(o1: any, o2: any) {
    if (o1 && o2 && o1.CmpCode === o2.CmpCode) {
      return o2;
    } return '';
  }
}

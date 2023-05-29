/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css'],
})
export class TextBoxComponent implements OnInit {
  @Input() field:any = {};

    @Input() form:FormGroup;

    get isValid() { return this.form.controls[this.field.name].valid; }

    get isDirty() { return this.form.controls[this.field.name].dirty; }

    constructor() { }

    ngOnInit(): void {
    }

    Decimal(event: any) {
      return (
        (event.charCode === 46 && event.target.value.indexOf('.') === -1)
        || (event.charCode >= 48 && event.charCode <= 57)
      );
    }
}

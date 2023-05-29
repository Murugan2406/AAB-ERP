/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-builder',
  templateUrl: './field-builder.component.html',
  styleUrls: ['./field-builder.component.css'],
})
export class FieldBuilderComponent implements OnInit {
  @Input() field:any;

  @Input() form:any;

  get isValid() { return this.form.controls[this.field.name].valid; }

  get isDirty() { return this.form.controls[this.field.name].dirty; }

  constructor() { }

  ngOnInit(): void {
  }
}

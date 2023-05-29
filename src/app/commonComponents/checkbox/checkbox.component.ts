/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements OnInit {
  @Input() field:any = {};

  @Input() form:FormGroup;

  get isValid() { return this.form.controls[this.field.name].valid; }

  get isDirty() { return this.form.controls[this.field.name].dirty; }

  constructor() { }

  ngOnInit(): void {
  }
}

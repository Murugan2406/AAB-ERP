/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
})
export class AutoCompleteComponent implements OnInit {
  @Input() field:any = {};

  @Input() form:FormGroup;

  KeyValue: any;

  OptionView: any = [];

  get isValid() { return this.form.controls[this.field.name].valid; }

  get isDirty() { return this.form.controls[this.field.name].dirty; }

  @Output() public autoTrigger = new EventEmitter<any>();

  @Output() public selectioChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.OptionView = this.field.options;
  }

  displayFn(user: any): string {
    return user && user[user.key3] ? user[user.key3] : '';
  }

  autCompleteTrigger(event, fields, keyValue) {
    if (fields.defaultFilter) {
      const key = keyValue.toLocaleUpperCase();
      const startsWithN = this.field.options.filter((data) => data[data.key3].toLocaleUpperCase().includes(key));
      this.OptionView = startsWithN;
    } else {
      this.autoTrigger.emit(keyValue);
      setTimeout(() => {
        this.OptionView = this.field.options;
      }, 100);
    }
  }

  OptionSecleted(event, fields) {
    if (event.source.selected) {
      this.selectioChanged.emit(fields);
    }
  }
}

/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'g-auto-select',
  templateUrl: './auto-select.component.html',
  styleUrls: ['./auto-select.component.css'],
})
export class AutoSelectComponent implements OnInit {
  searchSelect = '';

  @Input()gAutoSelectArr = [];

  @Input()gkeyName:string;

  @Input() form:FormGroup;

  @Input() gformControlName: FormControl = new FormControl('');

  KeyValue: any;

  @Output() public autoTrigger = new EventEmitter<any>();

  @Output() public selectioChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  inputChange(event:any) {
    this.autoTrigger.emit(event);
  }

  UssageNameSelected(event:any, element) {
    if (event.source.selected) {
      this.selectioChanged.emit({ data: element, form: this.gformControlName });
    }
  }
}

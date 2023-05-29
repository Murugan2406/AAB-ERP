/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import {
  Component, Input, OnInit, Output, EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.css'],
})
export class DynamicFormBuilderComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();

  @Input() fields: any[] = [];

  form:FormGroup;

  @Output() public gForm = new EventEmitter<any>();

  constructor(public commonservice:CommonService) { }

  ngOnInit() {
    const fieldsCtrls = {};
    for (const f of this.fields) {
      if (f.type !== 'checkbox') {
        fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required);
      } else {
        const opts = {};
        for (const opt of f.options) {
          opts[opt.key] = new FormControl(opt.value);
        }
        fieldsCtrls[f.name] = new FormGroup(opts);
      }
    }
    this.form = new FormGroup(fieldsCtrls);
    this.gForm.emit(this.form);
  }

  @Output() public autoCompleteTrigger = new EventEmitter<any>();

  @Output() public gSelectionChanged = new EventEmitter<any>();

  @Output() public gDropDownChanged = new EventEmitter<any>();

  @Output() public gFormSubmit = new EventEmitter<any>();

  formValue(form:any) {
    console.log(form.value);

    if (form.valid) {
      this.gFormSubmit.emit(form);
    } else {
      this.commonservice.openSnackbar('Form Invalid', 'Ok', 1500);
    }
  }

  autCompleteTrigger(event) {
    this.autoCompleteTrigger.emit(event);
  }

  selectionChange(event) {
    this.gSelectionChanged.emit(event);
  }

  dropDownChange(event) {
    this.gDropDownChanged.emit(event);
  }

  keytab(e: any) {
    if (e.key.toLowerCase() === 'enter') {
      const { form } = e.target;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }
}

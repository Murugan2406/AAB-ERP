/* eslint-disable no-underscore-dangle */
import Swal from 'sweetalert2';

/* eslint-disable no-return-assign */
import {
  FormArray, FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Globals } from '../globals';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.css'],
})
export class FormGeneratorComponent implements OnInit {
  loading =false;

  showdefaultFilter =false;

  showvalue =false;

  ledgerType = ['text', 'autoComplete', 'number', 'dropdown', 'date', 'radio', 'checkbox', 'attchment'];

  displayedColumns = ['SNo', 'name', 'label', 'value', 'style', 'defaultFilter', 'options', 'Action'];

  // public fields: any = [];

  dataSource = new MatTableDataSource<any>();

   fields: any[] = [
     {
       type: 'text',
       name: 'firstName',
       label: 'First Name',
       value: 'Murugan',
       style: 'col-12 col-md-6 mt-2',
     }, {
       type: 'number',
       name: 'Amount',
       label: 'Amount',
       value: '100',
       style: 'col-12 col-md-6 mt-2',
     },
     {
       type: 'dropdown',
       name: 'CompanyName',
       label: 'CompanyName',
       value: '',
       style: 'col-12 col-md-6 mt-2',
       options: [],
     },
     {
       type: 'autoComplete',
       name: 'Finbook',
       label: 'Finbook',
       defaultFilter: true,
       value: {},
       style: 'col-12 col-md-6 mt-2',
       options: [],
     },
     {
       type: 'autoComplete',
       name: 'BranchNameOne',
       label: 'BranchNameOne',
       defaultFilter: false,
       style: 'col-12 col-md-6 mt-2',
       value: {},
       options: [],
     },

     {
       type: 'date',
       name: 'FromData',
       label: 'From Data',
       value: new Date(),
       style: 'col-6 col-md-3 mt-2',
     },
     {
       type: 'date',
       name: 'To Date',
       label: 'To Date',
       value: new Date(),
       style: 'col-6 col-md-3 mt-2',
     },
     {
       type: 'radio',
       name: 'Gender',
       label: 'Gender',
       style: 'col-6 col-md-3 mt-2',
       value: 'm',
       options: [
         { key: 'm', label: 'Male' },
         { key: 'f', label: 'Female' },
       ],
     },
     {
       type: 'checkbox',
       name: 'Skill',
       label: 'Skill',
       style: 'col-6 col-md-3 mt-2',
       value: 'Angular',
       options: [
         { key: 'Angular', label: 'Angular' },
         { key: 'NodeJS', label: 'Node JS' },
       ],
     },
     {
       type: 'attchment',
       name: 'Attachment',
       label: 'Attachment',
       style: 'col-12 col-md-6 mt-2',
       options: [
         { key: 'Angular', label: 'Angular' },
         { key: 'NodeJS', label: 'Node JS' },
       ],

     },
   ];

  VOForm: FormGroup;

  myForm :FormGroup= this.fbuilder.group({
    type: ['', Validators.required],
    name: ['', Validators.required],
    label: ['', Validators.required],
    value: [''],
    style: ['', Validators.required],
    defaultFilter: [''],
    options: [],
    isEditable: [],

  });

  constructor(
    private global: Globals,
    private router: Router,
    public dialog: MatDialog,
    private fbuilder: FormBuilder,
    private commonservice: CommonService,
  ) { }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource([]);

    this.VOForm = this.fbuilder.group({
      VORows: this.fbuilder.array(this.fields),
    });

    this.formFields([{}]);
  }

  keytab(event:any) {
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        const { form } = event.target;
        const index = Array.prototype.indexOf.call(form, event.target);
        const dateattr = form.elements[index + 1].getAttribute('aria-label');
        if (dateattr && dateattr === 'Open calendar') {
          form.elements[index + 2]?.focus();
        } else {
          form.elements[index + 1]?.focus();
        }

        event.preventDefault();
      }
    }
  }

  clearValue() {
    this.myForm.reset();
  }

  viewSearch = ''

  addRow() {
    const control :any = this.VOForm.get('VORows') as FormArray;
    // console.log(control);
    // control = [...control.controls];
    const Arr1 = this.dataSource.data[0];
    this.dataSource.data.push(Arr1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    console.log(this.dataSource.data.length);
    this.dataSource._updateChangeSubscription();

    // const formArray = this.VOForm.get('purchaseItems') as FormArray;
    // const control = <FormArray> this.VOForm.get('users');
    // control.push(this.initiatForm());
    // this.dataSource = new MatTableDataSource(control);

    // this.dataSource.data.push(this.initiatForm());
    // this.dataSource = new MatTableDataSource(control);
  }

  formFields(data) {
    this.VOForm = this.fbuilder.group({
      VORows: this.fbuilder.array(data.map((val) => this.fbuilder.group({
        type: new FormControl(val.type ?? '', Validators.required),
        name: new FormControl(val.name ?? '', Validators.required),
        label: new FormControl(val.label ?? '', Validators.required),
        value: new FormControl(val.value ?? ''),
        style: new FormControl(val.style ?? '', Validators.required),
        defaultFilter: new FormControl(val.defaultFilter ?? ''),
        options: new FormControl([] ?? ''),
        isEditable: new FormControl(true),
      }))),
    });
    this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
  }

  initiatForm(data) {
    this.VOForm = this.fbuilder.group({
      VORows: this.fbuilder.array(data.map((val) => this.fbuilder.group({
        type: new FormControl(val.type ?? '', Validators.required),
        name: new FormControl(val.name ?? '', Validators.required),
        label: new FormControl(val.label ?? '', Validators.required),
        value: new FormControl(val.value ?? ''),
        style: new FormControl(val.style ?? '', Validators.required),
        defaultFilter: new FormControl(val.defaultFilter ?? ''),
        options: new FormControl([] ?? ''),
        isEditable: new FormControl(true),
      }))),
    });
    this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
  }

  FormSubmit() {
    console.log(this.myForm.valid, this.myForm.value);
    const FormObject = {
      type: this.myForm.value.type ?? 'nill',
      name: this.myForm.value.name ?? 'nill',
      label: this.myForm.value.label ?? 'nill',
      value: this.myForm.value.value ?? 'nill',
      style: this.myForm.value.style ?? 'nill',
      options: [] ?? '[]',
      defaultFilter: this.myForm.value.defaultFilter ?? 'nill',
    };
    if (this.myForm.valid) {
      this.fields.push(FormObject);
      this.clearValue();
    } else {
      Swal.fire({ text: 'Please fill mandatory fields' });
    }

    console.log(this.fields);
  }

  optionSelected(event, value, id) {
    if (event.source.selected) {
      setTimeout(() => {
        console.log(value);

        if (value === 'text') {
          this.showdefaultFilter = false;
          this.showvalue = true;
        } else if (value === 'autoComplete') {
          this.showdefaultFilter = true;
          this.showvalue = false;
        }
        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  editRow(selectedRow, index) {
    console.log(selectedRow, index);
  }

  RemoveRow(selectedRow, index) {
    Swal.fire({
      title: 'Are you sure to Remove ?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, Save it!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(selectedRow, index);
        this.fields.slice(index, 1);
      }
    });
  }

  EditAmount(VOFormElement, i) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
  }

  SaveAmount(VOFormElement, i) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    // this.totalAmount = this.dataSource.data.map((t) => t.value.Amount).reduce((acc, value) => acc + Math.round((value) * 100) / 100, 0);
  }

  CancelEdit(VOFormElement, i) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }

  upsertBill() {
    console.log(this.myForm.value);
  }
}

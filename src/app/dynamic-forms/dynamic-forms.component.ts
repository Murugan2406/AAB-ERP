/* eslint-disable no-return-assign */
import { FormGroup } from '@angular/forms';
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
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Globals } from '../globals';
import { CommonService } from '../services/common.service';
import { murgnService } from '../services/murgn.service';
import { AccServiceService } from '../services/acc-service.service';

@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.css'],
})
export class DynamicFormsComponent implements OnInit {
  AllBranchList: any;

  CompanyList: any;

  AllFBList: any[];

  CmpObj = {};

  constructor(
    private global: Globals,
        private accService: AccServiceService,
  ) { }

  public fields: any[] = [
    {
      type: 'text',
      name: 'firstName',
      label: 'Full Name',
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
      value: this.CmpObj,
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

  AutoForm: FormGroup;

  ngOnInit(): void {
    this.getCmp();
    this.getFinbook();
  }

  keytab(e: any) {
    if (e.key.toLowerCase() === 'enter') {
      if (e.target.value) {
        const { form } = e.target;

        const index = [...form].indexOf(e.target);
        const index1 = this.fields.findIndex((x) => x.type === 'dropdown');
        const dropown = this.fields.find((x) => x.type === 'dropdown');

        if ((index1 - 1) === index) {
          document.getElementById(dropown.name)?.focus();
        } else {
          const dateattr = form.elements[index + 1]?.getAttribute('aria-label');
          if (form.elements[index + 1]) {
            if (dateattr && dateattr === 'Open calendar') {
              form.elements[index + 2] ? form.elements[index + 2]?.focus() : document.getElementById('gSubmit')?.focus();
            } else {
              form.elements[index + 1]?.focus();
            }
          } else {
            document.getElementById('gSubmit')?.focus();
          }
        }
        e.preventDefault();
      }
    }
  }

  getFields() {
    return this.fields;
  }

  selectionChange(event) {
    console.log(event);
    if (event.name === 'BranchNameOne') {
      setTimeout(() => {
        document.getElementById('FromData')?.focus();
      }, 100);
    } else {
      setTimeout(() => {
        document.getElementById('BranchNameOne')?.focus();
      }, 100);
    }
  }

  gDropDownChange(event) {
    console.log(event);
    setTimeout(() => {
      document.getElementById('Finbook')?.focus();
    }, 100);
  }

  async autCompleteTrigger(event) {
    const CompCode = this.global.gUsrDefultCmpCode;
    const FBCode = this.global.gUsrDefultFbCode;
    this.AllBranchList = await this.accService.getFbBasedBranch(CompCode, FBCode, event);
    this.fields[4].options = this.AllBranchList;
    this.fields[4].options.forEach((element) => {
      element.key3 = 'brname';
    });
  }

  async getCmp() {
    this.CompanyList = await this.accService.getCompany();
    this.fields[2].options = this.CompanyList;
    this.fields[2].options.forEach((element:any) => {
      element.key3 = 'company';
    });
    this.CmpObj = this.CompanyList[0];
  }

  async getFinbook() {
    const CompCode = this.global.gUsrDefultCmpCode;
    this.AllFBList = await this.accService.getFinbook(CompCode, '');
    this.fields[3].options = this.AllFBList;
    this.fields[3].options.forEach((element) => {
      element.key3 = 'FbName';
    });
    const fbObj = {
      FbCode: 'APFB', FbName: 'ANDHRA FB', FbCodeName: 'ANDHRA FB-APFB', StatusResponse: 'Success', key3: 'FbName',
    };
  }

  formSubmit(form) {
    console.log(form.value);
  }

  formEvent(form) {
    const fbObj = {
      FbCode: 'TNFB', FbName: 'TAMILNADU FB', FbCodeName: 'TamilNadu-Fb TNFB', StatusResponse: 'Success', key3: 'FbName',
    };
    const brObj = {
      brcode: '1', brname: 'ADYAR SHOP', BrCodeName: 'ADYAR SHOP-1', StatusResponse: 'Success', key3: 'brname',
    };
    const cmpObj = { CmpCode: 'KSTR' };

    form.get('Finbook').setValue(fbObj);
    this.CmpObj = cmpObj;

    form.get('BranchNameOne').setValue(brObj);

    form.get('CompanyName').setValue(cmpObj);
    console.log(form.get('CompanyName').value);
    return this.AutoForm = form;
  }

  SubmitForm(event) {
    console.log(0);
  }
}

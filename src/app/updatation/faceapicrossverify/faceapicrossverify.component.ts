/* eslint-disable no-underscore-dangle */
/* eslint-disable import/order */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-concat */
/* eslint-disable no-empty */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Globals } from 'src/app/globals';
import { InventoryService } from '../services/inventory.service';
import { SubSink } from 'subsink';
// import { Globals } from '../globals';
// import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-faceapicrossverify',
  templateUrl: './faceapicrossverify.component.html',
  styleUrls: ['./faceapicrossverify.component.scss'],
})

export class FaceapicrossverifyComponent implements OnInit, OnDestroy {
  brcode:any = 0;

  constructor(
private globals: Globals,
private router: Router,
private service: InventoryService,
public dialogRef: MatDialogRef<FaceapicrossverifyComponent>,
  ) {
    this.service.apiUrl = this.globals.gApiserver;
    if (this.globals.gclientServer === 'Client') {
      this.brcode = this.globals.gBrcode;
    }

    this.subs.add(this.branchControl.valueChanges.pipe(debounceTime(600)).subscribe((myvardatas) => {
      this.loadDatas('BranchSelection', myvardatas, '0', '0', '0', '0');
    }));
  }

  gclientServer = '';

  branchControl = new FormControl();

  branches:any = [];

  progressval = '';

  subs = new SubSink();

  resData:any = [];

  tdate:string = '';

  ngOnInit(): void {
    this.gclientServer = this.globals.gclientServer;
    this.setDefaultDate();
    if (this.globals.gclientServer === 'Client') {
      this.getData();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setDefaultDate() {
    const date = this.globals.gkDate;
    this.tdate = this.changeDateFormat(date, 'yyyy-MM-dd');
  }

  selectBranch(event:any) {
    this.brcode = this.branches.find((e: { brname: any; }) => e.brname === event).brcode;
  }

  getData() {
    this.progressval = 'indeterminate';
    this.resData = [];
    this.loadDatas('ViewFaceApproved', this.changeDateFormat(this.tdate, 'dd-MMM-yyyy'), this.brcode, '0', '0', '0');
  }

  loadDatas(reqmain: string, flag: any, brcode: string | number, extra1: string, extra2: string, extra3: string) {
    this.subs.add(this.service.getapprovalReqTwo({
      reqMainreq: reqmain,
      raFlag: flag,
      aprStatus: '',
      Usr: this.globals.gUsrid,
      reqfromDTAP: '0',
      reqfromIp: '0',
      TrnNo: '0',
      brcode,
      appby: '0',
      splreason: '0',
      extra1,
      extra2,
      extra3,
    }).subscribe((result: any) => {
      this.progressval = '';
      const response: any = result;
      if (response.length > 0) {
        if (reqmain === 'ViewFaceApproved') {
          this.resData = response;
        }
        if (reqmain === 'BranchSelection') {
          this.branches = response;
        }
      }
    }, (err:any) => {
      this.progressval = '';
    }));
  }

  changeDateFormat(startDate: string | number | Date, format: string): any {
    const locale = 'en-US';
    return formatDate(startDate, format, locale);
  }

  keyTab(event) {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTimeout(() => {
        document.getElementById('btnView')?.focus();
      }, 100);
    }
  }

  homeNavigation() {
    if (this.globals.gmainMenuSelected === 'FaceApiCrossVerify') {
      this.globals.SelectDashboard = 'GROUPLIST';
      this.router.navigate(['/dashboard']);
    } else {
      this.dialogRef.close(false);
    }
  }

  backNavigation() {
    if (this.globals.gmainMenuSelected === 'FaceApiCrossVerify') {
      this.router.navigate(['/dashboard']);
    } else {
      this.dialogRef.close(false);
    }
  }
}

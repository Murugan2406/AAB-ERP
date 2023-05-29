/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { Globals } from 'src/app/globals';
import { AccServiceService } from 'src/app/services/acc-service.service';
import { CommonService } from 'src/app/services/common.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-updated-dcnote',
  templateUrl: './updated-dcnote.component.html',
  styleUrls: ['./updated-dcnote.component.scss'],
})
export class UpdatedDCNoteComponent implements OnInit {
  GMenu: any = '';

  SectionTitle: string = '';

  showNormalJv: boolean = true;

  showApproveJv: boolean = false;

  ShowForm: boolean = false;

  datePipe: DatePipe;

  AllFBList: any[] = [];

  NoteInformationForm :FormGroup;

  voucherInfoForm:FormGroup;

  AccInformationForm:FormGroup;

  private subs = new SubSink();

  CommonTrntype = new FormControl('', Validators.required)

  viewDCNoteForm:FormGroup;

  entryTypes: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private commonService: CommonService,
    public snackbar: MatSnackBar,
    private globals: Globals,
    private accService: AccServiceService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.datePipe = new DatePipe('en-IN');
    this.commonService.reqSendto = 'datareqsarnEleven';
    this.GMenu = this.globals.gmainMenuSelected;
    if (this.GMenu === 'JVApprovel') {
      this.SectionTitle = 'Journal Voucher Approval';
      this.showNormalJv = false;
      this.showApproveJv = true;
      this.ShowForm = true;
      this.formInialization();
      this.shortcuts();
      this.getTrantype();

      this.AllFBList = await this.accService.getFinbook(this.globals.gUsrDefultCmpCode, '');
      setTimeout(() => {
        // this.ViewApprovalJV(this.JVApprovalForm);
      }, 300);
    } else if (this.GMenu === 'JVNormal') {
      this.showNormalJv = true;
      this.showApproveJv = false;
      this.ShowForm = true;
      this.formInialization();
      this.shortcuts();
      this.getTrantype();

      this.AllFBList = await this.accService.getFinbook(this.globals.gUsrDefultCmpCode, '');
      setTimeout(() => {
        document.getElementById('narration')?.focus();
      }, 200);
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  formInialization() {
    const fbObj = {
      FbCode: this.globals.gUsrDefultFbCode,
      FbName: this.globals.gUsrDefultFbName,
    };
    // this.costCenter = this.globals.gBrname;
    const brObj = {
      brname: this.globals.gBrname,
      brcode: this.globals.gBrcode,
    };

    this.NoteInformationForm = this.fb.group({
      noteType: ['DEBIT NOTE', Validators.required],
      // narration: ['', Validators.required],
      accDate: [new Date(), Validators.required],
    });
    this.voucherInfoForm = this.fb.group({
      finBookName: [fbObj, Validators.required],
      costCenter: [brObj, Validators.required],
      Supcode: ['', Validators.required],
      supplierName: ['', Validators.required],
      supplierAddress: ['', Validators.required],
      supplierState: ['', Validators.required],
      supplierAccCode: ['10013-001', Validators.required],
      supplierAccDec: ['', Validators.required],
      supplierNoteNo: ['', Validators.required],
      supplierNoteDate: [new Date(), Validators.required],
      supplierNoteAmount: ['', Validators.required],
      attachments: [''],
      divCode: ['', Validators.required],
      subDivCode: ['', Validators.required],
      narration: ['', Validators.required],
    });

    const trnObj = {
      StatusResponse: 'Success',
      TrnId: '2',
      Trntype: 'Debit Note',
    };
    this.CommonTrntype.setValue(trnObj);
    this.AccInformationForm = this.fb.group({
      accountType: ['Account Code', Validators.required],
      finBookName: [fbObj, Validators.required],
      AccName: ['', Validators.required],
      amount: ['', Validators.required],
      costCenter: [brObj, Validators.required],
      remarks: ['', Validators.required],
      // trnType: [trnObj, Validators.required],
      InvoiceNo: ['', Validators.required],
      InvoiceDate: [new Date(), Validators.required],
      trnGst: ['5', Validators.required],
      totalAmount: ['', Validators.required],
    });
    const BrObj = {
      brname: this.globals.gBrname,
      brcode: this.globals.gBrcode,
    };
    this.viewDCNoteForm = this.fb.group({
      finBookName: fbObj,
      costCenter: [BrObj, Validators.required],
      fromDate: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd', 'en'),
      toDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      status: ['ALL', Validators.required],
      noteType: ['DEBIT NOTE', Validators.required],
      tranType: ['', Validators.required],
    });
  }

  getTrantype() {
    let notetype = '';

    if (this.viewDCNoteForm.value.noteType === 'DEBIT NOTE') {
      notetype = 'DebitNote';
    } else {
      notetype = 'CreditNote';
    }
    const api = {
      reqMainreq: 'VoucherList',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: '',
      var2: notetype,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.entryTypes = response;
              this.viewDCNoteForm.get('tranType').setValue(response[0]);
            } else {
              this.commonService.openSnackbar(response[0].StatusResponse, 'Ok', 1500);
            }
          }
        },
        error: (error) => {
          // Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(
      keydown$.subscribe((event: KeyboardEvent) => {
        if (event.altKey && event.key === 'c') {
          this.clearDCNote();
          return;
        }
        if (event.altKey && event.key === 's') {
          // this.saveDCNote();
          return;
        }
        if (event.altKey && event.key === 'v') {
          // this.viewDCNote();
          return;
        }
        if (event.altKey && event.key === 'x') {
          this.router.navigate(['/dashboard']);
        }
      }),
    );
  }

  clearDCNote() {
    this.formInialization();
  }
}

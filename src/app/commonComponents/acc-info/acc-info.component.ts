/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable max-len */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Globals } from 'src/app/globals';
import { CommonService } from 'src/app/services/common.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-acc-info',
  template: `<div class="gcardContainer mt-2  mx-2">
  <div class="row">
      <div class="col-12 col-sm-4 col-md-6 col-lg-8">
          <button mat-button class="gIconButton" (click)="toggleForm()" *ngIf="!ShowForm">
              <mat-icon style="line-height: 9px !important">minimize</mat-icon>
          </button>
          <button mat-button class="gIconButton" (click)="toggleForm()" *ngIf="ShowForm">
              <mat-icon style="line-height: 21px !important">add</mat-icon>
          </button>
          <span class="gInputLable"> &nbsp; {{title}}</span>

      </div>
  </div>
  <div *ngIf="ShowForm">
      <form [formGroup]="AccountInformationForm">
          <div class="row">

              <div class="col-12 col-md-6 col-xl-4">
                  <div class="row form-group">
                      <label class="gInputLable col-sm-12 col-md-4 col-lg-4">Fin Book </label>
                      <div class="col-sm-12 col-md-8 col-lg-8">
                          <input type="text" class="gInnerInput" name="finBookName1" [id]="unique+'finBookName1'" formControlName="FinBookName" autocomplete="off" (input)="FilterFinbook($event.target.value)" (keydown)="keytab($event, unique+'AccCostCenter')" [matAutocomplete]="fbName"
                          />
                          <mat-autocomplete #fbName="matAutocomplete" class="gAutoCompleteContainer" [displayWith]="displayFb">
                              <mat-option class="gSelectOption" *ngFor="let fb of FbOneArr" [value]="fb" (onSelectionChange)="Fbchoosed($event, 'debit', unique+'AccCostCenter')">
                                  {{ fb.FbName }}
                              </mat-option>
                          </mat-autocomplete>
                      </div>
                  </div>

              </div>
              <div class="col-12 col-md-6 col-xl-4">
                  <div class="row form-group">
                      <label class="gInputLable col-sm-12 col-md-4 col-lg-4">CostCenter/branch</label>
                      <div class="col-sm-12 col-md-8 col-lg-8">
                          <input type="text" class="gInnerInput" name="costCenter" [id]="unique+'AccCostCenter'" formControlName="costCenter" (input)="getBranchName($event.target.value)" autocomplete="off" [matAutocomplete]="autoBranchName" (keydown)="keytab($event, unique+'accountType')"
                          />
                          <mat-autocomplete #autoBranchName="matAutocomplete" class="gAutoCompleteContainer" [displayWith]="displayBr">
                              <mat-option class="gSelectOption" *ngFor="let branchName of debitBranch" [value]="branchName" (onSelectionChange)="FocusNext($event,unique+'accountType' )">{{ branchName.brname }}</mat-option>
                          </mat-autocomplete>
                      </div>
                  </div>

              </div>

              <div class="col-12 col-md-6 col-xl-4">
                  <div class="row form-group">
                      <label class="gInputLable col-sm-12 col-md-4 col-lg-4">Account Type</label>
                      <div class="col-sm-12 col-md-8 col-lg-8">
                          <mat-select class="gInnerInput" [id]="unique+'accountType'" formControlName="accountType" (selectionChange)="FocusNext($event, unique+'accname')">
                              <mat-option class="gSelectOption" *ngFor="let accountType of accountTypes" [value]="accountType.Acctype">
                                  {{ accountType.Acctype }}
                              </mat-option>
                          </mat-select>
                      </div>
                  </div>

              </div>

              <div class="col-12 col-md-6 col-xl-4">
                  <div class="row form-group">
                      <mat-label class="gInputLable col-sm-12 col-md-4 col-lg-4" *ngIf="AccountInformationForm.get('accountType').value !== 'Ussage Ids'">Account Name
                      </mat-label>
                      <mat-label class="gInputLable col-sm-12 col-md-4 col-lg-4" *ngIf="AccountInformationForm.get('accountType').value === 'Ussage Ids'">Ussage Name
                      </mat-label>


                      <div class="col-sm-12 col-md-8 col-lg-8" *ngIf="AccountInformationForm.get('accountType').value !== 'Ussage Ids' ">
                          <input type="text" class="gInnerInput" name="name" [id]="unique+'accname'" (keydown)="keytab($event, unique+'Amount')" formControlName="AccName_UssageName" autocomplete="off" [matAutocomplete]="autoNames" (input)="getAccountName($event.target.value)"
                          />

                          <mat-autocomplete #autoNames="matAutocomplete" [displayWith]="displayAccName" class="gAutoCompleteContainer">
                              <mat-option class="gSelectOption" *ngFor="let accName of debitaccountNames" [value]="accName" (onSelectionChange)="AccountNameSelected($event)">
                                  {{ accName.AcCodeName }}
                              </mat-option>
                          </mat-autocomplete>
                      </div>
                      <div class="col-sm-12 col-md-8 col-lg-8" *ngIf="AccountInformationForm.get('accountType').value === 'Ussage Ids' ">
                          <input type="text" class="gInnerInput" name="name" [id]="unique+'accname'" formControlName="AccName_UssageName" (keydown)="keytab($event, unique+'Amount')" [matAutocomplete]="autoNames" (input)="getUssageName($event.target.value)" />
                          <mat-autocomplete #autoNames="matAutocomplete" [displayWith]="displayUssageName" class="gAutoCompleteContainer">
                              <mat-option class="gSelectOption" *ngFor="let usgName of debitUsageList" [value]="usgName" (onSelectionChange)="AccountNameSelected($event)">
                                  {{ usgName.UsageCodeName }}
                              </mat-option>
                          </mat-autocomplete>
                      </div>

                  </div>

              </div>
              <div class="col-12 col-md-6 col-xl-4">
                  <div class="row form-group">
                      <label class="gInputLable col-sm-12 col-md-4 col-lg-4">Amount</label>
                      <div class="col-sm-12 col-md-4 col-lg-4">
                          <input type="text" class="gInnerInput" name="Amount" [id]="unique+'Amount'" formControlName="Amount" autocomplete="off" (keypress)="Decimal($event)" (keydown)="keytab($event,unique+'remarks')" />

                      </div>

                  </div>

              </div>

              <div class="col-12 col-md-6 col-xl-4">
                  <div class="row form-group">
                      <label class="gInputLable col-sm-12 col-md-4 col-lg-4">Remarks</label>
                      <div class="col-sm-12 col-md-8 col-lg-8 ">
                          <div class="gOuterInput">
                              <input type="text" class="gInnerInput" name="remarks" [id]="unique+'remarks'" formControlName="remarks" autocomplete="off" (keydown)="keytab($event, unique+'add_button')" />
                              <button type="button" [id]="unique+'add_button'" mat-button class="gInputButton" [disabled]="editable" (click)="SubmitDebitForm()">
                              <mat-icon style="font-size: 20px !important">add</mat-icon>

                          </button>
                          </div>
                      </div>
                  </div>

              </div>



          </div>
      </form>
  </div>
</div>`,
  styles: ['.gcardContainer {border: 0.5px solid rgb(31 38 135 / 23%);}'],
})
export class AccInfoComponent implements OnInit {
  AccountInformationForm: any;

  FbOneArr: any;

  private subs = new SubSink();

  AllFBList: any[];

  debitBranch: any[];

  accountTypes: any[];

  debitaccountNames: any[];

  debitUsageList: any[];

  ShowForm = true;

  @Input() title: String;

  @Input() unique: String;

  @Input() mode: String;

  @Input() FormValue: any;

  @Input() editable :boolean

  constructor(
    private globals: Globals,
    private fb: FormBuilder,
    private commonService: CommonService,

  ) {
    this.commonService.apiUrl = this.globals.gApiserver;
    this.commonService.reqSendto = 'datareqsarnEleven';
  }

  ngOnInit(): void {
    if (this.mode === 'edit') {
      const fbObj = {
        FbCode: this.globals.gUsrDefultFbCode,
        FbName: this.globals.gUsrDefultFbName,
      };

      const BrObj = {
        brname: this.globals.gBrname,
        brcode: this.globals.gBrcode,
      };

      this.AccountInformationForm = this.fb.group({
        accountType: ['', Validators.required],
        FinBookName: [fbObj, Validators.required],
        AccName_UssageName: ['', Validators.required],
        Amount: ['', Validators.required],
        costCenter: [BrObj, Validators.required],
        remarks: ['', Validators.required],
      });
      this.getFinbook();
      this.getAccountType();
    } else {
      this.AccountInformationForm = this.fb.group({
        accountType: [this.FormValue[0].accountType, Validators.required],
        FinBookName: [this.FormValue[0].FinBookName, Validators.required],
        AccName_UssageName: [this.FormValue[0].AccName_UssageName, Validators.required],
        Amount: [this.FormValue[0].Amount, Validators.required],
        costCenter: [this.FormValue[0].costCenter, Validators.required],
        remarks: [this.FormValue[0].remarks, Validators.required],
      });

      if (this.editable) {
        this.AccountInformationForm.disable();
      }
    }
  }

  getFinbook() {
    const api = {
      reqMainreq: 'SR_FBSearch',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.globals.gUsrDefultCmpCode,
      var2: '',
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.AllFBList = response;
            } else {
              this.commonService.openSnackbar(response[0].StatusResponse, 'Ok', 1500);
            }
          } else {
            this.commonService.openSnackbar('no resposne', 'Ok', 1500);
          }
        },
        error: (error) => {
          this.commonService.openSnackbar('Http failure response', 'Ok', 1500);
        },
        complete: () => {},
      }),
    );
    // });
  }

  getBranchName(data) {
    if (this.commonService.checkTypeValitity(this.AccountInformationForm.get('FinBookName').value, 'Finbook')) {
      const api = {
        reqMainreq: 'SR_brSearch',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: data,
        var2: this.globals.gUsrDefultCmpCode,
        var3: this.AccountInformationForm.get('FinBookName').value.FbCode,
      };

      this.debitBranch = [];

      this.subs.add(
        this.commonService.sendReqst(api).subscribe({
          next: (response) => {
            if (response.length > 0) {
              if (response[0].StatusResponse === 'Success') {
                this.debitBranch = response;
              } else {
                this.commonService.openSnackbar(response[0].StatusResponse, 'Ok', 1000);
              }
            } else {
              this.commonService.openSnackbar('No data found.', 'Ok', 1000);
            }
          },
          error: (error) => {
            this.commonService.openSnackbar('Http failure response', 'Ok', 1000);
          },
          complete: () => {},
        }),
      );
    } else {
      this.debitBranch = [];
    }
  }

  getAccountType() {
    const api = {
      reqMainreq: 'SR_Acctype',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response[0].StatusResponse === 'Success') {
            this.accountTypes = response;
          } else {
            this.commonService.openSnackbar(response[0].StatusResponse, 'Ok', 1500);
          }
        },
        error: (error) => {
          this.commonService.openSnackbar('Http failure response', 'Ok', 1500);
        },
        complete: () => {},
      }),
    );
  }

  getAccountName(data) {
    if (this.commonService.checkTypeValitity(this.AccountInformationForm.get('FinBookName').value, 'Finbook')) {
      if (this.AccountInformationForm.get('accountType').invalid) {
        this.debitaccountNames = [];
        this.commonService.openSnackbar('Please Choose Account Type', 'Ok', 1000);
        return;
      }
    } else {
      return;
    }
    const { FbCode } = this.AccountInformationForm.get('FinBookName').value;
    const api = {
      reqMainreq: 'SR_AccNameSearch',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: data,
      var2: this.globals.gUsrDefultCmpCode,
      var3: FbCode,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.debitaccountNames = response;
            } else {
              this.commonService.openSnackbar(response[0].StatusResponse, 'Ok', 1000);
            }
          } else {
            this.commonService.openSnackbar('No data found.', 'Ok', 1000);
          }
        },
        error: (error) => {
          this.commonService.openSnackbar('Http failure response', 'Ok', 1000);
        },
        complete: () => {},
      }),
    );
  }

  getUssageName(data, type) {
    if (this.commonService.checkTypeValitity(this.AccountInformationForm.get('FinBookName').value, 'Finbook')
      && this.commonService.checkTypeValitity(this.AccountInformationForm.get('costCenter').value, 'Cost center')) {
      if (this.AccountInformationForm.get('accountType').invalid) {
        this.debitaccountNames = [];
        this.commonService.openSnackbar('Please Choose Account Type', 'Ok', 1000);
        return;
      }
    } else {
      return;
    }

    let FbCode = '';

    let BrCode = '';

    FbCode = this.AccountInformationForm.get('FinBookName').value.FbCode;
    BrCode = this.AccountInformationForm.get('costCenter').value.brcode;
    this.debitUsageList = [];

    const api = {
      reqMainreq: 'SR_UssageIdSearch',
      Usr: this.globals.gUsrid,
      var1: data,
      var2: this.globals.gUsrDefultCmpCode,
      var3: FbCode,
      var4: BrCode,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.debitUsageList = response;
            } else {
              this.commonService.openSnackbar(response[0].StatusResponse, 'Ok', 1500);
            }
          } else {
            this.commonService.openSnackbar('No data found.', 'Ok', 1500);
          }
        },
        error: (error) => {
          this.commonService.openSnackbar('Http failure response', 'Ok', 1500);
        },
        complete: () => {},
      }),
    );
  }

  Fbchoosed(event, type, id) {
    if (event.source.selected) {
      setTimeout(() => {
        this.debitBranch = [];
        this.AccountInformationForm.get('costCenter').setValue('');
        this.debitUsageList = [];
        this.debitaccountNames = [];
        this.AccountInformationForm.get('AccName_UssageName').setValue('');

        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  FilterFinbook(keyValue) {
    const key = keyValue.toLocaleUpperCase();
    this.FbOneArr = this.AllFBList.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
  }

  FocusNext(event, id) {
    if (event.source.selected) {
      setTimeout(() => {
        document.getElementById(id).focus();
      }, 100);
    }
  }

  keytab(e: any, id: any): void {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        setTimeout(() => {
          document.getElementById(id)?.focus();
        }, 100);
      }
    }
  }

  Decimal(event: any) {
    return (
      (event.charCode === 46 && event.target.value.indexOf('.') === -1)
      || (event.charCode >= 48 && event.charCode <= 57)
    );
  }

  AccountNameSelected(event) {
    if (event.source.selected) {
      setTimeout(() => {
        document.getElementById(`${this.unique}Amount`)?.focus();
      }, 100);
    }
  }

  @Output() public submit = new EventEmitter<any>();

  SubmitDebitForm() {
    if (this.AccountInformationForm.valid) {
      if (this.commonService.checkTypeValitity(this.AccountInformationForm.get('FinBookName').value, 'Finbook')
    && this.commonService.checkTypeValitity(this.AccountInformationForm.get('costCenter').value, 'Cost center')
    && this.commonService.checkTypeValitity(this.AccountInformationForm.get('AccName_UssageName').value, `${this.AccountInformationForm.get('accountType').value === 'Account Code' ? 'Account Name' : 'Ussage Name'}`)) {
        this.submit.emit(this.AccountInformationForm);
        this.debitaccountNames = [];
        this.debitUsageList = [];
        this.AccountInformationForm.get('AccName_UssageName').reset();
        this.AccountInformationForm.get('Amount').reset();
        this.AccountInformationForm.get('remarks').reset();
        document.getElementById(`${this.unique}accname`).focus();
      }
    } else {
      this.commonService.openSnackbar('Please fill all the fields', 'Ok', 1500);
    }
  }

  toggleForm() {
    this.ShowForm = !this.ShowForm;
  }

  displayFb = (option) => (option && option.FbName ? option.FbName : '');

  displayBr = (option) => (option && option.brname ? option.brname : '');

  displayUssageName = (option) => (option && option.UsageCodeName ? option.UsageCodeName : '');

  displayAccName = (option) => (option && option.accName ? option.accName : '');
}

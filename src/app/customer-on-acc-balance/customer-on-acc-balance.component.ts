/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { Globals } from '../globals';
import { CommonService } from '../services/common.service';
import { murgnService } from '../services/murgn.service';

@Component({
  selector: 'app-customer-on-acc-balance',
  templateUrl: './customer-on-acc-balance.component.html',
  styleUrls: ['./customer-on-acc-balance.component.scss'],
})
export class CustomerOnAccBalanceComponent implements OnInit {
  OverAllbranchLists: any = [];

  branchLists: any = [];

  overAllCustomerList: any = [];

  customerList: any = [];

  BranchName: FormControl = new FormControl('', Validators.required);

  CustomerName: FormControl = new FormControl('', Validators.required);

  loading: boolean = false;

  CustomerSearch:any ='';

  displayedColumns: any = [
    'S.No',
    'Custcode',
    'Customer',
    'View',
    'Edit',
    'AdvBal',
  ];

  displayedMoreColumns: any = [
    'Sno',
    'Trndate',
    'PayMode',
    'PaidAmt',
    'BalanceAmt',
    'EntryUser',
    'EntryTime',
    'Orderno/BlncTrans',

  ];

  datasource = new MatTableDataSource([]);

  datasourceMore= new MatTableDataSource([]);

  searchTemp: String = '';

  origin: String = '';

  private subs = new SubSink();

  CreateAccBalance = this.fbuilder.group({
    CustName: ['', Validators.required],
    CurrAmt: ['', Validators.required],
    NewAmt: ['', Validators.required],
    diffAdjAmt: ['', Validators.required],
  });

   CustomerObj;

  selectedCustCode: any;

  column: any = '';

  direction: number = 0;

  TotalAmt: any;

  constructor(
    public dialog: MatDialog,
    private fbuilder: FormBuilder,
    private global: Globals,
    private muruganService: murgnService,
    private commonservice: CommonService,
  ) {
    this.commonservice.apiUrl = this.global.gApiserver;
    this.commonservice.reqSendto = 'datareqrachnNine';
  }

  ngOnInit(): void {
    this.origin = this.global.gclientServer;
    this.CustomerObj = {
      code: '0',
      name: 'All',
    };
    const BrObject = {
      brcode: this.global.gBrcode,
      brname: this.global.gBrname,
    };

    if (this.origin === 'Client') {
      this.BranchName.setValue(BrObject);
      this.CustomerName.setValue(this.CustomerObj);
      this.BranchName.disable();
      this.checkvalidation();
    } else {
      this.getBranchName();
      this.BranchName.setValue(BrObject);
      this.CustomerName.setValue(this.CustomerObj);
      this.checkvalidation();
    }

    if (this.BranchName.valid && this.CustomerName.valid) {
      this.getinitialData();
    }
    this.newAmountChange();
  }

  popUpSubmit(formValue) {
    if (this.CreateAccBalance.valid) {
      if (formValue.CurrAmt === formValue.NewAmt) {
        this.muruganService.openSnackBar('Same As current Amount');
        return;
      }
      Swal.fire({
        title: 'Are you sure to Update ?',

        icon: 'warning',

        showCancelButton: true,

        confirmButtonColor: '#3085d6',

        cancelButtonColor: '#d33',

        confirmButtonText: 'Yes, Save it!',
      }).then((result) => {
        if (result.isConfirmed) {
          const APIJson = {
            reqMainreq: 'ChangeCustomerOnAccDetail',
            Usr: this.global.gUsrid,
            brcode: this.BranchName.value.brcode,
            var1: this.global.gclientServer,
            var2: this.selectedCustCode,
            var3: formValue.CurrAmt,
            var4: formValue.NewAmt,

          };
          this.customerList = [];
          this.subs.add(
            this.commonservice.sendReqst(APIJson).subscribe({
              next: (response) => {
                if (response.length === 0) {
                  this.muruganService.openSnackBar('No Customer available');
                } else if (response[0].StatusRes === 'Success') {
                  this.dialog.closeAll();
                  this.muruganService.openSnackBar('Updated Succesfully');
                  setTimeout(() => {
                    this.getinitialData();
                  }, 100);
                } else {
                  Swal.fire({ text: response[0].StatusRes });
                }
              },
              error: (error) => {},
              complete: () => {},
            }),
          );
        }
      });
    } else {
      this.muruganService.openSnackBar('Please fill All the fields');
    }
  }

  sortBranchName(key: any) {
    const keyValue = key.toLocaleUpperCase();
    this.branchLists = this.OverAllbranchLists.filter((option) => option.brname.toLocaleUpperCase().includes(keyValue));
  }

  sortCustomerName(key: any) {
    if (this.BranchName.value
    && this.muruganService.checkTypeValitity(this.BranchName.value, 'Branch Name')) {
      const APIJson = {
        reqMainreq: 'LoadCustomerDetail',
        Usr: this.global.gUsrid,
        brcode: this.BranchName.value.brcode,
        var2: key,
      };
      this.customerList = [];
      this.subs.add(
        this.commonservice.sendReqst(APIJson).subscribe({
          next: (response) => {
            if (response.length === 0) {
              this.muruganService.openSnackBar('No Customer available');
            } else {
              const newArr = response.splice(0, 300);

              const allFinbok = [{
                code: '0',
                name: 'All',
              }];
              newArr.forEach((element) => {
                allFinbok.push(element);
              });

              this.customerList = allFinbok;
            }
          },
          error: (error) => {},
          complete: () => {},
        }),
      );
    } else {
      this.muruganService.openSnackBar('Please choose Branch Name');
    }
  }

  BrSelected(event: any) {
    if (event.source.selected) {
      if (this.origin === 'Client') {
        this.branchLists = [];
        this.datasource.data = [];
        this.CustomerName.setValue('');
        setTimeout(() => {
          document.getElementById('customerName')?.focus();
        }, 100);
      } else {
        this.branchLists = [];
        this.datasource.data = [];
        this.CustomerName.setValue(this.CustomerObj);
        setTimeout(() => {
          this.getinitialData();
        }, 100);
      }
    }
  }

  CustomerSelected(event: any) {
    if (event.source.selected) {
      setTimeout(() => {
        this.checkvalidation();
      }, 100);
      this.customerList = [];
    }
  }

  checkvalidation() {
    if (this.BranchName.value && this.CustomerName.value) {
      setTimeout(() => {
        this.getinitialData();
      }, 100);
    } else {
      this.muruganService.openSnackBar('Please fill all the fields');
    }
  }

  getBranchName() {
    const APIJson = {
      reqMainreq: 'LoadBranchDetail',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: 'All',
      var2: '',
    };

    this.subs.add(
      this.commonservice.sendReqst(APIJson).subscribe({
        next: (response) => {
          if (response) {
            if (response.length === 0) {
              this.muruganService.openSnackBar('No data available');
            } else {
              this.OverAllbranchLists = response;
            }
          } else {
            this.muruganService.openSnackBar('No response');
          }
        },
        error: (error) => {},
        complete: () => {},
      }),
    );
  }

  getinitialData() {
    if (
      this.muruganService.checkTypeValitity(this.BranchName.value, 'Branch Name')
      && this.muruganService.checkTypeValitity(this.CustomerName.value, 'Customer Name')
    ) {
      const APIJson = {
        reqMainreq: 'GetCustomerOnAccDetail',
        Usr: this.global.gUsrid,
        brcode: this.BranchName.value.brcode,
        var1: this.global.gclientServer,
        var2: this.CustomerName.value.code,
      };
      this.loading = true;
      this.datasource.data = [];
      this.subs.add(
        this.commonservice.sendReqst(APIJson).subscribe({
          next: (response) => {
            this.loading = false;
            if (response) {
              if (response.length === 0) {
                this.muruganService.openSnackBar('No data available');
              } else if (response[0].StatusRes === 'Success') {
                this.datasource.data = response;

                let xyz = 0;
                this.datasource.data.map((x: any) => {
                  xyz += x.AdvBal;
                  return xyz;
                });
                this.TotalAmt = xyz;
              } else {
                Swal.fire({ text: response[0].StatusRes });
              }
            } else {
              this.muruganService.openSnackBar('Server not connected');
            }
          },
          error: (error) => {
            this.loading = false;
            if (error.statusText === 'Unknown Error') {
              this.muruganService.openSnackBar('Server not connected');
            } else {
              this.muruganService.openSnackBar(error.statusText);
            }
          },
          complete: () => {},
        }),
      );
    }
  }

  ViewMore(templateRef: TemplateRef<any>, row) {
    const APIJson = {
      reqMainreq: 'ViewCustomerAdvDetail',
      Usr: this.global.gUsrid,
      brcode: this.BranchName.value.brcode,
      var1: this.global.gclientServer,
      var2: row.Custcode,
    };
    this.subs.add(
      this.commonservice.sendReqst(APIJson).subscribe({
        next: (response) => {
          if (response) {
            if (response.length === 0) {
              this.muruganService.openSnackBar('No data available');
            } else if (response[0].StatusRes === 'Success') {
              this.datasourceMore.data = response;
              this.dialog.open(templateRef, {
                maxWidth: 'auto',
                maxHeight: '630px',
                disableClose: true,
                autoFocus: false,
              });
            } else {
              this.muruganService.openSnackBar(response[0].StatusRes);
            }
          } else {
            this.muruganService.openSnackBar('No response');
          }
        },
        error: (error) => {},
        complete: () => {},
      }),
    );
  }

  deleteConfirmation(row) {}

  displayBr = (option) => (option && option.brname ? option.brname : '');

  displayCustomer = (option) => (option && option.name ? option.name : '');

  applyFilter = (event: any) => {
    this.datasource.filter = event.trim().toLowerCase();
  };

  EditPopUp(templateRef: TemplateRef<any>, row) {
    this.CreateAccBalance.reset();
    this.CreateAccBalance.get('CustName').setValue(row.Customer);
    this.CreateAccBalance.get('CurrAmt').setValue(row.AdvBal);
    this.CreateAccBalance.get('NewAmt').setValue('');
    const diffAmt = row.AdvBal - 0;
    this.selectedCustCode = row.Custcode;
    this.CreateAccBalance.get('diffAdjAmt').setValue(diffAmt);
    this.dialog.open(templateRef, {
      maxWidth: '400px',
      maxHeight: '630px',
      disableClose: true,
      autoFocus: false,
    });
  }

  newAmountChange() {
    this.CreateAccBalance.get('NewAmt')?.valueChanges.subscribe((newAmt) => {
      const advAmt = this.CreateAccBalance.get('CurrAmt').value;
      const diffAmt = advAmt - newAmt;
      this.CreateAccBalance.get('diffAdjAmt').setValue(diffAmt);
    });
  }

  exportexcel() {
    if (this.datasource.data.length > 0) {
      this.datasource.data.forEach((element) => {
        delete element.StatusRes;
      });
      this.muruganService.exportAsExcelFile(this.datasource.data, `${this.BranchName.value.brname}_CustOnAccBalance`);
    } else {
      this.muruganService.openSnackBar('No data available to export');
    }
  }

  keytab(e: any) {
    if (e.key.toLowerCase() === 'enter') {
      const { form } = e.target;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  isDesc = false;

  sort(property: any) {
    this.isDesc = !this.isDesc;

    this.column = property;

    this.direction = this.isDesc ? 1 : -1;
    if (this.direction === 1) {
      this.datasource.data.sort((x: any, y: any) => x.AdvBal - y.AdvBal);
    } else {
      this.datasource.data.sort((x: any, y: any) => y.AdvBal - x.AdvBal);
    }
  }

  ngOnDestroy () {
    this.subs.unsubscribe();
  };
}

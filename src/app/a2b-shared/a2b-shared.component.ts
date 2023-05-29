/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { Globals } from '../globals';
import { murgnService } from '../services/murgn.service';

@Component({
  selector: 'app-a2b-shared',
  templateUrl: './a2b-shared.component.html',
  styleUrls: ['./a2b-shared.component.scss'],
})
export class A2bSharedComponent implements OnInit {
  OverAllbranchLists: any = [];

  branchLists: any = [];

  overAllCustomerList: any = [];

  customerList: any = [];

  BranchName: FormControl = new FormControl(null, Validators.required);

  CustomerName: FormControl = new FormControl(null, Validators.required);

  loading: boolean = false;

  Titleheader = 'Title'

  displayedColumns: any = [
    'S.No',
    'Custcode',
    'Customer',
    'Action',
    'AdvBal',
  ];

  datasource = new MatTableDataSource([]);

  searchTemp: String = '';

  origin: String = '';

  private subs = new SubSink();

  CreateAccBalance = this.fbuilder.group({
    CustName: ['', Validators.required],
    CurrAmt: ['', Validators.required],
    NewAmt: ['', Validators.required],
    diffAdjAmt: ['', Validators.required],
  });

  constructor(
    public dialog: MatDialog,
    private fbuilder: FormBuilder,
    private global: Globals,
    private muruganService: murgnService,
  ) {}

  ngOnInit(): void {
    this.origin = this.global.gclientServer;

    if (this.origin === 'Client') {
      const BrObject = {
        brcode: this.global.gBrcode,
        brname: this.global.gBrname,
      };
      this.BranchName.setValue(BrObject);
      this.BranchName.disable();
    } else {
      this.getBranchName();
    }

    if (this.BranchName && this.CustomerName.valid) {
      this.getinitialData();
    }
    this.newAmountChange();
  }

  popUpSubmit(formValue) {
    console.log(formValue);

    if (this.CreateAccBalance.valid) {
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
            var2: this.CustomerName.value.code,
            var3: formValue.CurrAmt,
            var4: formValue.NewAmt,

          };
          this.customerList = [];
          this.subs.add(
            this.muruganService.CustomerOnAccountBalance(APIJson).subscribe({
              next: (response) => {
                if (response.length === 0) {
                  this.muruganService.openSnackBar('No Customer available');
                } else {
                  this.customerList = response.slice(0, 200);
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

newarr = [];

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
      this.muruganService.CustomerOnAccountBalance(APIJson).subscribe({
        next: (response) => {
          if (response.length === 0) {
            this.muruganService.openSnackBar('No Customer available');
          } else {
            this.customerList = response.slice(0, 200);
            this.newarr = this.customerList;
          }
        },
        error: (error) => {},
        complete: () => {},
      }),
    );
  }
}

BrSelected(event: any) {
  if (event.source.selected) {
    this.branchLists = [];
    this.datasource.data = [];
    this.CustomerName.setValue('');
    setTimeout(() => {
      document.getElementById('customerName')?.focus();
    }, 100);
  }
}

CustomerSelected(event: any) {
  if (event.source.selected) {
    this.customerList = [];
    this.checkvalidation();
  }
}

checkvalidation() {
  if (this.BranchName && this.CustomerName.valid) {
    setTimeout(() => {
      this.getinitialData();
    }, 100);
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
    this.muruganService.CustomerOnAccountBalance(APIJson).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganService.openSnackBar('No data available');
        } else {
          this.OverAllbranchLists = response;
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
    this.datasource.data = [];
    this.subs.add(
      this.muruganService.CustomerOnAccountBalance(APIJson).subscribe({
        next: (response) => {
          if (response.length === 0) {
            this.muruganService.openSnackBar('No data available');
          } else if (response[0].StatusRes === 'Success') {
            const newArrays = [];
            for (let index = 0; index < 5; index++) {
              newArrays.push(response[0]);
            }
            console.log(this.datasource.data = newArrays);
          } else {
            this.muruganService.openSnackBar(response[0].StatusRes);
          }
        },
        error: (error) => {},
        complete: () => {},
      }),
    );
  }
}

ViewMore(row) {}

deleteConfirmation(row) {}

  displayBr = (option) => (option && option.brname ? option.brname : '');

  displayCustomer = (option) => (option && option.name ? option.name : '');

  applyFilter = (event: any) => {
    this.datasource.filter = event.trim().toLowerCase();
  };

  EditPopUp(templateRef: TemplateRef<any>, row?) {
    // this.CreateAccBalance.get('CustName').setValue(row.Customer);
    // this.CreateAccBalance.get('CurrAmt').setValue(row.AdvBal);
    // this.CreateAccBalance.get('NewAmt').setValue('');
    // const diffAmt = row.AdvBal - 0;
    // this.CreateAccBalance.get('diffAdjAmt').setValue(diffAmt);
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

  keytab(e: any) {
    if (e.key.toLowerCase() === 'enter') {
      const { form } = e.target;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  ngOnDestroy () {
    this.subs.unsubscribe();
  };
}

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
import { Globals } from '../../globals';
import { murgnService } from '../../services/murgn.service';

@Component({
  selector: 'app-cust-on-accbalance',
  templateUrl: './cust-on-accbalance.component.html',
  styleUrls: ['./cust-on-accbalance.component.scss'],
})
export class CustOnACCBalanceComponent implements OnInit {
  OverAllbranchLists: any = [];

  branchLists: any = [];

  overAllCustomerList: any = [];

  customerList: any = [];

  BranchName: FormControl = new FormControl(null, Validators.required);

  CustomerName: FormControl = new FormControl(null, Validators.required);

  loading: boolean = false;

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
  }

  popUpSubmit() {
    if (this.CreateAccBalance.valid) {
      Swal.fire({
        title: 'Are you sure to Save ?',

        icon: 'warning',

        showCancelButton: true,

        confirmButtonColor: '#3085d6',

        cancelButtonColor: '#d33',

        confirmButtonText: 'Yes, Save it!',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('ads');
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
    console.log(this.BranchName.valid);

    if (this.BranchName.value
    && this.muruganService.checkTypeValitity(this.BranchName.value, 'Branch Name')) {
      const APIJson = {
        reqMainreq: 'LoadCustomerDetail',
        Usr: this.global.gUsrid,
        brcode: this.BranchName.value.brcode,
        var2: key,
      };

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
    console.log(this.BranchName.valid, this.CustomerName.valid);
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
              this.datasource.data = response;
            } else {
              this.muruganService.openSnackBar(response[0].StatusResponse);
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

  EditPopUp(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      maxWidth: '400px',
      maxHeight: '630px',
      disableClose: true,
      autoFocus: false,
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

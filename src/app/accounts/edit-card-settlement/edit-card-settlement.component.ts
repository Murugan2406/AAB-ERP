/* eslint-disable no-param-reassign */
/* eslint-disable no-self-assign */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray, FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { SubSink } from 'subsink';
import { DatePipe } from '@angular/common';
import { murgnService } from 'src/app/services/murgn.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common.service';

export interface Transaction {
  BankName: string;
  AccNo: string;
  TId: number;
  Mid: number;
  RunningFromTo: string;
  Amount: number;
  RunFrom: number;
  RunFrom2:number;
  RunTo: number;
}

@Component({
  selector: 'app-edit-card-settlement',
  templateUrl: './edit-card-settlement.component.html',
  styleUrls: ['./edit-card-settlement.component.scss'],
})

export class EditCardSettlementComponent implements OnInit {
  select = 'manualindenthome';

  dataview: boolean = false;

  branchValue = new FormControl('', Validators.required);

  pipe:DatePipe;

  dateValue = new FormControl(new Date(), Validators.required);

  filteredOptions: any;

  displayedColumns = ['SNo', 'BankName', 'AccNo', 'TId', 'Mid', 'RunningFromTo', 'Action', 'Amount'];

  totalAmount = 0;

  inputFormat = null;

  transactions: Transaction[] = [];

  VOForm: FormGroup;

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatTable) table: MatTable<Transaction>;

  private subs = new SubSink();

  loading = false;

  initial = true;

  constructor(
private router: Router,
private globals: Globals,
private muruganService: murgnService,
    public dialog: MatDialog,
private _formBuilder: FormBuilder,
private _snackBar: MatSnackBar,
private commonservice: CommonService,
  ) {

  }

  ngOnInit(): void {
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });
    const brObj = {
      StatusRes: "Success",
brcode: this.globals.gBrcode,
brname:this.globals.gBrname,
    }
    this.branchValue.setValue(brObj)

    this.formFields(this.transactions);
  }

  backNavigation() {
    if (this.select === 'viewpage') {
      this.dataview = false;
      this.select = 'idCardPreparation';
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  homeNavigate() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }

  selectBranchName(keyword) {
    this.subs.add(this.muruganService.getdata(keyword).subscribe(
      {
        next: (response) => {
          this.filteredOptions = response;
        },
        error: (error) => {
          Swal.fire({text:`${error.statusText} Entry kindly login again`})
        },
      },
    ));
  }

  displayFn(user: any): string {
    return user && user.brname ? user.brname : '';
  }

  selectBranchValues(value) {
    this.branchValue.value.brcode = value;
  }

  getTableList() {
    if (this.addValidation()) {
      this.loading = true;
      this.transactions = [];
      this.formFields(this.transactions);
      const date = moment(this.dateValue.value).format('YYYY-MM-DD');
      this.subs.add(this.muruganService.fetchTable(this.branchValue.value.brcode, date).subscribe({
        next: (response) => {
          this.transactions = response;
          this.formFields(this.transactions);
          // eslint-disable-next-line max-len
          this.totalAmount = this.transactions.map((t) => t.Amount).reduce((acc, value) => acc + Math.round((value) * 100) / 100, 0);
          this.table.renderRows();
          this.loading = false;
          this.initial = false;
        },
        error: (error) => {
          this.loading = false;
          Swal.fire({text:`${error.statusText} Entry kindly login again`})

        },
      }));
    }
  }

  openDialog() {
    if (this.addValidation()) {
      const dialogRef = this.dialog.open(EditDialogComponent, {
        width: '500px',
        panelClass: 'gDialogBox',
        disableClose: true,
        data: {
          brcode: this.branchValue.value.brcode,
        },
      });

      dialogRef.afterClosed().subscribe({
        next: (response) => {
          if (response) {
            this.loading = true;
            const control = this.VOForm.get('VORows') as FormArray;
            control.insert(0, this.initiateVOForm(response.data));
            this.dataSource = new MatTableDataSource(control.controls);
            this.dataSource.data = this.dataSource.data;
            this.totalAmount = this.dataSource.data.map((t) => t.value.Amount).reduce((acc, value) => acc + Math.round((value) * 100) / 100, 0);
            this.table.renderRows();
            this.loading = false;
          }
        },
        error: (error) => {
          Swal.fire({text:`${error.statusText} Entry kindly login again`})
        },
      });
    }
  }

  initiateVOForm(data): FormGroup {
    return this._formBuilder.group({
      BankName: new FormControl(data.BankName),
      TId: new FormControl(data.TId),
      AccNo: new FormControl(data.AccNo ? data.AccNo : ''),
      Mid: new FormControl(data.MId ? data.MId : ''),
      RunningFromTo: new FormControl(''),
      RunFrom2: new FormControl(0),
      Amount: new FormControl(Number(data.amount).toFixed(2)),
      RunFrom: new FormControl(data.RunFrom ? data.RunFrom : ''),
      RunTo: new FormControl(data.RunTo ? data.RunTo : ''),
      isEditable: new FormControl(true),

    });
  }

  EditAmount(VOFormElement, i) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
  }

  SaveAmount(VOFormElement, i) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    this.totalAmount = this.dataSource.data.map((t) => t.value.Amount).reduce((acc, value) => acc + Math.round((value) * 100) / 100, 0);
  }

  CancelEdit(VOFormElement, i) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }

  saveTableData() {
    if (this.addValidation()) {
      if (this.dataSource.data.length > 0) {
        const dateFormatted = this.dateValue.value.format(this.inputFormat);
        const selecteddate = moment(dateFormatted).format('YYYY-MM-DD');

        const newJson = this.VOForm.get('VORows').value;
        const modifiedJson = JSON.parse(JSON.stringify(newJson));
        const modifiedTableJson = JSON.parse(JSON.stringify(this.transactions));

        modifiedJson.forEach((element) => delete element.isEditable);
        modifiedTableJson.forEach((element) => delete element.StatusRes);

        if (_.isEqual(modifiedTableJson, modifiedJson)) {
          Swal.fire({text:'No changes '})
        } else if (this.transactions.length > 0) {
          this.subs.add(this.muruganService.saveTableApi(this.branchValue.value.brcode, selecteddate, modifiedJson).subscribe({
            next: (response) => {
              if (response[0].StatusRes === 'Success') {
                Swal.fire({text:'New changes updated successfully'})
              }else{
Swal.fire({text:response[0].StatusRes })
              }
            },
            error: (error) => {
              Swal.fire({text:`${error.statusText} `})

            },
          }));
        } else {
          Swal.fire({text:'please fetch existing records to add new entry'})
        }
      } else {
        Swal.fire({text:'There is no data to save'})
      }
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 1000,
    });
  }

  addValidation() {

    if (this.branchValue.value.brcode == null || this.branchValue.invalid) {
      Swal.fire({text:'please choose branch'})
      return false;
    }
    if (this.dateValue.value === '' || this.dateValue.invalid) {
      Swal.fire({text:'please choose date'})
      return false;
    }
    if (this.branchValue.value.brcode !== null && this.dateValue.value !== '') {
      return true;
    }
    Swal.fire({text:'please choose branch and date'})
    return false;
  }

  formFields(data) {
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array(data.map((val) => this._formBuilder.group({
        BankName: new FormControl(val.BankName ?? 'nm'),
        AccNo: new FormControl(val.AccNo ? val.AccNo : '' ?? 'nm'),
        TId: new FormControl(val.TId ?? 'nm'),
        Mid: new FormControl(val.Mid ? val.Mid : '' ?? 'nm'),
        RunningFromTo: new FormControl(val.RunningFromTo ?? 'nm'),
        RunFrom2: new FormControl(val.RunFrom2 ?? 'nm'),
        Amount: new FormControl(Number(val.Amount).toFixed(2) ?? 'nm'),
        RunFrom: new FormControl(val.RunFrom ?? 'nm'),
        RunTo: new FormControl(val.RunTo ?? 'nm'),
        isEditable: new FormControl(true ?? 'nm'),
      }))),
    });
    this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
    
  }

  searchValue = '';
  applyFilterDetailed(event) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  
  downloadXlOne(dataS) {
    if (dataS.length > 0) {
      this.commonservice.exportAsExcelFile(dataS, 'EdiCardSettlement');
    } else {
      this.commonservice.openSnackbar('No data to export', 'Ok', 1500);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

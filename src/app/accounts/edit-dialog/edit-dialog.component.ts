/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { murgnService } from 'src/app/services/murgn.service';
import { SubSink } from 'subsink';

export interface DialogData {
  [x: string]: number;
  region: any;
  set: any;
  PFMonth: any;
  Entries: any;
  BankName: any;
  TId: number;
  RunFrom: any;
  RunTo: any;
  Amount: number
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
  BankName: string;

  TId: number;

  RunFrom: string;

  RunTo: string;

  Amount: number;

  AccNo: string;

  MId: string;

  filteredOptions: any;

  filteredTids: any;

  private subs = new SubSink();

  constructor(
private fb: FormBuilder,
public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
private muruganService: murgnService,
  // eslint-disable-next-line no-empty-function
  ) { }

  EmployeeForm = this.fb.group({
    BankName: ['', Validators.required],
    TId: [{ value: '', disabled: true }, Validators.required],
    RunFrom: ['', Validators.required],
    RunTo: ['', Validators.required],
    Amount: ['', Validators.required],

  });

  // eslint-disable-next-line class-methods-use-this
  ngOnInit(): void {
  }

  keytab1(e: any, id: any):void {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        document.getElementById(id)?.focus();
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addnew(): void {
    if (this.EmployeeForm.valid) {
      if (this.AccNo === undefined && this.MId === undefined) {
        this.setMidAccNo(this.EmployeeForm.value.TId);
      }

      this.dialogRef.close({
        data: {
          TId: this.EmployeeForm.value.TId,
          RunFrom: this.EmployeeForm.value.RunFrom,
          RunTo: this.EmployeeForm.value.RunTo,
          amount: this.EmployeeForm.value.Amount,
          BankName: this.EmployeeForm.value.BankName,
          AccNo: this.AccNo,
          MId: this.MId,
        },
      });
    }
  }

  onSearchChange(keyword) {
    this.subs.add(this.muruganService.getBranch(keyword, this.data.brcode).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.filteredOptions = response;
        } else {
          this.muruganService.openSnackBar('No Data available');
        }
      },
      error: (error) => {
        this.muruganService.openSnackBar(error.statusText);
      },
    }));
  }

  onSearchTid(value) {
    if (this.EmployeeForm.get('TId').value) {
      this.subs.add(this.muruganService.getTid(this.data.brcode, this.EmployeeForm.get('BankName').value, value).subscribe({
        next: (data) => {
          if (data.length > 0) {
            this.filteredTids = data;
          } else {
            this.muruganService.openSnackBar('No Data available');
          }
        },
        error: (error) => {
          this.muruganService.openSnackBar(error.statusText);
        },
      }));
    } else {
      this.subs.add(this.muruganService.getTid(this.data.brcode, value, ' ').subscribe({
        next: (data) => {
          if (data.length > 0) {
            this.filteredTids = data;
          } else {
            this.muruganService.openSnackBar('No Data available');
          }
        },
        error: (error) => {
          this.muruganService.openSnackBar(error.statusText);
        },
      }));
    }
  }

  setValue(value) {
    this.EmployeeForm.get('TId').enable();
    this.onSearchTid(value);
  }

  setMidAccNo(value) {
    this.filteredTids.forEach((element: { [x: string]: string; }) => {
      if (element.Tid === value) {
        this.AccNo = element.Mid;
        this.MId = element.BankAcNo;
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { SubSink } from 'subsink';
import { murgnService } from 'src/app/services/murgn.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM-YYYY',
  },
  display: {
    dateInput: 'MMM-YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMM YYYY',
  },
};
@Component({
  selector: 'app-pfexemption',
  templateUrl: './pfexemption.component.html',
  styleUrls: ['./pfexemption.component.css', '../common.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PFExemptionComponent implements OnInit {
  select = 'manualindenthome';

  dataview: boolean = false;

  private subs = new SubSink();

  ActionOptions = ['ADD', 'REMOVE', 'VIEW'];

  Action = new FormControl();

  PFEXRegion = new FormControl();

  reportType = new FormControl('', Validators.required);

  PFEXRegionOptions :any[];

  emplyeeCode = new FormControl({ value: '', disabled: true }, Validators.required);

  emplyeename = new FormControl({ value: '', disabled: true }, Validators.required);

  EmlpoyeeNameFilter:any[];

  PFExemptedBranch = new FormControl({ value: '', disabled: true });

  PFExemptedDesignation = new FormControl({ value: '', disabled: true });

  loading = false;

  SuccessResponse = false;

  ResponseStatus: string;

  PFExeptionList :any[];

  displayedColumns: string[] = [];

  columnsToDisplay: string[] = this.displayedColumns.slice();

  toggleContent = false;

  constructor(
    private router: Router,
private globals: Globals,
private muruganService: murgnService,
    public dialog: MatDialog,
private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.subs.add(this.muruganService.preloadPFRegion('region').subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganService.openSnackBar('No data available');
        } else if (response[0].StatusRes === 'Success') {
          this.PFEXRegionOptions = response;
        } else {
          this.muruganService.openSnackBar(response[0]);
        }
      },
      error: (error) => {
        this.muruganService.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));
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

  ActionSelected(e) {
    if (e.source.selected) {
      setTimeout(() => {
        document.getElementById('Regions').focus();
      }, 100);
    }
  }

  RegionSelected(e, region) {
    if (e.source.selected) {
      if (this.Action.value !== 'VIEW') {
        this.emplyeeCode.enable();
        this.emplyeeCode.setValue('');
        this.PFExemptedBranch.setValue('');
        this.PFExemptedDesignation.setValue('');
        this.emplyeename.enable();
        setTimeout(() => {
          document.getElementById('empCode').focus();
        }, 100);
      }
    }
  }

  getEmployeeName(keyValue) {
    const APIJson = [
      {
        reqMainreq: 'PFEXEMPTEmpFilter',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: this.PFEXRegion.value,
        var7: keyValue,
      },
    ];
    this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganService.openSnackBar('No data available');
        } else if (response[0].StatusRes === 'Success') {
          this.EmlpoyeeNameFilter = response.slice(0, 100);
        } else {
          this.muruganService.openSnackBar(response[0].StatusRes);
        }
      },
      error: (error) => {
        this.muruganService.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));
  }

  getEmpDetails(e:any, empname:string) {
    if (e.source.selected) {
      const split = empname.split('-');
      const empCode = split[0];
      const empName = split[1];

      this.emplyeename.setValue(empname);
      const APIJson = [
        {
          reqMainreq: 'PFEXEMPTEmpDetails',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: this.PFEXRegion.value,
          var7: empCode,
        },
      ];
      this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
        next: (response) => {
          if (response.length === 0) {
            this.muruganService.openSnackBar('No data available');
          } else if (response[0].StatusRes === 'Success') {
            this.PFExemptedBranch.setValue(response[0].Branchname);
            this.PFExemptedDesignation.setValue(response[0].Designation);
            setTimeout(() => {
              document.getElementById('submit').focus();
            }, 100);
            document.getElementById('submit').focus();
          } else {
            this.muruganService.openSnackBar(response[0].StatusRes);
          }
        },
        error: (error) => {
          this.muruganService.openSnackBar(error.statusText);
        },
        complete: () => {},
      }));
    }
  }

  ADD(templateRef: TemplateRef<any>, actionName) {
    if (actionName !== 'VIEW') {
      if (this.RequiredCheck() && this.PfexRegionValidation() && this.empcodeValidation(this.emplyeeCode.value)) {
        this.loading = true;
        const split = this.emplyeeCode.value.split('-');
        const empCode = split[0];
        const empName = split[1];
        const APIJson = [
          {
            reqMainreq: '',
            Usr: this.globals.gUsrid,
            brcode: this.globals.gBrcode,
            var1: this.PFEXRegion.value,
            var7: empCode,
          },
        ];
        if (actionName === 'ADD') {
          APIJson[0].reqMainreq = 'PFEXEMPTAddEmp';
        } else if (actionName === 'REMOVE') {
          APIJson[0].reqMainreq = 'PFEXEMPTCancelEmp';
        }

        this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.length > 0) {
              if (response[0].StatusRes === 'Success') {
                this.SuccessResponse = true;
                if (actionName === 'ADD') {
                  this.ResponseStatus = 'Employee Added to PF Exemption';
                } else if (actionName === 'REMOVE') {
                  this.ResponseStatus = 'Employee Removed from PF Exemption';
                }

                this.dialog.open(templateRef, {
                  width: 'auto', maxHeight: '630px', disableClose: true,
                });
              } else {
                this.ResponseStatus = response[0].StatusRes;
                this.SuccessResponse = false;
                this.dialog.open(templateRef, {
                  width: 'auto', maxHeight: '630px', disableClose: true,
                });
              }
            } else {
              this.ResponseStatus = 'No data available';
              this.SuccessResponse = false;
              this.dialog.open(templateRef, {
                width: 'auto', maxHeight: '630px', disableClose: true,
              });
            }
          },
          error: (error) => {
            this.muruganService.openSnackBar(error.statusText);
          },
          complete: () => {},
        }));
      }
    } else if (actionName === 'VIEW') {
      if (this.ViewRequiredCheck() && this.PfexRegionValidation()) {
        this.loading = true;
        const APIJson = [
          {
            reqMainreq: 'PFEXEMPTView',
            Usr: this.globals.gUsrid,
            brcode: this.globals.gBrcode,
            var1: this.PFEXRegion.value,
            var5: this.reportType.value,
          },
        ];

        this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.length > 0) {
              if (response.find(({ Sno }) => Sno === '1')) {
                this.SuccessResponse = true;
                this.PFExeptionList = response;
                this.ResponseStatus = '';
                this.displayedColumns = ['Sno', 'Empcode', 'Empname', 'Branch', 'Designation'];
                this.toggleContent = true;
              } else {
                this.PFExeptionList = [];
                this.SuccessResponse = false;
                this.ResponseStatus = response[0].StatusRes;
                this.dialog.open(templateRef, {
                  width: 'auto', maxHeight: '630px', disableClose: true,
                });
              }
            } else {
              this.ResponseStatus = 'No data available';
              this.SuccessResponse = false;
              this.dialog.open(templateRef, {
                width: 'auto', maxHeight: '630px', disableClose: true,
              });
            }
          },
          error: (error) => {
            this.muruganService.openSnackBar(error.statusText);
          },
          complete: () => {},
        }));
      }
    }
  }

  empcodeValidation(empCode) {
    if (this.EmlpoyeeNameFilter.find(({ empname }) => empname === empCode)) {
      return true;
    }

    this.muruganService.openSnackBar('Please choose Valid Employee Details');
    return false;
  }

  PfexRegionValidation() {
    if (this.PFEXRegionOptions.find(({ pfregion }) => pfregion === this.PFEXRegion.value)) {
      return true;
    }
    this.muruganService.openSnackBar('Please choose Valid Region Value');
    return false;
  }

  RequiredCheck() {
    if (this.PFEXRegion.valid && this.emplyeeCode.valid) {
      return true;
    }
    this.muruganService.openSnackBar('Please Fill All the Fields');
    return false;
  }

  ViewRequiredCheck() {
    if (this.PFEXRegion.valid && this.reportType.valid) {
      return true;
    }
    this.muruganService.openSnackBar('Please Fill All the Fields');
    return false;
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  ontoggleContent():void {
    this.toggleContent = false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

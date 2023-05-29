/* eslint-disable import/no-duplicates */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import {
  Component, Input, OnInit, TemplateRef,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import moment from 'moment';
import { Moment } from 'moment';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { murgnService } from 'src/app/services/murgn.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { PGChallanDialogComponent } from '../pgchallan-dialog/pgchallan-dialog.component';

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
  selector: 'app-pfchallan',
  templateUrl: './pfchallan.component.html',
  styleUrls: ['./pfchallan.component.css', '../example.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PFChallanComponent implements OnInit {
  filteredOptions: Observable<any[]>;

  select = 'manualindenthome';

  dataview: boolean = false;

  displayedGroup = ['groupReducer', 'groupHeader'];

  PFMonth: any;

  PFMonthPrintFormat: any;

  private subs = new SubSink();

  date = new FormControl(moment(new Date()));

  todate = new FormControl(moment(new Date()));

  month = new FormControl(moment());

  datas: any[] = [];

  PFRegionValue = new FormControl({ value: null, disabled: true }, Validators.required);

  emplyeename = new FormControl(null, Validators.required);

  emplyeeCode = new FormControl(null, Validators.required);

  branchOptions: Observable<string[]>;

  PfTypeForm = new FormControl('');

  finYear = new FormControl(null, Validators.required);

  finYearList: any[];

  pfTypeOption: any[] = [];

  set2Report: any[] = [];

  PfType = 'PF Challan Regular';

  pyFormTypeOption: string[] = [];

  RegionOptions: any[] = [];

  branchNameOptions: string[] = [];

  TypeOptions: Observable<string[]>;

  branchValue = new FormControl({ value: null, disabled: true }, Validators.required);

  canOpenBranch: boolean = false;

  No_of_exempted;

  exempted_Amount = 0;

  branchCode;

  AllBranchList: Observable<string[]> | any;

  loading = false;

  openprintdialog = false;

  @Input() panelWidth: string | number;

  dataSource = [];

  form5dataSource = [];

  groupingColumn;

  reducedGroups = [];

  displayedColumns: string[] = [];

  columnsToDisplay: string[] = this.displayedColumns.slice();

  initialbranchList = [];

  TotalAdmnChrgAmt = 0;

  TotalAmt = 0;

  TotalEDLIAmt = 0;

  TotalPFEmployeeAmt = 0;

  TotalPFEmployerAmt = 0;

  TotalEpf = 0;

  TotalEps = 0;

  grandPFTotal = 0;

  // variable for Form3A
  periodFrom: any;

  periodTo: any;

  Estcode: '';

  brcode: '';

  PFUAN: '';

  nameSurname = '';

  fatherHusName = '';

  totalEmpShare = '';

  currentDate = new Date();

  companyName = '';

  add1 = '';

  add2 = '';

  add3 = '';

  city = '';

  pinCode = '';

  totalamt: '';

  totalEpf = '';

  totalempShare = '';

  totalPension = '';

  totalLop = '';

  toggleContent = false;

  form3AList: Observable<string[]> | any;

  // variables for form5
  form5List: Observable<string[]> | any;

  from5 = [{
    pfregion: '',
    code: '',
    supcode: '',
    Groupno: '',
    code1: '',
    Company: '',
    Address1: '',
    Address2: '',
    city: '',
    pincode: '',
    MonthYear: '',
  }];

  // variables for form5
  form6List: Observable<string[]> | any;

  from6 = [{
    pfregion: '',
    fromDate: '',
    toDate: '',
    add1: '',
    add2: '',
    add3: '',
    Company: '',
    city: '',
    pincode: '',
    TotalEPF: '',
    TotalEPFDiff: '',
    TotalEWages: '',
    TotalPensionFund: '',
  }];

  // variables for form5
  form10List: Observable<string[]> | any;

  from10 = [{
    company: '',
    Address1: '',
    Address2: '',
    City: '',
    pincode: '',
    code: '',
    MonthYear: '',
    code1: '',
    empname: '',
    Father_HusName: '',
    DOL: '',
    Reason: '',
  }];

  EmlpoyeeNameFilter: any[];

  EmployeeCode = null;

  leftValue = new FormControl('', Validators.required);

  ZeroValue = new FormControl('', Validators.required);

  constructor(
    public router: Router,
    private murgnservice: murgnService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public globals: Globals,
    private http: HttpClient,

  // eslint-disable-next-line no-empty-function
  ) { }

  ngOnInit(): void {
    this.initialdataFetching();
  }

  num:any[] = [1, 2, 3, 4];

  counter = 0;

  responserecieved = true;

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

  keytab1(e: any, id: any): void {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        document.getElementById(id)?.focus();
      }
    }
  }

  initialdataFetching() {
    this.subs.add(this.murgnservice.preloadPFRegion('region').subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.openSnackBar('No data available');
        } else if (response[0].StatusRes === 'Success') {
          this.RegionOptions = response;
        } else {
          this.openSnackBar(response[0]);
        }
      },
      error: (error) => {
        this.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));
    // request forgetting pf type
    this.subs.add(this.murgnservice.preloadPFRegion('pfType').subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.openSnackBar('No data available');
        } else if (response[0].StatusRes === 'Success') {
          this.pyFormTypeOption = response;
          response.forEach((element) => {
            this.pfTypeOption.push(element.val);
          });
        } else {
          this.openSnackBar(response[0]);
        }
      },
      error: (error) => {
        this.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));
  }

  checkbranchValue() {
    if (!this.PFRegionValue.value) {
      this.openSnackBar('please Select region to continue');
    }
  }

  selectBranchValues(value) {
    this.branchCode = value;
  }

  enableBranchValue(val) {
    if (this.canOpenBranch || this.PfType === 'Form 3A') {
      // this.PfTypeForm.setValue(val);
      this.branchValue.enable();
      this.branchNameOptions = [];
      this.branchValue.setValue('');
      this.subs.add(this.murgnservice.getregionbasedbranch(this.PFRegionValue.value).subscribe({
        next: (response) => {
          if (response.length === 0) {
            this.openSnackBar('No data available');
          } else if (response[0].StatusRes === 'Success') {
            this.AllBranchList = response;
            response.forEach((element) => {
              this.initialbranchList.push(element.BranchName);
            });
          } else {
            this.openSnackBar(response[0]);
          }
        },
        error: (error) => {
          this.openSnackBar(`${error.statusText} Entry kindly login again`);
        },
        complete: () => {},
      }));
    }
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.month.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.month.setValue(ctrlValue);
    datepicker.close();
  }

  FinYearSelected(event) {
    if (event.source.selected) {
      if (this.PfType === 'Form 3A') {
        setTimeout(() => {
          document.getElementById('empCode').focus();
        }, 100);
      }
    }
  }

  processFunc(templateRef: TemplateRef<any>) {
    if (this.PfType === 'Form 3A') {
      if (this.finYear.valid && this.emplyeename.valid && this.emplyeeCode.valid && this.pfTypeValidation() && this.empcodeValidation(this.emplyeename.value, this.emplyeeCode.value)) {
        this.loading = true;
        const finYear = this.finYear.value;
        this.subs.add(this.murgnservice.Form3A(finYear, this.emplyeeCode.value).subscribe({
          next: (response) => {
            this.loading = false;

            if (response.length > 0) {
              this.ifresposeReceived(templateRef, response, 'form3A');
            } else {
              this.openDialog('empty', response, 'empty');
            }
          },
          error: (error) => {
            this.loading = false;
            this.openSnackBar(error.statusText);
          },
          complete: () => {},
        }));
      } else {
        this.openSnackBar('Fill All the fields');
      }
    } else if (this.PfType === 'Form 10') {
      if (this.addValidation() && this.pfTypeValidation() && this.regionValidation()) {
        this.PFMonth = moment(this.month.value).format('YYYY-MM-01');
        const regionName = this.PFRegionValue.value;

        this.subs.add(this.murgnservice.Form10(this.PFMonth, regionName).subscribe({
          next: (response) => {
            if (response.length === 0 || response[0].StatusRes.includes('No records found')) {
              this.openDialog('empty', response, 'empty');
            } else {
              this.form10List = response;
              this.from10[0].company = response[0].company;
              this.from10[0].Address1 = response[0].Address1;
              this.from10[0].Address2 = response[0].Address2;
              this.from10[0].City = response[0].City;
              this.from10[0].pincode = response[0].pincode;
              this.from10[0].code = response[0].code;
              this.from10[0].MonthYear = response[0].MonthYear;
              this.toggleContent = true;
              // this.dialog.open(templateRef, { width: 'auto', maxHeight: '630px', disableClose: true });
            }

            this.loading = false;
          },
          error: (error) => {
            this.loading = false;
            this.openSnackBar(error.statusText);
          },
          complete: () => {},
        }));
      }
    } else {
      this.openprintdialog = false;
      if (!this.canOpenBranch && this.addValidation() && this.pfTypeValidation() && this.regionValidation()) {
        this.loading = true;
        this.PFMonth = moment(this.month.value).format('YYYY-MM-01');
        const regionName = this.PFRegionValue.value;

        this.subs.add(this.murgnservice.PFProcess(this.PFMonth, regionName, this.PfType).subscribe({
          next: (response) => {
            this.loading = false;
            if (this.PfType === 'PF Challan Report') {
              this.ifresposeReceived(templateRef, response, 'set2');
            } else {
              this.ifresposeReceived(templateRef, response, 'set1');
            }
          },
          error: (error) => {
            this.loading = false;
            this.openSnackBar(error.statusText);
          },
          complete: () => {},
        }));
      } else if (this.canOpenBranch && this.addValidation() && this.pfTypeValidation() && this.regionValidation() && this.branchValidation()) {
        this.PFMonth = moment(this.month.value).format('YYYY-MM-01');
        const regionName = this.PFRegionValue.value;

        const brname = this.branchValue.value;
        this.loading = true;

        const data = this.AllBranchList.filter((item) => item.BranchName === brname);
        this.subs.add(this.murgnservice.PFProcesswithBranch(this.PFMonth, regionName, this.PfType, data[0].Brcode).subscribe({
          next: (response) => {
            this.loading = false;
            this.murgnservice.exportAsExcelFile(response, `${this.PfType}_${regionName}_${brname}`);

            this.set2Report = response;
            this.ifresposeReceived(templateRef, response, 'set2');
          },
          error: (error) => {
            this.loading = false;
            this.openSnackBar(error.statusText);
          },
          complete: () => {},
        }));
      }
    }
  }

  processForm5(templateRef: TemplateRef<any>) {
    if (this.addValidation() && this.pfTypeValidation() && this.regionValidation()) {
      this.loading = true;
      const month = moment(this.month.value).format('YYYY-MM-01');
      const region = this.PFRegionValue.value;
      this.subs.add(this.murgnservice.Form5(month, region).subscribe({
        next: (response) => {
          this.loading = false;

          if (response.length > 0) {
            if (response[0].StatusRes.includes('No record found')) {
              this.openDialog('empty', response, 'empty');
            } else {
              this.form5List = response;
              this.from5[0].pfregion = response[0].pfregion;
              this.from5[0].code = response[0].code;
              this.from5[0].supcode = response[0].supcode;
              this.from5[0].Groupno = response[0].Groupno;
              this.from5[0].code1 = response[0].code1;
              this.from5[0].Company = response[0].Company;
              this.from5[0].Address1 = response[0].Address1;
              this.from5[0].Address2 = response[0].Address2;
              this.from5[0].city = response[0].city;
              this.from5[0].pincode = response[0].pincode;
              this.from5[0].MonthYear = response[0].MonthYear;
              this.toggleContent = true;
            }
          } else {
            this.openDialog('empty', response, 'empty');
          }
        },
        error: (error) => {
          this.loading = false;
          this.openSnackBar(error.statusText);
        },
        complete: () => {},
      }));
    }
  }

  processForm6A(templateRef: TemplateRef<any>) {
    if (this.addValidation() && this.WithWithouValidation() && this.pfTypeValidation() && this.regionValidation() && this.finYearValidation()) {
      this.loading = true;
      const finYear = this.finYear.value;
      const region = this.PFRegionValue.value;
      const leftValue = this.leftValue.value;
      const zerovalue = this.ZeroValue.value;
      this.subs.add(this.murgnservice.Form6A(finYear, region, leftValue, zerovalue).subscribe({
        next: (response) => {
          this.loading = false;

          if (response.length > 0) {
            if (response[0].StatusRes === 'Success') {
              this.form6List = response;
              this.from6[0].pfregion = response[0].pfregion;
              this.from6[0].fromDate = response[0].FrDt;
              this.from6[0].toDate = response[0].ToDt;
              this.from6[0].add1 = response[0].add1;
              this.from6[0].add2 = response[0].add2;
              this.from6[0].add3 = response[0].add3;
              this.from6[0].Company = response[0].company;
              this.from6[0].city = response[0].city;
              this.from6[0].pincode = response[0].pincode;
              this.from6[0].TotalEPF = response[0].TotalEPF;
              this.from6[0].TotalEPFDiff = response[0].TotalEPFDiff;
              this.from6[0].TotalEWages = response[0].TotalEWages;
              this.from6[0].TotalPensionFund = response[0].TotalPensionFund;
              this.toggleContent = true;
              // this.dialog.open(templateRef, { width: 'auto', maxHeight: '630px', disableClose: true });
            } else {
              this.openDialog('empty', response, 'empty');
            }
          } else {
            this.openDialog('empty', response, 'empty');
          }
        },
        error: (error) => {
          this.loading = false;
          this.openSnackBar(error.statusText);
        },
        complete: () => {},
      }));
    }
  }

  setEmpName(empname) {
    this.emplyeename.setValue(empname);
  }

  setEmpCode(empCode) {
    this.emplyeeCode.setValue(empCode);
  }

  setEmpNamebyEnter(e, empCode) {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        const empArr = this.EmlpoyeeNameFilter.find(({ empcode }) => empcode === empCode);
        this.emplyeename.setValue(empArr.empname);
      }
    }
  }

  setEmpCodebyEnter(e, empName) {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        const empArr = this.EmlpoyeeNameFilter.find(({ empname }) => empname === empName);
        this.emplyeeCode.setValue(empArr.empcode);
      }
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 1000,
    });
  }

  openDialog(header, datas, set) {
    this.dialog.open(PGChallanDialogComponent, {
      width: 'auto',
      data: {
        title: header,
        Entries: datas,
        region: this.PFRegionValue.value,
        PFMonth: this.PFMonth,
        PfType: this.PfType,
        set,
      },

    });
  }

  typeSelected(type) {
    this.PfType = type;
    this.PFRegionValue.enable();
    this.PFRegionValue.setValue('');
    if (this.PfType === 'Form 3A' || this.PfType === 'Form 6A') {
      this.subs.add(this.murgnservice.getFinYear().subscribe({
        next: (response) => {
          this.finYearList = response;
        },
        error: (error) => {
          this.openSnackBar(`${error.statusText} Entry kindly login again`);
        },
        complete: () => {},
      }));
    }

    if (type === 'PF Employee wise') {
      this.canOpenBranch = true;
    } else {
      this.canOpenBranch = false;
    }
  }

  getEmployeeName(keyValue) {
    this.subs.add(this.murgnservice.getEmployeeNameCode(keyValue).subscribe({
      next: (response) => {
        this.EmlpoyeeNameFilter = response.slice(0, 100);
      },
      error: (error) => {
        this.openSnackBar(`${error.statusText} Entry kindly login again`);
      },
      complete: () => {},
    }));
  }

  addValidation() {
    if (this.PFRegionValue.value && this.PfTypeForm.value) {
      return true;
    }
    this.openSnackBar('Fill all the fields');
    return false;
  }

  WithWithouValidation() {
    if (this.leftValue.valid && this.ZeroValue.valid && this.finYear.value) {
      return true;
    }
    this.openSnackBar('Fill all the fields');
    return false;
  }

  pfTypeValidation() {
    if (this.pfTypeOption.includes(this.PfTypeForm.value)) {
      return true;
    }
    this.openSnackBar('Please choose Valid PF Type');
    return false;
  }

  finYearValidation() {
    const finYear = this.finYear.value;

    if (this.finYearList.find(({ finyear }) => finyear === finYear)) {
      return true;
    }
    this.openSnackBar('Please choose Valid Fin Year Type');
    return false;
  }

  empcodeValidation(emplyeename, empCode) {
    if (this.EmlpoyeeNameFilter.find(({ empname }) => empname === emplyeename) && this.EmlpoyeeNameFilter.find(({ empcode }) => empcode === empCode)) {
      return true;
    }
    return false;
  }

  regionValidation() {
    const region:any = this.PFRegionValue.value;
    this.RegionOptions.find(({ pfregion }) => pfregion === region);
    if (this.RegionOptions.find(({ pfregion }) => pfregion === region)) {
      return true;
    }
    this.openSnackBar('Please choose Valid PF Region Value');
    return false;
  }

  branchValidation() {
    if (this.initialbranchList.includes(this.branchValue.value)) {
      return true;
    }
    this.openSnackBar('Please choose Valid Branch Value');
    return false;
  }

  ifresposeReceived(templateRef, response, set) {
    if (response.length > 0) {
      if (set === 'set1') {
        if (response[0].StatusRes) {
          this.No_of_exempted = response[0].NoofExempted ? response[0].NoofExempted : '';
          this.exempted_Amount = response[0].ExemptedAmount ? response[0].NoofExempted : 0;
          if (response[0].StatusRes.includes('UAN not found')) {
            this.openDialog('UAN not found', response, set);
          } else if (response[0].StatusRes === 'Success') {
            this.download(response);
          } else if (response[0].StatusRes.includes('Salary process')) {
            this.openDialog('Salary process', response, set);
          } else if (!response[0].Header && response[0].StatusRes.includes('Difference')) {
            this.openDialog('DifferenceFound', response, set);
          } else if (response[0].StatusRes === 'Difference Found' && response[0].Header) {
            this.openDialog('DifferenceWithValue', response, set);
          } else if (response[0].StatusRes.includes('already completed')) {
            this.openDialog('aleadyCompleted', response, set);
          } else if (response.length === 0 || response[0].StatusRes.includes('No records found')) {
            this.openDialog('empty', response, set);
          }
        }
      } else if (set === 'set2') {
        if (response[0].StatusRes) {
          this.No_of_exempted = response[0].NoofExempted ? response[0].NoofExempted : '';
          this.exempted_Amount = response[0].ExemptedAmount ? response[0].NoofExempted : 0;
          if (response[0].StatusRes.includes('UAN not found')) {
            this.printfunc(templateRef, response);
          } else if (response[0].StatusRes.includes('Success')) {
            this.TotalAdmnChrgAmt = response[0].TotalAdmnChrgAmt;
            this.TotalAmt = response[0].TotalAmt;
            this.TotalEDLIAmt = response[0].TotalEDLIAmt;
            this.TotalPFEmployeeAmt = response[0].TotalPFEmployeeAmt;
            this.TotalPFEmployerAmt = response[0].TotalPFEmployerAmt;
            this.TotalEpf = response[0].TotalEpf;
            this.TotalEps = response[0].TotalEps;
            this.printfunc(templateRef, response);
          } else if (response[0].StatusRes.includes('Salary process')) {
            this.openDialog('Salary process', response, set);
          } else if (!response[0].Header && response[0].StatusRes.includes('Difference')) {
            this.openDialog('DifferenceFound', response, set);
          } else if (response[0].StatusRes === 'Difference Found' && response[0].Header) {
            this.openDialog('DifferenceWithValue', response, set);
          } else if (response[0].StatusRes.includes('already completed')) {
            this.openDialog('aleadyCompleted', response, set);
          } else if (response.length === 0 || response[0].StatusRes.includes('No records found')) {
            this.openDialog('empty', response, set);
          }
        } else {
          this.TotalAdmnChrgAmt = response[0].TotalAdmnChrgAmt;
          this.TotalAmt = response[0].TotalAmt;
          this.TotalEDLIAmt = response[0].TotalEDLIAmt;
          this.TotalPFEmployeeAmt = response[0].TotalPFEmployeeAmt;
          this.TotalPFEmployerAmt = response[0].TotalPFEmployerAmt;
          this.TotalEpf = response[0].TotalEpf;
          this.TotalEps = response[0].TotalEps;

          this.printfunc(templateRef, response);
        }
      } else if (set === 'form3A') {
        this.Estcode = response[0].Estcode;
        this.brcode = response[0].brcode;
        this.PFUAN = response[0].PFUAN;
        this.periodFrom = moment(response[0].fromdate).format('MMM - YYYY');
        this.periodTo = moment(response[0].todate).format('MMM - YYYY');
        this.nameSurname = response[0].empname;
        this.fatherHusName = response[0].Father_HusName;
        this.totalEmpShare = response[0].Estcode;
        this.companyName = response[0].Company;
        this.add1 = response[0].Add1;
        this.add2 = response[0].Add2;
        this.add3 = response[0].Add3;
        this.city = response[0].City;
        this.pinCode = response[0].Pincode;
        this.totalamt = response[0].totalamt;
        this.totalEpf = response[0].totalpfamt;
        this.totalempShare = response[0].totalemployershare;
        this.totalPension = response[0].totalpension;
        this.totalLop = response[0].totallop;
        this.form3AList = response;

        this.printfunc(templateRef, response);
      }
    } else {
      this.openDialog('empty', response, set);
    }
  }

  /**
   * Groups the @param data by distinct values of a @param column
   * This adds group lines to the dataSource
   * @param reducedGroups is used localy to keep track of the colapsed groups
   */

  groupBy(column: string, data: any[], reducedGroups?: any[]) {
    if (!column) return data;
    let collapsedGroups = reducedGroups;
    if (!reducedGroups) collapsedGroups = [];
    const brNma = 'BranchName : ';
    const customReducer = (accumulator, currentValue) => {
      const currentGroup = currentValue[column];
      if (!accumulator[currentGroup]) {
        accumulator[currentGroup] = [{
          groupName: `${brNma} ${currentValue[column]}`,
          value: currentValue[column],
          isGroup: true,
          reduced: collapsedGroups.some((group) => group.value === currentValue[column]),
        }];
      }

      accumulator[currentGroup].push(currentValue);

      return accumulator;
    };
    const groups = data.reduce(customReducer, {});

    const groupArray = Object.keys(groups).map((key) => groups[key]);

    if (this.PfType === 'PF Employee wise' && groupArray.length > 1) {
      groupArray.forEach((element) => {
        const array = [{
          PF: element[1].SubTotalPFAmount,
          Empname: 'Sub Total',
          subtotal: true,
        }];
        element.push(array[0]);
        this.grandPFTotal = element[1].TotalPFAmount;
      });
    } else if (this.PfType === 'PF Challan Report') {
      groupArray.forEach((element) => {
        delete element[0];
      });
    }

    const flatList = groupArray.reduce((a, c) => a.concat(c), []);

    return flatList.filter((rawLine) => rawLine.isGroup
      || collapsedGroups.every((group) => rawLine[column] !== group.value));
  }

  isGroup(index, item): boolean {
    return item.isGroup;
  }

  reduceGroup(row) {
    row.reduced = !row.reduced;
    if (row.reduced) { this.reducedGroups.push(row); } else { this.reducedGroups = this.reducedGroups.filter((el) => el.value !== row.value); }

    this.dataSource = this.groupBy('Branchname', this.set2Report, this.reducedGroups);
  }

  download(response) {
    const fileContent = response.map((t) => t.TxtContent).reduce((acc, value) => `${acc}\n${value}`);
    const blob: Blob = new Blob([fileContent], { type: 'text' });

    const objectUrl: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = objectUrl;
    a.download = response[0].Header;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  }

  printfunc(templateRef, response) {
    if (this.PfType === 'Form 3A') {
      this.toggleContent = true;
      // this.dialog.open(templateRef, { width: 'auto', maxHeight: '630px', disableClose: true });
    } else {
      const data2 = { SNo: 10 };
      // const index = 1;
      response.forEach((element, index) => {
        element = Object.assign(element, { SNo: index + 1 });
      });
      this.PFMonthPrintFormat = moment(this.PFMonth).format('MMM - YYYY');
      this.openprintdialog = true;
      this.toggleContent = true;
      // this.dialog.open(templateRef, { width: 'auto', maxHeight: '630px', disableClose: true });
      if (this.PfType === 'PF Challan Report') {
        const Arry = [{
          SNo: '',
          Empcode: '',
          Empname: 'Grand Total',
          PFUAN: '',
          WorkingDays: '',
          EPFWAGES: response[0].TotalEpf,
          EPSWages: response[0].TotalEps,
          PFEmployeeAmt: response[0].TotalPFEmployeeAmt,
          PFEmployerAmt: response[0].TotalPFEmployerAmt,
          AdmnChrgAmt: response[0].TotalAdmnChrgAmt,
          EDLIAmt: response[0].TotalEDLIAmt,
          Total: response[0].TotalAmt,
        }];
        response.push(Arry[0]);
        this.displayedColumns = ['SNo', 'Empcode', 'Empname', 'PFUAN', 'WorkingDays', 'EPFWAGES', 'EPSWages', 'PFEmployeeAmt', 'PFEmployerAmt', 'AdmnChrgAmt', 'EDLIAmt', 'Total'];
        this.dataSource = this.groupBy('Branchname', response, this.reducedGroups);
      } else if (this.PfType === 'PF Employee wise') {
        this.displayedColumns = ['SNo', 'Empcode', 'Empname', 'PF'];
        this.dataSource = this.groupBy('Branchname', response, this.reducedGroups);
        const Arry = [{
          SNo: '',
          Empcode: '',
          Empname: 'Grand Total',
          PF: response[0].TotalPFAmount,
        }];
        this.dataSource.push(Arry[0]);
      }
    }
  }

  onNoClick() {
    this.dialog.closeAll();
  }

  ontoggleContent():void {
    this.toggleContent = false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

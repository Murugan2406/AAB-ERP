/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-constructor */
/* eslint-disable padded-blocks */
/* eslint-disable import/prefer-default-export */
// import { formatDate } from '@angular/common';
import {
  Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { murgnService } from 'src/app/services/murgn.service';
import { SubSink } from 'subsink';
import * as XLSX from 'xlsx';
import { cloneDeep } from 'lodash';
import {
  animate, style, transition, trigger,
} from '@angular/animations';
import Swal from 'sweetalert2';
import moment from 'moment';

type AOA = any[][];

@Component({
  selector: 'app-fin-book',
  templateUrl: './fin-book.component.html',
  styleUrls: ['./fin-book.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class FinBookComponent implements OnInit {

  displayedColumnS: string[] = ['name', 'email', 'mobile', 'state', 'address', 'gstNo'];

  searchTemp = '';

  select = 'manualindenthome';

  dataview: boolean = false;

  mainMenuSelected:string;

  private subs = new SubSink();

  companyName = new FormControl(null, Validators.required);

  displayedColumns = ['SNo', 'FbCode', 'FbName', 'FbDescrip', 'EffectiveDate', 'Createdby', 'Createdtime', 'Action'];

  displayedColumnsBRMapping = ['SNo', 'BrCode', 'BranchName'];

  displayedColumnsACCMapping = ['SNo', 'AcCode', 'AcName', 'Action'];

  InvaliddisplayedColumns = ['SNo', 'BrCode', 'BranchName'];

  BrMapFilterdisplayedColumns = ['SNo', 'TrnNo ', 'SaveMode', 'Mapedby', 'Mappedtime'];

  BrMapFilterList = new MatTableDataSource([]);

   invalidbranchCodev = [];

  CampNameOptionsList = []

  viewCampNameOptionsList = []

  CampNameOptions = [];

  @ViewChild(MatTable) table: MatTable<any>;

  @ViewChild(MatTable) viewtable: MatTable<any>;

  VOForm : FormGroup;

  transactions = new MatTableDataSource([]);

  companyCode = '';

  newCompanyCode = '';

  editable = false;

  loading = false;

  Brloading = false;

  fbCode = '';

  TableFilter:any = '';

  datasource = new MatTableDataSource([]);

  FinBookOptions = [];

  FinBookOptionsList = [];

  finbookName = new FormControl('', Validators.required);

  AccountCode = new FormControl('', Validators.required);

  gMenuInput = new FormControl('', Validators.required);

  AccountCodeoption = [];

  branchName = new FormControl('', Validators.required);

  BranchOption = [];

  selectedCmpCode:string;

  ViewselectedCmpCode:string;

  ViewselectedFbCode:string;

  selectedFbCode:string;

  selectedBrCode = 0;

  genders = ['Male', 'Female'];

  @ViewChild('BULKTABLE') BULKTABLE: ElementRef;

  datnew = ['SNo', 'BrCode', 'BranchName'];

  data = [];

  filterArray = [];

  viewFinbooklist = [];

  viewFinbooklistOptions = [];

  viewMapForm :FormGroup;

  MapOption = new FormControl('', Validators.required);

  onlyView :boolean;

  inputValue: any;

  inputCurrValue:any;

  existingDataSource = [];

  mapViewplaceholder ='';

  pipe :DatePipe = new DatePipe('en-US');

  HaveAccess:boolean = true;

  AccCode = new FormControl('', Validators.required);

  Title:String = '';

  MasterSaveCmpCode = ''

  BulkDataSource: any[] = [];

  InvalidText: string = '';

  HandIconClicked: boolean = false;

  viewMoreLoad: boolean = false;

  FBListArr: any[] = [];

  constructor(
private global: Globals,
    private router: Router,
    public dialog: MatDialog,
    private fbuilder: FormBuilder,
    private muruganservice: murgnService,

  ) {

  }

  CreateFBForm = this.fbuilder.group({
    campName: ['', Validators.required],
    FbCode: ['', Validators.required],
    FbName: ['', Validators.required],
    FbDescrip: ['', Validators.required],
    EffectiveDate: ['', Validators.required],

  });

  date = new Date();

  closePanel(event) {
    setTimeout(() => {
      document.getElementById('autocmpsingle').style.display = 'none';
    }, 100);

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
    this.global.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }

  viewForm() {
    this.viewMapForm = this.fbuilder.group({
      viewcmpName: [this.companyName.value, Validators.required],
      viewfbName: [this.finbookName.value, Validators.required],
      // eslint-disable-next-line max-len
      viewstartDate: [new Date(this.date.getFullYear(), this.date.getMonth(), 1), Validators.required],
      viewendDate: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.mainMenuSelected = this.global.gmainMenuSelected;

    if (this.mainMenuSelected) {
      this.getCompanyname();
      this.VOForm = this.fbuilder.group({
        VORows: this.fbuilder.array([]),
      });
      this.transactions = new MatTableDataSource([]);
    } else {
      this.router.navigate(['/dashboard']);
    }

    if (this.mainMenuSelected === 'mapBranchtoFinbook') {

      this.Title = 'Map Branch To FinBook';

      this.checkPermission('BrToFinBookRights');

      this.companyName.setValue(this.global.gUsrDefultCmpName);
      this.finbookName.setValue(this.global.gUsrDefultFbName);
      this.selectedCmpCode = this.global.gUsrDefultCmpCode;
      this.selectedFbCode = this.global.gUsrDefultFbCode;

      this.viewForm();

      this.viewMapForm.get('viewcmpName').setValue(this.global.gUsrDefultCmpName);
      this.viewMapForm.get('viewfbName').setValue(this.global.gUsrDefultFbName);
      this.ViewselectedFbCode = this.global.gUsrDefultFbCode;
      this.ViewselectedCmpCode = this.global.gUsrDefultCmpCode;

      this.getBrFinBook(this.selectedCmpCode, 'inputs');
      this.getBrFinBook(this.ViewselectedCmpCode, 'view');
      this.InvaliddisplayedColumns = ['SNo', 'BrCode', 'BranchName'];
      setTimeout(() => {
        this.initialDataLoad(this.selectedCmpCode, this.selectedFbCode);
      }, 100);

    } else if (this.mainMenuSelected === 'createFinBook') {
      this.checkPermission('FinBookRights');
      this.Title = 'Finance Book Master';

      this.companyName.setValue(this.global.gUsrDefultCmpName);
      this.companyName.setValue(this.global.gUsrDefultCmpName);
      this.companyCode = this.global.gUsrDefultCmpCode;
      this.newCompanyCode = this.global.gUsrDefultCmpCode;
      this.MasterSaveCmpCode = this.global.gUsrDefultCmpCode;
      this.ViewDateButton();
    } else if (this.mainMenuSelected === 'mapAcctoFinbook') {

      this.Title = 'Map Account Code To FinBook';

      this.checkPermission('AcCodeToFinBook');

      this.companyName.setValue(this.global.gUsrDefultCmpName);
      this.finbookName.setValue(this.global.gUsrDefultFbName);
      this.selectedCmpCode = this.global.gUsrDefultCmpCode;
      this.selectedFbCode = this.global.gUsrDefultFbCode;
      this.viewForm();
      this.viewMapForm.get('viewcmpName').setValue(this.global.gUsrDefultCmpName);
      this.viewMapForm.get('viewfbName').setValue(this.global.gUsrDefultFbName);
      this.ViewselectedFbCode = this.global.gUsrDefultFbCode;
      this.ViewselectedCmpCode = this.global.gUsrDefultCmpCode;
      this.InvaliddisplayedColumns = ['SNo', 'AcCode', 'AcName'];
      this.getBrFinBook(this.selectedCmpCode, 'inputs');

      this.getBrFinBook(this.ViewselectedCmpCode, 'view');

    }
  }

  checkPermission(Gmainselected) {
    const APIJson = {
      reqMainreq: 'UserRights',
      Usr: this.global.gUsrid,
      var1: Gmainselected,
    };

    this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganservice.openSnackBar('No data available');
        } else if (response[0].StatusResponse === 'Success') {
          if (response[0].Permission === 'Y') {
            this.HaveAccess = true;
          } else {
            this.HaveAccess = false;
          }

          if (this.HaveAccess) {
            this.displayedColumnsBRMapping = ['SNo', 'BrCode', 'BranchName', 'Action'];
            this.displayedColumns = ['SNo', 'FbCode', 'FbName', 'FbDescrip', 'EffectiveDate', 'Createdby', 'Createdtime', 'Action'];
            this.displayedColumnsACCMapping = ['SNo', 'AcCode', 'AcName', 'Action'];
          } else {
            this.displayedColumnsBRMapping = ['SNo', 'BrCode', 'BranchName'];
            this.displayedColumns = ['SNo', 'FbCode', 'FbName', 'FbDescrip', 'EffectiveDate', 'Createdby', 'Createdtime'];
            this.displayedColumnsACCMapping = ['SNo', 'AcCode', 'AcName'];
          }
        } else {
          this.muruganservice.openSnackBar(response[0].StatusResponse);
        }

      },
      error: (error) => {
        if (error.statusText === 'Unknown Error') {

          this.muruganservice.openSnackBar('Server not connected');
        } else {

          this.muruganservice.openSnackBar(error.statusText);
        }
      },
      complete: () => {},
    }));

  }

  getCompanyname() {

    const APIJson = {
      reqMainreq: 'CompanyName',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
    };

    this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganservice.openSnackBar('No data available');
        } else if (response[0].StatusResponse === 'Success') {
          this.CampNameOptions = response;
        } else {
          this.muruganservice.openSnackBar(response[0].StatusResponse);
        }
      },
      error: (error) => {
        if (error.statusText === 'Unknown Error') {

          this.muruganservice.openSnackBar('Server not connected');
        } else {

          this.muruganservice.openSnackBar(error.statusText);
        }
      },
      complete: () => {},
    }));

  }

  ViewDateButton() {

    // eslint-disable-next-line max-len
    if (this.companyName.valid && this.CampNameOptions.filter((cmp) => cmp.company === this.companyName.value)) {
      this.getFinBook(this.companyCode);
    } else {
      this.muruganservice.openSnackBar('Invalid company name');
    }
  }

  ViewDate(event, cmpCode) {
    if (event.source.selected) {
      setTimeout(() => {
        if (this.companyName.valid) {
          this.loading = true;
          this.companyCode = cmpCode;
          this.MasterSaveCmpCode = cmpCode;
          // this.newCompanyCode = cmpCode;
          this.getFinBook(cmpCode);
        } else {
          this.muruganservice.openSnackBar('Choose company name');
        }
      }, 100);
    }
  }

  newdataSource = new MatTableDataSource([]);

  getFinBook(cmpCode) {
    this.transactions = new MatTableDataSource([]);
    this.newdataSource = new MatTableDataSource([]);
    this.datasource.data = [];
    const APIJson = {
      reqMainreq: 'FinBookView',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: cmpCode,
    };
    this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.length === 0) {
          this.transactions = new MatTableDataSource(response);
          this.transactions = new MatTableDataSource([]);

          this.muruganservice.openSnackBar('No data available');
        } else if (response[0].StatusResponse === 'Success') {

          this.transactions = new MatTableDataSource(response);
          this.newdataSource.data = response;
          // this.datasource = response;
        } else {
          this.muruganservice.openSnackBar(response[0].StatusResponse);
        }
      },
      error: (error) => {
        this.loading = false;
        this.muruganservice.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));
  }

  editFinbook(finbook, templateRef:TemplateRef<any>) {
    this.fbCode = finbook.FbCode;
    this.MasterSaveCmpCode = finbook.CmpCode;
    this.CreateFBForm.reset();
    this.CreateFBForm.get('campName').setValue(this.companyName.value);
    this.CreateFBForm.get('campName').disable();
    this.CreateFBForm.get('FbCode').disable();
    this.CreateFBForm.get('FbCode').setValue(finbook.FbCode.toLocaleUpperCase());
    this.CreateFBForm.get('FbName').setValue(finbook.FbName.toLocaleUpperCase());
    this.CreateFBForm.get('FbDescrip').setValue(finbook.FbDescrip.toLocaleUpperCase());
    this.CreateFBForm.get('EffectiveDate').setValue(this.pipe.transform(finbook.EffectiveDate, 'yyyy-MM-dd'));
    this.editable = true;
    this.dialog.closeAll();
    this.dialog.open(templateRef, {
      maxWidth: '550px',
      maxHeight: '630px',
      disableClose: true,
      autoFocus: false,
      panelClass: 'gDialogBox',
    });
    this.getmasterFBlist();
  }

  deleteFinbook(finbook) {
    Swal.fire({

      title: 'Are you sure to delete?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, delete it!',

    }).then((result) => {

      if (result.isConfirmed) {

        const APIJson = {
          reqMainreq: 'DeleteFinBook',
          Usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          var1: finbook.FbCode,
          var2: this.companyCode,
        };
        this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
          next: (response) => {
            if (response.length === 0) {
              this.muruganservice.openSnackBar('No data available');
            } else if (response[0].StatusResponse === 'Success') {
              this.muruganservice.openSnackBar(`${finbook.FbName} was deleted successffuly`);
              this.getFinBook(this.companyCode);
            } else {

              Swal.fire({ title: response[0].StatusResponse });

            }
          },
          error: (error) => {
            this.muruganservice.openSnackBar(error.statusText);
          },
          complete: () => {},
        }));
      }
    });
  }

  exportexcel() {
    if (this.transactions.data.length > 0) {

      this.transactions.data.forEach((element) => {
        delete element.StatusResponse;
      });
      this.muruganservice.exportAsExcelFile(this.transactions.data, `finBook_${this.companyName.value}`);

    } else {
      this.muruganservice.openSnackBar('No data available to export');
    }
  }

  openDialog(templateRef: TemplateRef<any>):void {
    if (this.companyName.invalid) {
      Swal.fire({ text: 'Please enter company name' });
      return;
    }
    this.CreateFBForm.reset();
    this.CreateFBForm.enable();
    this.editable = false;
    this.CreateFBForm.get('campName').setValue(this.companyName.value);
    const date = new Date();
    const effDate = moment(date).format('DD-MMM-YYYY');
    this.CreateFBForm.get('EffectiveDate').setValue(this.pipe.transform(effDate, 'yyyy-MM-dd'));
    this.dialog.closeAll();
    this.dialog.open(templateRef, {
      maxWidth: '550px', maxHeight: '630px', disableClose: true, autoFocus: false, panelClass: 'gDialogBox',
    });

    this.getmasterFBlist();
  }

  getmasterFBlist() {
    const APIJson = {
      reqMainreq: 'FinBookView',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: this.MasterSaveCmpCode,
    };
    this.FBListArr = [];
    this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.length === 0) {
          this.FBListArr = [];

          this.muruganservice.openSnackBar('No data available');
        } else if (response[0].StatusResponse === 'Success') {
          this.FBListArr = response;

          // this.datasource = response;
        } else {
          this.muruganservice.openSnackBar(response[0].StatusResponse);
        }
      },
      error: (error) => {
        this.loading = false;
        this.muruganservice.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));

  }

  CloseDialog() {
    this.dialog.closeAll();
    this.CreateFBForm.reset();
    this.CreateFBForm.get('campName').enable();
    this.CreateFBForm.get('FbCode').enable();
  }

  checkCreatecmpValitity() {

    if (this.CampNameOptions.find(({ company }) => company === this.CreateFBForm.get('campName').value)) {
      return true;
    }
    this.muruganservice.openSnackBar('Please choose valid company name');
    return false;
  }

  submitDialog(type) {

    if (this.CreateFBForm.valid) {
      if (this.checkCreatecmpValitity()) {

        let title = ' ';

        if (type === 'save') {
          const fbcodeFound = this.transactions.data.find(({ FbCode }) => FbCode.toLocaleUpperCase() === this.CreateFBForm.value.FbCode.toLocaleUpperCase());
          if (fbcodeFound) {
            Swal.fire({ text: 'FBCode already exist' });
            return;
          }

          const FbNameFound = this.transactions.data.find(({ FbName }) => FbName.toLocaleUpperCase() === this.CreateFBForm.value.FbName.toLocaleUpperCase());
          if (FbNameFound) {
            Swal.fire({ text: 'FBName already exist' });
            return;
          }
        }

        if (!this.editable) {
          title = 'Are you sure to save?';
        } else {
          title = 'Are you sure to update?';
        }
        Swal.fire({

          title,

          icon: 'warning',

          showCancelButton: true,

          confirmButtonColor: '#3085d6',

          cancelButtonColor: '#d33',

          confirmButtonText: 'Yes, Save',

        }).then((result) => {

          if (result.isConfirmed) {

            this.CreateFBForm.get('campName').enable();
            this.CreateFBForm.get('FbCode').enable();

            let cmpCode = '';
            let NewOld = '';
            if (!this.editable) {
              cmpCode = this.newCompanyCode;
              NewOld = 'New';
            } else {
              cmpCode = this.companyCode;
              NewOld = 'Old';
            }
            const { FbCode } = this.CreateFBForm.value;
            const APIJson = {
              reqMainreq: 'S@/FinBookSave/E@',
              // brcode: this.global.gBrcode,
              Createdby: this.global.gUsrid,
              NewOld,
              getList: [{
                CmpCode: this.MasterSaveCmpCode,
                FbCode: FbCode ? FbCode.toLocaleUpperCase() : this.fbCode.toLocaleUpperCase(),
                FbName: this.CreateFBForm.value.FbName.toLocaleUpperCase(),
                FbDescrip: this.CreateFBForm.value.FbDescrip.toLocaleUpperCase(),
                EffectiveDate: this.pipe.transform(this.CreateFBForm.value.EffectiveDate, 'dd-MMM-yyyy'),
              }],

            };
            this.subs.add(this.muruganservice.SaveBookView(APIJson).subscribe({
              next: (response) => {
                if (response.length === 0) {
                  this.muruganservice.openSnackBar('No data available');
                } else if (response[0].StatusResponse === 'Success') {
                  this.dialog.closeAll();
                  if (!this.editable) {

                    this.muruganservice.openSnackBar('New record saved succesfully');
                    setTimeout(() => {
                      this.getFinBook(this.companyCode);
                    }, 100);

                  } else {
                    this.muruganservice.openSnackBar('Changes updated succesfully');

                    setTimeout(() => {
                      this.getFinBook(this.companyCode);
                    }, 100);
                  }

                } else {
                  this.muruganservice.openSnackBar(response[0].StatusResponse);
                }
              },
              error: (error) => {
                this.muruganservice.openSnackBar(error.statusText);
              },
              complete: () => {},
            }));

          }
        });
      }
    } else {
      this.muruganservice.openSnackBar('Please fill all the fields');
    }
  }

  applyFilter(event: any) {

    if (this.mainMenuSelected === 'createFinBook') {

      this.transactions.filter = event.trim().toLowerCase();

    } else if (this.mainMenuSelected === 'mapBranchtoFinbook') {

      this.datasource.filter = event.trim().toLowerCase();
    }

  }

  setCmpCode(event, cmpcode) {
    if (event.source.selected) {
      this.newCompanyCode = cmpcode;
      this.MasterSaveCmpCode = cmpcode;
      setTimeout(() => {
        this.getmasterFBlist();
        document.getElementById('fbCode')?.focus();
      }, 100);
    }
  }

  keytab1(e: any, id: any):void {

    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        const autoComplete:any = document.getElementsByClassName('gAutoCompleteContainer');

        for (let index = 0; index < autoComplete.length; index++) {
          autoComplete[index].classList.remove('mat-autocomplete-visible');
        }
        // autoComplete[0]?.classList.remove('mat-autocomplete-visible');
        setTimeout(() => {

          // autoComplete.forEach((element) => {
          //   element?.classList.remove('mat-autocomplete-visible');
          // });

          document.getElementById(id)?.focus();
        }, 100);
      }
    }
  }

  focusNext(id: any) {
    setTimeout(() => {
      document.getElementById(id)?.focus();

    }, 100);
  }
  //= ==================================Ts for Branch mapping=============================

  initialDataLoad(cmpCode, FbCode) {

    if (this.companyName.valid && this.finbookName.valid) {
      this.Brloading = true;
      const APIJson = {
        reqMainreq: 'Overall_BrToFinBookView',
        Usr: this.global.gUsrid,
        brcode: this.global.gBrcode,
        var1: cmpCode,
        var2: FbCode,
      };
      this.datasource.data = [];
      this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
        next: (data) => {
          this.onlyView = false;
          this.Brloading = false;
          let sample :any;
          if (data.length > 0) {
            if (data[0].StatusResponse === 'Success') {

              data.forEach((response) => {
                sample = {

                  CmpCode: response.CmpCode,
                  CmpName: response.CmpName,
                  FbCode: response.FbCode,
                  FbName: response.FbName,
                  BrCode: response.AssignBrcode,
                  BranchName: response.AssignBrcodeN,
                  Mapedby: response.Createdby,
                  Mappedtime: response.Createdtime,
                };

                this.datasource.data.push(sample);
                // this.table.renderRows();

              });
            } else {

              this.muruganservice.openSnackBar(data[0].StatusResponse);
            }
          } else {

            this.muruganservice.openSnackBar('No data found');
          }

        },
        error: (error) => {
          this.Brloading = false;
          this.muruganservice.openSnackBar(error.statusText);
        },
        complete: () => {},
      }));

    }
  }

  brCmpSelected(event, cmpCode, type) {

    if (event.source.selected) {

      setTimeout(() => {

        if (type === 'inputs') {
          this.finbookName.reset();
          this.branchName.reset();
          this.BranchOption = [];
          this.FinBookOptionsList = [];
          this.selectedCmpCode = cmpCode;
          this.datasource.data = [];
          this.CampNameOptionsList = [];
          this.getBrFinBook(cmpCode, type);
        } else {
          this.ViewselectedCmpCode = cmpCode;
          this.viewMapForm.get('viewfbName').reset();
          this.viewFinbooklistOptions = [];
          this.BrMapFilterList = new MatTableDataSource([]);
          this.getBrFinBook(cmpCode, type);
        }

      }, 100);
    }
  }

  brFbSelected(event, FbCode, type) {

    if (event.source.selected) {

      if (this.mainMenuSelected === 'mapBranchtoFinbook') {

        setTimeout(() => {

          if (type === 'inputs') {
            this.selectedFbCode = FbCode;
            this.BranchOption = [];
            document.getElementById('brCCenter')?.focus();
            this.viewMappedBranch('withoutdate');
            this.mapViewplaceholder = '';
            this.FinBookOptionsList = [];
            this.onlyView = false;
          } else {
            this.ViewselectedFbCode = FbCode;
            this.viewMappedBranch('withdate');

          }
        }, 100);
      } else if (this.mainMenuSelected === 'mapAcctoFinbook') {
        setTimeout(() => {

          if (type === 'inputs') {
            this.selectedFbCode = FbCode;
            this.AccCode.setValue('');
            this.BranchOption = [];
            document.getElementById('brCCenter')?.focus();
            this.initialAccCodeDataLoad(this.selectedCmpCode, this.selectedFbCode);
            this.mapViewplaceholder = '';
            this.onlyView = false;
            this.FinBookOptionsList = [];
          } else {
            this.ViewselectedFbCode = FbCode;
            this.viewMappedBranch('withdate');

          }
        }, 100);

      }
    }

  }

  branchSelected(event, brcode) {
    if (event.source.selected) {
      setTimeout(() => {
        if (this.finbookName.valid) {
          this.loading = true;
          this.selectedBrCode = brcode;
          document.getElementById('singleAdd')?.focus();
        } else {
          this.muruganservice.openSnackBar('Choose finbook name');
        }
      }, 100);
    }
  }

  getBrFinBook(cmpCode, type) {
    const APIJson = {
      reqMainreq: 'FinBookSearch',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: '',
      var2: cmpCode,
    };
    this.FinBookOptions = [];
    this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
      next: (response) => {
        if (response.length === 0) {

          this.muruganservice.openSnackBar('No finbook available for selected company');
        } else if (response[0].StatusResponse === 'Success') {

          setTimeout(() => {
            if (type === 'inputs') {
              document.getElementById('brFB')?.focus();
              this.FinBookOptions = response;
              if (this.mainMenuSelected === 'mapAcctoFinbook') {
                this.initialAccCodeDataLoad(this.selectedCmpCode, this.selectedFbCode);
              }
            } else {
              this.FinBookOptions = response;
              const allFinbok = [{
                FbCode: 'All',
                FbName: 'All',
                StatusResponse: 'Success',
              }];
              this.FinBookOptions.forEach((element) => {
                allFinbok.push(element);
              });

              this.viewFinbooklist = allFinbok;
              document.getElementById('viewBrFb')?.focus();

            }

          }, 100);
        } else {
          this.muruganservice.openSnackBar(response[0].StatusResponse);
        }
      },
      error: (error) => {
        this.muruganservice.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));
  }

  getBrcenterBook(keyValue, type) {
    if (this.selectedCmpCode) {
      let Reqmain;
      if (type === 'Branch') {
        Reqmain = 'Cmpcode_BranchSearch';

      } else {
        Reqmain = 'AccSearch';
      }
      const APIJson = {
        reqMainreq: Reqmain,
        Usr: this.global.gUsrid,
        brcode: this.global.gBrcode,
        var1: keyValue,
        var2: this.selectedCmpCode,

      };
      this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.length === 0) {
            this.BranchOption = [];
            this.muruganservice.openSnackBar(`No ${type} in selected company`);
          } else if (response[0].StatusResponse === 'Success') {
            this.BranchOption = response;

          } else {
            this.muruganservice.openSnackBar(response[0].StatusResponse);
          }
        },
        error: (error) => {
          this.muruganservice.openSnackBar(error.statusText);
        },
        complete: () => {},
      }));
    } else {
      this.muruganservice.openSnackBar('Please choose company name');
    }
  }

  openMapDialog(templateRef: TemplateRef<any>) {
    this.MapOption.setValue('');

    this.dialog.open(templateRef, {
      maxWidth: '750px', minWidth: '450px', maxHeight: '630px', disableClose: true, autoFocus: false, panelClass: 'gDialogBox',
    });

  }

  openMapOptionDialog(templateRef: TemplateRef<any>) {
    this.MapOption.setValue('single');
    this.BulkDataSource = [];
    this.invalidbranchCodev = [];
    this.inputValue = '';
    this.InvalidText = '';
    if (this.HandIconClicked) {
      if (this.mainMenuSelected === 'mapBranchtoFinbook') {
        this.initialDataLoad(this.selectedCmpCode, this.selectedFbCode);
        this.HandIconClicked = false;

      } else if (this.mainMenuSelected === 'mapAcctoFinbook') {
        this.initialAccCodeDataLoad(this.selectedCmpCode, this.selectedFbCode);
        this.HandIconClicked = false;

      }
    }
    this.AccCode.reset();
    this.branchName.reset();
    this.dialog.open(templateRef, {
      maxWidth: '650px', minWidth: '450px', maxHeight: '670px', disableClose: true, autoFocus: false, panelClass: 'gDialogBox',
    });

  }

  BulkAddTobranchMapTable(templateRef: TemplateRef<any>) {

    this.existingDataSource = [...this.datasource.data];
    const tableJson = [];
    let sample = {};
    this.invalidbranchCodev = [];
    // this.table.renderRows();
    let counter = 1;
    this.data.forEach((element, index) => {
      this.existingDataSource.forEach((e: any) => {
        if (e.BrCode == element.BrCode) {
          this.invalidbranchCodev.push(element);
        }

      });

    });

    this.data.forEach((element, index) => {
      if (element.BrCode && element.BranchName) {
        if (typeof Number(element.BrCode) === 'number' && Number(element.BrCode)) {
          sample = {
            CmpCode: this.selectedCmpCode,
            CmpName: this.companyName.value,
            FbCode: this.selectedFbCode,
            FbName: this.finbookName.value,
            BrCode: Number(element.BrCode),
            BranchName: element.BranchName,
            Mapedby: this.global.gUsrid,
          };
          tableJson.push(sample);
        } else {
          this.invalidbranchCodev.push(element);
        }
      } else {
        counter += 1;
        this.invalidbranchCodev.push(element);
      }
    });
    if (counter !== 1) {

      this.muruganservice.openSnackBar(`${counter - 1} Empty row(s) are removed`);
    }

    if (this.invalidbranchCodev.length > 0) {

      this.InvalidText = 'The following row(s) has invalid content / already exist, please check the file';
      this.BulkDataSource = this.invalidbranchCodev;
      return;
    }
    this.inputValue = '';
    if (tableJson.length > 0) {
      this.applyFilter('');
      this.InvalidText = 'Click save button to bulk map';
      this.BulkDataSource = tableJson;
      this.muruganservice.openSnackBar('data(s) fetched to table');
      this.inputValue = '';

      this.onlyView = true;
    }
  }

  checkcmpValitity() {

    if (this.CampNameOptions.find(({ company }) => company === this.companyName.value)) {
      return true;
    }
    this.muruganservice.openSnackBar('Please choose valid company name');
    return false;
  }

  checkViewcmpValitity() {

    if (this.CampNameOptions.find(({ company }) => company === this.viewMapForm.get('viewcmpName').value)) {
      return true;
    }
    this.muruganservice.openSnackBar('Please choose valid Company Name');
    return false;
  }

  checkViewFinbookValitity() {

    if (this.viewFinbooklist.find(({ FbName }) => FbName === this.viewMapForm.get('viewfbName').value)) {
      return true;
    }
    this.muruganservice.openSnackBar('Please choose valid Finbook Name');
    return false;
  }

  checkFinbookValitity() {

    if (this.FinBookOptions.find(({ FbName }) => FbName === this.finbookName.value)) {
      return true;
    }
    this.muruganservice.openSnackBar('Please choose valid Finbook Name');
    return false;
  }

  checkbranchValitity() {
    if (this.BranchOption.find(({ brname }) => brname === this.branchName.value)) {
      return true;
    }
    this.muruganservice.openSnackBar('Please choose valid Branch Name');
    return false;
  }

  checkAccCodeValitity() {
    if (this.BranchOption.find(({ AcName }) => AcName === this.AccCode.value.AcName)) {
      return true;
    }
    this.muruganservice.openSnackBar('Please choose valid Account Code ');
    return false;
  }

  browsebutton() {
    if (this.companyName.valid && this.finbookName.valid && this.MapOption.valid) {

      if (this.checkcmpValitity() && this.checkFinbookValitity()) {

        document.getElementById('import').click();
      }
    } else {
      this.muruganservice.openSnackBar('Please fill all the fields');
    }
  }

  onFileChange(evt: any, templateRef: TemplateRef<any>) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', raw: false });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = <AOA>XLSX.utils.sheet_to_json(ws);
      if (this.data.length > 0) {
        const Bankdata = this.data[0];
        const keys = Object.keys(Bankdata);
        this.datnew = keys;

      }
    };
    reader.readAsBinaryString(target.files[0]);
    if (this.mainMenuSelected === 'mapBranchtoFinbook') {
      setTimeout(() => {
        this.BulkAddTobranchMapTable(templateRef);
      }, 100);
    } else if (this.mainMenuSelected === 'mapAcctoFinbook') {
      setTimeout(() => {
        this.BulkAddToAcCodeMapTable(templateRef);
      }, 100);
    }

  }

  BulkAddToAcCodeMapTable(templateRef: TemplateRef<any>) {

    this.existingDataSource = [...this.datasource.data];
    const tableJson = [];
    let sample = {};
    this.invalidbranchCodev = [];
    // this.table.renderRows();
    let counter = 1;
    this.data.forEach((element, index) => {
      this.existingDataSource.forEach((e: any) => {

        if (e.AcCode == element.AcCode) {
          this.invalidbranchCodev.push(element);

        }

      });

    });

    this.data.forEach((element, index) => {
      if (element.AcCode && element.AcName) {

        sample = {
          CmpCode: this.selectedCmpCode,
          CmpName: this.companyName.value,
          FbCode: this.selectedFbCode,
          FbName: this.finbookName.value,
          AcCode: element.AcCode,
          AcName: element.AcName,
          Mapedby: this.global.gUsrid,
        };
        tableJson.push(sample);

      } else {
        counter += 1;
        this.invalidbranchCodev.push(element);
      }
    });
    if (counter !== 1) {

      this.muruganservice.openSnackBar(`${counter - 1} Empty row(s) are removed`);
    }

    if (this.invalidbranchCodev.length > 0) {
      this.InvalidText = 'The following row(s) has invalid content / already exist, please check the file';
      this.BulkDataSource = this.invalidbranchCodev;
      return;
    }
    this.inputValue = '';
    if (tableJson.length > 0) {
      this.applyFilter('');
      this.InvalidText = 'Click save button to bulk map';
      this.BulkDataSource = tableJson;
      this.muruganservice.openSnackBar('data(s) fetched to table');
      this.inputValue = '';

      this.onlyView = true;
    }
  }

  previewclick(type) {

    if (type === 'BRMap') {
      const arrayOfArray = [
        {
          SNo: '',
          BrCode: '',
          BranchName: '',
        },
      ];

      this.muruganservice.exportAsExcelFile(arrayOfArray, 'BrMapToFinbook');
    } else if (type === 'AccMap') {
      const arrayOfArray = [
        {
          SNo: '',
          AcCode: '',
          AcName: '',
        },
      ];

      this.muruganservice.exportAsExcelFile(arrayOfArray, 'AccMapToFinbook');
    }
  }

  UploadBranchmap(type) {
    this.onlyView = false;
    if (type === 'single') {

      if (this.companyName.valid && this.finbookName.valid && this.branchName.valid) {

        if (this.checkcmpValitity() && this.checkFinbookValitity() && this.checkbranchValitity()) {

          const addfound = this.datasource.data.filter((e: any) => (e.BrCode === this.selectedBrCode));

          if (addfound.length > 0) {
            this.muruganservice.openSnackBar(`${this.branchName.value} Is already Exist`);
            return;
          }
          this.BranchMapSave();

        }
      } else {
        this.muruganservice.openSnackBar('Please fill all the fields');
      }

    } else if (type === 'bulk') {
      if (this.companyName.valid && this.finbookName.valid) {

        if (this.checkcmpValitity() && this.checkFinbookValitity()) {
          if (this.BulkDataSource.length > 0) {
            this.BranchMapSave();
          } else {
            this.muruganservice.openSnackBar('No records to Save');
          }

        }

      } else {
        this.muruganservice.openSnackBar('Please fill all the fields');
      }
    }
  }

  UploadAccCodehmap(type) {
    this.onlyView = false;
    if (type === 'single') {

      if (this.companyName.valid && this.finbookName.valid && this.AccCode.valid) {

        if (this.checkcmpValitity() && this.checkFinbookValitity() && this.checkAccCodeValitity()) {

          const addfound = this.datasource.data.filter((e: any) => (e.AcCode === this.selectedBrCode));

          if (addfound.length > 0) {
            this.muruganservice.openSnackBar(`${this.AccCode.value.AcName} Is already Exist`);
            return;

          }
          this.AccCodeMapSave();

        }
      } else {
        this.muruganservice.openSnackBar('Please fill all the fields');
      }
    } else if (type === 'bulk') {
      if (this.companyName.valid && this.finbookName.valid) {

        if (this.checkcmpValitity() && this.checkFinbookValitity()) {
          if (this.BulkDataSource.length > 0) {
            this.AccCodeMapSave();
          } else {
            this.muruganservice.openSnackBar('No records to Save');
          }

        }

      } else {
        this.muruganservice.openSnackBar('Please fill all the fields');
      }
    }

  }

  AccCodeMapSave() {
    Swal.fire({

      title: 'Are you sure to save?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, Save',

    }).then((result) => {

      if (result.isConfirmed) {
        let savejson = [];
        let newArr = [];
        let type :String;
        if (this.MapOption.value === 'single') {
          type = 'Ind';
          savejson = [{
            CmpCode: this.selectedCmpCode,
            FbCode: this.selectedFbCode,
            FbName: this.finbookName.value,
            AcCode: this.selectedBrCode,
          }];
          this.AccMapApiCallFunc('Ind', savejson, newArr);

        } else if (this.MapOption.value === 'bulk') {

          savejson = this.BulkDataSource;

          newArr = cloneDeep(this.BulkDataSource);
          type = 'Bulk';
          savejson.forEach((element) => {
            delete element.CmpName;
            delete element.AcName;
            delete element.Mapedby;
            element = Object.assign(element, { FbCode: element.FbCode });
            // delete element.FbCode;
            element = Object.assign(element, { FbName: element.FbName });
            // delete element.FbName;
            element = Object.assign(element, { AcCode: element.AcCode });
            // delete element.BrCode;

          });
          this.AccMapApiCallFunc('bulk', savejson, newArr);

        }
      }

    });
  }

  AccMapApiCallFunc(type, savejson, newArr) {
    const APIJson = {
      reqMainreq: 'S@/AccCodeToFinBook/E@',
      usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      Trntype: type,
      getList: savejson,

    };

    this.subs.add(this.muruganservice.SaveBookView(APIJson).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.datasource.data = newArr;

          // this.table.renderRows();
          this.muruganservice.openSnackBar('No data available');
        } else if (response[0].StatusResponse === 'Success') {
          this.dialog.closeAll();
          if (this.MapOption.value === 'single') {
            this.branchName.reset();
          }
          this.muruganservice.openSnackBar('Account Code mapped successfully');

          setTimeout(() => {
            this.initialAccCodeDataLoad(this.selectedCmpCode, this.selectedFbCode);
          }, 100);
        } else if (response[0].StatusResponse.includes('Check')) {
          this.datasource.data = newArr;

          // this.table.renderRows();

          Swal.fire({ title: `Records are not saved, Please ${response[0].StatusResponse}`, icon: 'warning' });
          this.onlyView = true;
        } else {
          Swal.fire({ title: response[0].StatusResponse });

        }
      },
      error: (error) => {
        this.muruganservice.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));
  }

  BranchMapSave() {
    Swal.fire({

      title: 'Are you sure to save?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, Save',

    }).then((result) => {

      if (result.isConfirmed) {
        let savejson = [];
        let newArr = [];
        let type :String;
        if (this.MapOption.value === 'single') {
          type = 'Ind';
          savejson = [{
            CmpCode: this.selectedCmpCode,
            FbCode: this.selectedFbCode,
            FbName: this.finbookName.value,
            AssignBrcode: this.selectedBrCode,
          }];

        } else if (this.MapOption.value === 'bulk') {

          savejson = this.BulkDataSource;

          newArr = cloneDeep(this.BulkDataSource);
          type = 'Bulk';
          savejson.forEach((element) => {
            delete element.CmpName;
            delete element.BranchName;
            delete element.Mapedby;
            element = Object.assign(element, { FbCode: element.FbCode });
            // delete element.FbCode;
            element = Object.assign(element, { FbName: element.FbName });
            // delete element.FbName;
            element = Object.assign(element, { AssignBrcode: element.BrCode });
            delete element.BrCode;

          });

        }
        const APIJson = {
          reqMainreq: 'S@/MapBrFinBook/E@',
          usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          Trntype: type,
          getList: savejson,

        };

        this.subs.add(this.muruganservice.SaveBookView(APIJson).subscribe({
          next: (response) => {
            if (response.length === 0) {
              this.datasource.data = newArr;

              // this.table.renderRows();
              this.muruganservice.openSnackBar('No data available');
            } else if (response[0].StatusResponse === 'Success') {
              this.dialog.closeAll();
              if (this.MapOption.value === 'single') {
                this.branchName.reset();
              }
              this.muruganservice.openSnackBar('Branch(s) mapped successfully');

              setTimeout(() => {
                this.viewMappedBranch('withoutdate');
              }, 100);
            } else if (response[0].StatusResponse.includes('Check')) {
              this.datasource.data = newArr;

              // this.table.renderRows();

              Swal.fire({ title: `Records are not saved, Please ${response[0].StatusResponse}`, icon: 'warning' });
              this.onlyView = true;
            } else {
              this.muruganservice.openSnackBar(response[0].StatusResponse);
            }
          },
          error: (error) => {
            this.muruganservice.openSnackBar(error.statusText);
          },
          complete: () => {},
        }));
      } else {
        this.muruganservice.openSnackBar('No Data to save');
      }

    });
  }

  viewMappedBranch(type) {
    let APIJson :any;

    if (type === 'withoutdate') {

      if (this.companyName.valid && this.finbookName.valid) {

        if (this.checkcmpValitity() && this.checkFinbookValitity()) {
          this.Brloading = true;
          APIJson = {
            reqMainreq: 'Overall_BrToFinBookView',
            Usr: this.global.gUsrid,
            brcode: this.global.gBrcode,
            var1: this.selectedCmpCode,
            var2: this.selectedFbCode,
          };

          this.datasource.data = [];
          // this.table.renderRows();
          this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
            next: (data) => {

              this.onlyView = false;
              this.Brloading = false;
              let sample :any;
              if (data.length > 0) {
                if (data[0].StatusResponse === 'Success') {

                  data.forEach((response) => {
                    sample = {

                      CmpCode: response.CmpCode,
                      CmpName: response.CmpName,
                      FbCode: response.FbCode,
                      FbName: response.FbName,
                      BrCode: response.AssignBrcode,
                      BranchName: response.AssignBrcodeN,
                      Mapedby: response.Createdby,
                      Mappedtime: response.Createdtime,
                    };

                    this.datasource.data.push(sample);
                    // this.table.renderRows();
                    this.applyFilter('');

                  });
                } else {

                  this.muruganservice.openSnackBar(data[0].StatusResponse);
                }
              } else {

                this.muruganservice.openSnackBar('No data found');
              }

            },
            error: (error) => {
              this.Brloading = false;
              this.muruganservice.openSnackBar(error.statusText);
            },
            complete: () => {},
          }));

        }

      } else {
        this.muruganservice.openSnackBar('Please fill all the fields');
      }

    }

    if (type === 'withdate') {
      if (this.viewMapForm.get('viewcmpName').valid && this.viewMapForm.get('viewfbName').valid) {

        if (this.checkViewcmpValitity() && this.checkViewFinbookValitity()) {
          let reqMain;
          if (this.mainMenuSelected === 'mapAcctoFinbook') {
            reqMain = 'AcToFinBookView';
          } else if (this.mainMenuSelected === 'mapBranchtoFinbook') {
            reqMain = 'BrToFinBookView';
          }
          APIJson = {
            reqMainreq: reqMain,
            Usr: this.global.gUsrid,
            brcode: this.global.gBrcode,
            var1: this.ViewselectedCmpCode,
            var2: this.pipe.transform(this.viewMapForm.value.viewstartDate, 'dd-MMM-yyyy'),
            var3: this.pipe.transform(this.viewMapForm.value.viewendDate, 'dd-MMM-yyyy'),
            var4: this.ViewselectedFbCode,

          };
          this.BrMapFilterList = new MatTableDataSource([]);
          this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
            next: (data) => {

              let sample :any;
              if (data.length > 0) {
                if (data[0].StatusResponse === 'Success') {

                  data.forEach((response) => {
                    sample = {
                      TrnNo: response.TrnNo,
                      TrnType: response.TrnType,
                      tdate: response.tdate,
                      Mapedby: response.Createdby,
                      Mappedtime: response.Createdtime,
                    };
                    this.BrMapFilterList.data.push(sample);
                    this.BrMapFilterdisplayedColumns = ['SNo', 'Action', 'TrnNo', 'TrnType', 'Mapedby', 'Mappedtime'];
                    // eslint-disable-next-line no-underscore-dangle
                    this.BrMapFilterList._updateChangeSubscription();
                    this.viewtable.renderRows();

                  });
                } else {

                  this.muruganservice.openSnackBar(data[0].StatusResponse);
                }
              } else {

                this.muruganservice.openSnackBar('No data found');
              }

            },
            error: (error) => {
              this.muruganservice.openSnackBar(error.statusText);
            },
            complete: () => {},
          }));
        }
      } else {
        this.muruganservice.openSnackBar('Please fill all the fields');
      }
    }

  }

  RemoveBrMapFinbook(BrCode) {
    Swal.fire({

      title: 'Are you sure to delete?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, delete it!',

    }).then((result) => {

      if (result.isConfirmed) {
        if (this.onlyView) {
          if (this.mainMenuSelected === 'mapAcctoFinbook') {
            this.datasource.data = this.datasource.data.filter((u) => u.AcCode !== BrCode);
          } else {
            this.datasource.data = this.datasource.data.filter((u) => u.BrCode !== BrCode);
          }

        } else {
          let selectedObj;
          let APIJson;
          if (this.mainMenuSelected === 'mapAcctoFinbook') {
            selectedObj = this.datasource.data.filter((u) => u.AcCode === BrCode);
            APIJson = {
              reqMainreq: 'DeleteAccCodeToFinBook',
              usr: this.global.gUsrid,
              var1: selectedObj[0].FbCode,
              var2: selectedObj[0].CmpCode,
              var3: selectedObj[0].AcCode,
            };
          } else {
            selectedObj = this.datasource.data.filter((u) => u.BrCode === BrCode);
            APIJson = {
              reqMainreq: 'DeleteBrToFinBook',
              usr: this.global.gUsrid,
              var1: selectedObj[0].FbCode,
              var2: selectedObj[0].CmpCode,
              var3: selectedObj[0].BrCode,
            };
          }

          this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
            next: (response) => {

              if (response.length > 0) {

                if (response[0].StatusResponse === 'Success') {
                  if (this.mainMenuSelected === 'mapAcctoFinbook') {
                    this.muruganservice.openSnackBar(`${selectedObj[0].AcName} Was deleted successfully`);
                    this.initialAccCodeDataLoad(this.selectedCmpCode, this.selectedFbCode);
                  } else {
                    this.muruganservice.openSnackBar(`${selectedObj[0].BranchName} Was deleted successfully`);
                    this.viewMappedBranch('withoutdate');
                  }

                } else {
                  this.muruganservice.openSnackBar(response[0].StatusResponse);
                }
              }

            },
            error: (error) => {
              this.muruganservice.openSnackBar(error.statusText);
            },
            complete: () => {},
          }));
        }

      }
    });
  }

  viewMoreBRMap(element) {
    let ReqMain;
    this.viewMoreLoad = true;

    if (this.mainMenuSelected === 'mapAcctoFinbook') {
      ReqMain = 'AcToFinBookDets';
    } else {
      ReqMain = 'BrToFinBookDets';
    }
    const APIJson = {
      reqMainreq: ReqMain,
      usr: this.global.gUsrid,
      var1: element.tdate,
      var2: element.TrnNo,
    };
    this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
      next: (response) => {

        this.companyName.setValue(response[0].CmpName);
        this.finbookName.setValue(response[0].FbName);
        this.selectedCmpCode = response[0].CmpCode;
        this.selectedFbCode = response[0].FbCode;
        this.dialog.closeAll();
        if (response.length > 0) {

          if (response[0].StatusResponse) {

            if (response[0].StatusResponse === 'Success') {
              this.HandIconClicked = true;
              let sample;
              this.datasource.data = [];

              if (this.mainMenuSelected === 'mapAcctoFinbook') {
                this.datasource.data = response;
                // this.table.renderRows();
              } else {
                response.forEach((res) => {
                  sample = {

                    CmpCode: res.CmpCode,
                    CmpName: res.CmpName,
                    FbCode: res.FbCode,
                    FbName: res.FbName,
                    BrCode: res.AssignBrcode,
                    BranchName: res.AssignBrcodeN,
                    Mapedby: res.Createdby,
                    Mappedtime: res.Createdtime,
                  };

                  this.datasource.data.push(sample);
                  // this.table.renderRows();

                });
              }
              this.viewMoreLoad = false;

            } else {
              this.viewMoreLoad = false;
              this.muruganservice.openSnackBar(response[0].StatusResponse);
            }

          } else {
            this.viewMoreLoad = false;
            this.muruganservice.openSnackBar(response[0]);
          }
        } else {
          this.viewMoreLoad = false;
          this.muruganservice.openSnackBar('No data Available');
        }

      },
      error: (error) => {
        this.viewMoreLoad = false;
        this.muruganservice.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));

  }

  XLExportBranchMapTable() {

    if (this.datasource.data.length > 0) {

      this.muruganservice.exportAsExcelFile(this.datasource.data, 'branchMapToFinbook');

    } else {
      this.muruganservice.openSnackBar('No data To Export');
    }
  }

  XLExportMasterFinbook() {

    if (this.transactions.data.length > 0) {

      this.muruganservice.exportAsExcelFile(this.transactions.data, 'FinbookMaster');

    } else {
      this.muruganservice.openSnackBar('No data To Export');
    }
  }

  filterCmp(key) {
    key = key.toLocaleUpperCase();
    this.CampNameOptionsList = this.CampNameOptions.filter((option) => option.company.toLocaleUpperCase().includes(key));
  }

  filterViewCmp(key) {
    key = key.toLocaleUpperCase();
    const startsWithN = this.CampNameOptions.filter((option) => option.company.toLocaleUpperCase().includes(key));

    this.viewCampNameOptionsList = startsWithN;
  }

  checkcmpselected(key) {
    if (this.companyName.invalid) {
      this.muruganservice.openSnackBar('Please choose company name');
    } else if (!this.selectedCmpCode) {
      this.muruganservice.openSnackBar('Please enter valid company name');

    } else if (this.companyName.valid && this.selectedCmpCode) {
      key = key.toLocaleUpperCase();
      // eslint-disable-next-line max-len
      const startsWithN = this.FinBookOptions.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
      this.FinBookOptionsList = startsWithN;
    }

  }

  filterViewFb(key) {

    if (this.viewMapForm.get('viewcmpName').invalid) {
      this.muruganservice.openSnackBar('Please choose company name');
    } else if (!this.ViewselectedCmpCode) {
      this.muruganservice.openSnackBar('Please enter valid company name');

    } else if (this.viewMapForm.get('viewcmpName').valid && this.ViewselectedCmpCode) {
      key = key.toLocaleUpperCase();

      // eslint-disable-next-line max-len
      const startsWithN = this.viewFinbooklist.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
      this.viewFinbooklistOptions = startsWithN;
    }

  }

  // ================= Account Code Ts file ========================================================

  initialAccCodeDataLoad(cmpCode, FbCode) {

    if (this.companyName.valid && this.finbookName.valid) {

      if (this.checkcmpValitity() && this.checkFinbookValitity()) {

        this.Brloading = true;
        const APIJson = {
          reqMainreq: 'Overall_AcToFinBookView',
          Usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          var1: cmpCode,
          var2: FbCode,
        };
        this.datasource.data = [];
        this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
          next: (data) => {
            this.onlyView = false;
            this.Brloading = false;
            let sample :any;
            if (data.length > 0) {
              if (data[0].StatusResponse === 'Success') {
                data.forEach((response) => {
                  sample = {
                    CmpCode: response.CmpCode,
                    CmpName: response.CmpName,
                    FbCode: response.FbCode,
                    FbName: response.FbName,
                    BrCode: response.AssignBrcode,
                    BranchName: response.AssignBrcodeN,
                    Mapedby: response.Createdby,
                    Mappedtime: response.Createdtime,
                  };
                });
                this.datasource.data = data;
                // this.table.renderRows();
              } else {

                this.muruganservice.openSnackBar(data[0].StatusResponse);
              }
            } else {

              this.muruganservice.openSnackBar('No data found');
            }

          },
          error: (error) => {
            this.Brloading = false;
            this.muruganservice.openSnackBar(error.statusText);
          },
          complete: () => {},
        }));
      }

    } else {
      this.muruganservice.openSnackBar('Please fill all the fields');
    }

  }

  onTabChanged = (tabIndex:Number) => {
    switch (tabIndex) {
      case 0: {
        this.MapOption.setValue('single');
        break;
      }
      case 1: {
        this.MapOption.setValue('bulk');

        break;
      }

      default: {
        break;
      }
    }
  }

  displayFn(user: any): string {
    return user && user.AcName ? `${user.AcName}-${user.AcCode}` : '';
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

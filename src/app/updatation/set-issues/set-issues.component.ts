/* eslint-disable linebreak-style */
/* eslint-disable no-useless-concat */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
/* eslint-disable new-cap */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-classes-per-file */
import {
  Component, OnInit, OnDestroy, ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { formatDate } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonAuthourityComponent } from '../common-authourity/common-authourity.component';
import { InventoryService } from '../services/inventory.service';

declare let $: any;

@Component({
  selector: 'app-set-issues',
  templateUrl: './set-issues.component.html',
  styleUrls: ['./set-issues.component.scss'],
})
export class SetIssuesComponent implements OnInit, OnDestroy {
  viewd = 'View ALL Indent';

  classArrTable: any =[];

  headerType: any = 'issue';

  selectedRowIndex: number;


  IntentType = ''

  constructor(public dialog: MatDialog, private router: Router, private service: InventoryService, private globals: Globals) {
    this.service.apiUrl = this.globals.gServerApiUrl;
    this.subs.add(this.sectionControl.valueChanges.pipe(debounceTime(600)).subscribe((myvardatas) => {
      this.loadSections(myvardatas);

      this.globals.gmainMenuSelected = 'StoreSetIssues';
    }));
  }

  sectionControl = new FormControl();

 private subs = new SubSink();

 today: Date = new Date();

  setItems: setIssues = new setIssues();

 savedItems: SetIssueItems = new SetIssueItems();

  progressval = '';

  isSelection = 'OPTION'; // OPTION  // LIST // VIEW

  isSecondOption = 'SAVE'; // SAVE   // VIEWLIST

  isChecked = false;

 sDate: any;

 viewSearch ='';

 viewSearch1='';

 section = 'ALL';

 sectionCode = 0;

 toDate: any;

  pending: any;

 output: any;

 receice: any;

  secList: any = [];

 List: any = [];

 dataSource = new MatTableDataSource([]);

 items: any = [];

 itemlen = 0;

  optionTypes: any = [{ type: 'Set Indent', val: 'ISSUES_SET' }, { type: 'Individual Indent', val: 'ISSUES_IND' }, { type: 'Unplanned Indent', val: 'ISSUES_SEC' }]

  issueType: any;

  listlen = 0;

  cngeItemsList: any = [];

  isOutputchk = false;

 tcount:any = '';

 isQtyEnable = false;

  assignButton = [ { type: 'All', value: 'All' }, { type: 'Set', value: 'Set' }, { type: 'Individual', value: 'Ind' }, { type: 'Unplanned', value: 'Sec' }];

  assignButtonHeaders = [{ type: 'Set Issue', value: 'issue' }, { type: 'View', value: 'view' }];

  isType: any = 'Set';

  SetHome: any = 'issue';

  filterList: any = [];

  filterDataSource = new MatTableDataSource([]);

  displayedColumns: any= ['SNo', 'DestiBrname', 'BatchNo', 'View', 'todaydate', 'TrnTime', 'TrnNo', 'Delete'];

  displayedColumnsFilter: any= ['SNo', 'BatchNo', 'View', 'FgIname', 'qtyReq', 'qty', 'Emaster', 'timenow', 'usr'];

  MatTableDataSource

  ngOnInit(): void {
    this.sDate = this.today;
    this.toDate = this.today;
    this.globals.gBeginTran = '';
    this.loadOutputEnable();
    this.shortcuts();
  }

  changeAssignType(event: any) {
    this.headerType = event.value;
    this.sDate = this.today;
    this.toDate = this.today;
    if (event.value === 'view') {
      this.selectView('view');
    } else {
      this.selectView('cancel');
    }
  }

  loadOutputEnable() {
    this.subs.add(this.service.getInventryReport(
      'StoreSetIssues',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      '0',
      '0',
      '0',
      '0',
      this.globals.gUsrid,
      '0',
      '0',
      '0',
    ).subscribe((result) => {
      const val: any = result;
      if (val.length > 0) {
        if (val[0].Result === 'Success') {
          if (val[0].StoreSetIss === 'Enable') {
            this.isQtyEnable = true;
          }
        }
      } else { }
    }, (err) => { Swal.fire({ html: err.message }); }));
  }

  loadSections(var3: any) {
    this.subs.add(this.service.getInventryReport(
      'BranchSelection',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      '0',
      '0',
      '0',
      '0',
      this.globals.gUsrid,
      '0',
      'TO_SECTION',
      var3,
    ).subscribe((result) => {
      const val = result;
      if (val.length > 0) {
        this.secList = val;
        this.secList.unshift({ brname: 'ALL', brcode: 0 });
      } else { }
    }, (err) => { Swal.fire({ html: err.message }); }));
  }

  loadDatas(type: any) {
    this.dataSource = new MatTableDataSource([]);
    this.filterDataSource = new MatTableDataSource([]);
    this.List = []; this.filterList = [];
    this.subs.add(this.service.getInventryReport('getIndentToIssue', type, this.globals.gTerCode, this.sectionControl.value, '0', this.globals.gBrcodeString, '0', '0', this.changeFinalDateFormat(this.sDate), '0', this.globals.gUsrid, '0', '0', this.sectionCode).subscribe((result) => {
      const val = result;
      this.globals.gBeginTran = '';
      if (val.length > 0) {
        if (val[0].Result === 'Success') {
          this.dataSource = new MatTableDataSource(val);
          this.List = val; this.listlen = val.length;
          this.isType = 'Set';
          this.filterList = this.List.filter(
            (item: any) => item.ReqType === this.isType,
          );
          this.filterDataSource = new MatTableDataSource(this.filterList);
          this.filterDataSource.sort = this.sort;
          this.isSelection = 'LIST';
        } else {
          Swal.fire({ text: 'No record found' });
        }
      } else {
        Swal.fire({ text: 'No record found' });
      }
    }, (err) => {
      Swal.fire({ html: err.message });
      this.globals.gBeginTran = '';
    }));
  }

  getFilterItems(event: any): any {
    this.isType = event.value;
    this.filterList = [];
    this.filterDataSource = new MatTableDataSource([]);
    if (this.isType === 'All' || this.isType === 'Set') {
      this.displayedColumnsFilter = ['SNo', 'BatchNo', 'View', 'FgIname', 'qtyReq', 'qty', 'Emaster', 'timenow', 'usr'];
    } else {
      this.displayedColumnsFilter = ['SNo', 'BatchNo', 'View', 'FgIname', 'Emaster', 'timenow', 'usr'];
    }
    if (this.isType === 'All') {
      this.displayedColumnsFilter = ['SNo', 'ReqType', 'BatchNo', 'View', 'FgIname', 'qtyReq', 'qty', 'Emaster', 'timenow', 'usr'];
      this.filterList = this.List;
      this.filterDataSource = new MatTableDataSource(this.filterList);
      this.filterDataSource.sort = this.sort;
    } else {
      this.filterList = this.List.filter(
        (item: any) => item.ReqType === this.isType,
      );
      this.filterDataSource = new MatTableDataSource(this.filterList);
      this.filterDataSource.sort = this.sort;
    }
  }

  changeList(event: any) {
    this.section = event;
    if (this.section) {
      this.sectionCode = this.secList.find((e: any) => e.brname === this.section).brcode;
      setTimeout(() => {
        document.getElementById('nextbtn').focus();
      }, 100);
    } else {
      this.sectionCode = 0;
      this.section = 'ALL';
    }
  }

  selectNext() {
    if (this.isSecondOption === 'SAVE') {
      if (this.isChecked) {
        this.loadDatas('ALL');
      } else {
        this.loadDatas('SINGLE');
      }
    } else {
      this.viewSavedData();
    }
  }

  // @ViewChild(MatSort) sort: MatSort;

  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
    this.filterDataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.filterDataSource.sort = this.sort;
  }

  viewChange(data, type) {
    if (type === 1) {
      this.filterDataSource.filter = data;
    } else {
      this.dataSource.filter = data;
    }
  }

  selectView(option: any) {
    if (option === 'view') {
      this.isSecondOption = 'VIEWLIST';
    } else {
      this.isSecondOption = 'SAVE';
    }
  }

  changeOutput(event: any) {
    this.isOutputchk = event;
  }

  reslen = 0;

  loadDataByid(item: any) {
    this.reslen = 0;
    if(item.ReqType === 'Set'){
      this.IntentType = 'Set Intent'
    }
    else if(item.ReqType === 'Ind'){
      this.IntentType = 'Individual Intent'
    }
    else {
      this.IntentType = 'Unplanned Intent'
    }
    this.progressval = 'indeterminate';
    this.subs.add(this.service.getInventryReport('getRMtoIssueforSelectedIndent', item.ReqType, this.globals.gTerCode, '0', '0', this.globals.gBrcodeString, item.Fgcode, '0', item.tdate, '0', this.globals.gUsrid, '0', item.TrnId, '0').subscribe((result) => {
      this.progressval = '';
      const val = result;
      if (val.length > 0) {
        this.tcount = '';
        this.items = val; this.itemlen = val.length;
        this.reslen = this.items.length;
        this.setItems = this.items[0];
        this.setItems.batch = item.BatchNo;
        this.pending = this.setItems.setPending;
        this.output = Number(this.pending * this.setItems.expectedQty).toFixed(3);
        this.setItems.reqType = item.ReqType;
        this.setItems.TrnId = item.TrnId;
        this.isOutputchk = false;
        this.isSelection = 'VIEW';

        if (this.setItems.reqType === 'Ind') {
          this.items.forEach((element: any) => {
            element.Issqty = element.rqty;
            element.Amt = element.Issqty * element.rirate;
          });
        } else {
          this.calculateValues();
        }
      } else {
        this.progressval = '';
        Swal.fire({ text: 'No record found' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ html: err.message });
    }));
  }

  enterKeyOutputQty(event: any) {
    if (event.key === 'Enter') {
      this.calculateOutputSet();
    }
  }

  calculateOutputSet() {
    this.setItems.setPending = Number((this.output) / this.setItems.expectedQty).toFixed(3);
    this.items.forEach((element: any) => {
      element.Issqty = Number(element.rqty * this.setItems.setPending).toFixed(3);
      element.Amt = element.Issqty * element.rirate;
    });

    if (this.pending < this.setItems.setPending) {
      Swal.fire({ text: `Maximum ${this.pending} sets only allowed` });
      this.setItems.setPending = this.pending;
      this.calculateValues();
    }
  }

  calculateValues() {
    this.items.forEach((element: any) => {
      element.Issqty = Number(element.rqty * this.setItems.setPending).toFixed(3);
      element.Amt = element.Issqty * element.rirate;
    });
    this.output = Number(this.setItems.setPending * this.setItems.expectedQty).toFixed(3);
  }

  addIssuQty(i: any) {
    this.items[i].Amt = Number(this.items[i].Issqty) * this.items[i].rirate;
  }

  qtyKeyPress(event: any) { }

  saveConfirm() {

    if (this.globals.gBeginTran === 'BeginTran') {
      return;
    }
    if(this.setItems.reqType === 'Set' && (this.setItems.setPending === null || this.setItems.setPending === undefined || this.setItems.setPending === '' || this.setItems.setPending == 0)){
      Swal.fire({ text: 'Enter No.of set' });
      return;
    }
    if(this.setItems.reqType === 'Set' && (this.output === null || this.output === undefined || this.output === '' || this.output == 0)){
      Swal.fire({ text: 'Enter Output' });
      return;
    }

    if (this.receice === null || this.receice === undefined || this.receice === '') {
      Swal.fire({ text: 'Enter receiver name' });
    } else {
      Swal.fire({
        text: 'Are you sure save this issue ?',
        showCancelButton: true,
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        confirmButtonColor: '#4caf50',
        cancelButtonColor: '#ff80ab',
      }).then(
        (result) => {
          if (result.value) {
            this.globals.gBeginTran = 'BeginTran';
            this.saveItems();
          } else if (result.dismiss === Swal.DismissReason.cancel) { }
        },
      );
    }
  }

  saveItems() {
    let items = '';
    let saveItems: any = []; let option: string;
    console.log(this.setItems.reqType);
    

    for (let i = 0; i < this.items.length; i++) {
      let issuet:any = Number(this.items[i].Issqty).toFixed(4);
      if (!issuet) {
        issuet = 0;
      }

      items = `${items + this.items[i].ricode}|${issuet}|NP|Nil|` + '0' + '|' + '0' + '~';
    }

    if (this.setItems.reqType === 'Set') {
      option = 'ISSUES_SET';
    } else if(this.setItems.reqType === 'Ind') {
      option = 'ISSUES_IND';
    }
    else {
      option = 'ISSUES_SEC';
    }
    this.progressval = 'indeterminate';
    this.subs.add(this.service.getInventryReport(
      'GoodsOutSave',
      this.setItems.fgcode,
      this.globals.gTerCode,
      this.setItems.TrnId,
      this.receice,
      this.globals.gBrcodeString,
      this.setItems.setPending,
      option,
      this.changeFinalDateFormat(this.sDate),
      this.setItems.reqMastername,
      this.globals.gUsrid,
      items.substring(0, items.length - 1),
      this.setItems.batch,
      'Issue_Manl',
    ).subscribe((result) => {
      saveItems = result;

      this.progressval = '';

      if (saveItems.length > 0) {
        if (saveItems[0].statusMsg === 'Sucees') {
          if (this.globals?.gCostcenterShopFact === 'Shop') {
            Swal.fire({ text: 'Issue Saved Successfully' });
            this.getSaveResult();
          } else {
            Swal.fire({
              text: 'Issue Saved, Do you want to Print ?',
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              confirmButtonColor: '#4caf50',
              cancelButtonColor: '#ff80ab',
            }).then((result) => {
              if (result.value) {
                this.printReq(saveItems[0].TrnNo, '2', this.setItems.fginame);
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                this.getSaveResult();
              }
            });
          }
        } else {
          this.globals.gBeginTran = '';
          Swal.fire({ text: saveItems[0].statusMsg });
        }
      } else {
        Swal.fire({ text: 'Issue Save Failed' });
      }
    }, (err) => {
      this.progressval = '';
      this.globals.gBeginTran = '';
      Swal.fire({ text: 'Server ERR_CONNECTION_REFUSED' });
    }));
  }

  getSaveResult() {
    this.onclear();
    if (this.isChecked) {
      this.loadDatas('ALL');
    } else {
      this.loadDatas('SINGLE');
    }
  }

  // datachange() {
  //   if (this.isChecked) {
  //     this.viewd = 'View ALL Indent';
  //   } else {
  //     this.viewd = 'View Pending Indent';
  //   }
  // }

  issueTypeChange(event: any) {
    this.issueType = event;
    setTimeout(() => {
      document.getElementById('nextbtn').focus();
    }, 100);
  }

  selindex = 0;

  openInterchangeModal(item: any, i: any) {
    this.cngeItemsList = [];
    if (this.setItems.reqType === 'Set' && this.isSelection === 'VIEW' && this.isSecondOption === 'SAVE') {
      this.progressval = 'indeterminate';
      this.subs.add(this.service.getInventryReport(
        'Issue_SwapItem',
        this.setItems.fgcode,
        this.globals.gTerCode,
        '0',
        '0',
        this.globals.gBrcodeString,
        item.ricode,
        '0',
        '0',
        '0',
        this.globals.gUsrid,
        '0',
        '0',
        '0',
      ).subscribe((result) => {
        const val: any = result;
        this.progressval = '';
        if (val.length > 0) {
          if (val[0].Result === 'Success') {
            this.cngeItemsList = val;
            this.selindex = i;
            // document.querySelector
            $('#interchangeModal').modal('show');
          } else {
            Swal.fire({ text: val[0].Result });
          }
        } else {
          Swal.fire({ text: 'No swapping items mapped for this item' });
        }
      }, (err) => {
        Swal.fire({ html: err.message });
        this.progressval = '';
      }));
    }
  }

  viewSavedData() {
    if (this.issueType === '' || this.issueType === undefined || this.issueType === null) {
      Swal.fire({ text: 'Select Indent Type ' });
    } else {
      this.progressval = 'indeterminate';
      this.subs.add(this.service.getInventryReport(
        'GTNViewAllDate',
        '0',
        this.globals.gTerCode,
        '0',
        '0',
        this.globals.gBrcodeString,
        '0',
        this.issueType,
        this.changeFinalDateFormat(this.sDate),
        this.changeFinalDateFormat(this.toDate),
        this.globals.gUsrid,
        '0',
        '0',
        '0',
      ).subscribe((result) => {
        this.progressval = '';
        const val = result;
        if (val.length > 0) {
          if (val[0].StatusMsg === 'Success') {
            this.List = val;
            this.dataSource = new MatTableDataSource(val);
            this.isSelection = 'LIST';
            this.listlen = val.length;
          } else {
            Swal.fire({ text: val[0].StatusMsg });
          }
        } else {
          Swal.fire({ text: 'No record found' });
        }
      }, (err) => {
        this.progressval = '';
        Swal.fire({ text: 'Server ERR_CONNECTION_REFUSED' });
      }));
    }
  }

  viewSavedDataById(item: any) {
    this.progressval = 'indeterminate';
    this.subs.add(this.service.getInventryReport('GTNViewDateSno', '0', this.globals.gTerCode, '0', '0', this.globals.gBrcodeString, '0', this.issueType, '0', '0', this.globals.gUsrid, '0', this.changeFinalDateFormat(item.todaydate), item.TrnNo).subscribe((result) => {
      this.progressval = '';
      const val = result;
      if (val.length > 0) {
        if (val[0].Result === 'Success') {
          this.tcount = '';
          this.items = val; this.itemlen = val.length;
          this.savedItems = this.items[0];
          this.isSelection = 'VIEW';
        } else {
          Swal.fire({ text: 'No record found' });
        }
      } else {
        Swal.fire({ text: 'No record found' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: 'Server ERR_CONNECTION_REFUSED' });
    }));
  }

  openDialog(trnNo: any, i: any) {
    let dialogData: any; let List = [];
    const dialogRef = this.dialog.open(CommonAuthourityComponent, {
      width: '450px',
      data: {
        dialogType: 'OTPONLY',
        data: trnNo,
        authorityFlg: 'DcDelete_ThumbApproval',
        smsCaption: 'DC_Deletion',
        keyCaption: '0',
      },

    });

    dialogRef.afterClosed().subscribe((result) => {
      dialogData = result;

      if (dialogData === undefined) {
      } else if (dialogData.event === 'Success') {
        this.progressval = 'indeterminate';

        const tdate = this.List.find((x: any) => x.TrnNo === trnNo).todaydate;
        this.subs.add(this.service.getInventryReport(
          'DeleteGTNDateSno',
          '0',
          this.globals.gTerCode,
          '0',
          '0',
          this.globals.gBrcodeString,
          '0',
          this.issueType,
          '0',
          '0',
          this.globals.gUsrid,
          dialogData.approvalAuthname,
          this.changeFinalDateFormat(tdate),
          trnNo,
        ).subscribe((data) => {
          this.progressval = '';
          List = data;
          if (List.length > 0) {
            if (List[0].StatusMsg === 'Success') {
              this.List.splice(i, 1);
              // this.viewSavedData();
              this.progressval = '';
              Swal.fire({ text: 'Indent succesfully deleted' });
              this.dataSource.data.splice(0, i);
              this.dataSource._updateChangeSubscription()
              this.dataSource = new MatTableDataSource(this.dataSource.data)
            } else if (List[0].StatusMsg !== 'Success') {
              this.progressval = '';
              Swal.fire({ text: List[0].StatusMsg });
            }
          } else {
            this.progressval = '';
            Swal.fire({ text: ' Indent delete failed !' });
          }
        }, (err) => {
          this.progressval = '';
          Swal.fire({ text: 'Server ERR_CONNECTION_REFUSED' });
        }));
      } else {
        Swal.fire({ text: ' Indent delete failed' });
      }
    });
  }

  interChangeItem(item: any) {
    this.progressval = 'indeterminate';
    this.subs.add(this.service.getInventryReport(
      'Issue_AfterSwapItem',
      this.setItems.fgcode,
      this.globals.gTerCode,
      this.items[this.selindex].ricode,
      item.subicode,
      this.globals.gBrcodeString,
      '0',
      '0',
      '0',
      '0',
      this.globals.gUsrid,
      item.subiname,
      '0',
      '0',
    ).subscribe((result) => {
      this.progressval = '';
      const val: any = result;
      if (val.length > 0) {
        if (val[0].Result === 'Success') {
          this.items[this.selindex].ricode = val[0].icode;
          this.items[this.selindex].riname = val[0].iname;
          this.items[this.selindex].ruom = val[0].mment;
          this.items[this.selindex].rirate = val[0].purrate;
          this.calculateValues();
          $('#interchangeModal').modal('hide');
        } else {
          Swal.fire({ text: val[0].Result });
        }
      } else {
        Swal.fire({ text: 'Item swapping failed ' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: 'Server ERR_CONNECTION_REFUSED' });
    }));
  }

  printcountEnter(event: any) {
    if (event.key === 'Enter') {
      setTimeout(() => {
        document.getElementById('printqrcode').focus();
      }, 100);
    }
  }

  printCheck() {
    if (this.savedItems?.DriverName == 'Set' && (this.savedItems.NoOfSet === undefined || this.savedItems.NoOfSet === null || this.savedItems.NoOfSet === '')) {
      Swal.fire({ text: 'Enter No.of sets' });
      return;
    }
    if (this.savedItems?.DriverName == 'Set'  && (this.savedItems.OutputQty === undefined || this.savedItems.OutputQty === null || this.savedItems.OutputQty === '')) {
      Swal.fire({ text: 'Enter Output count' });
      return;
    }
    if (this.tcount === undefined || this.tcount === null || this.tcount === ''|| this.tcount === '0' || this.tcount === 0) {
      Swal.fire({ text: 'Enter QR count' });
    } else {
      Swal.fire({
        text: 'Are you sure to print ?',
        showCancelButton: true,
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        confirmButtonColor: '#4caf50',
        cancelButtonColor: '#ff80ab',
      }).then(
        (result) => {
          if (result.value) {
            this.printReq(this.savedItems.TrnNo, this.tcount, this.savedItems.DestiBrname);
          } else if (result.dismiss === Swal.DismissReason.cancel) { }
        },
      );
    }
  }

  changeValueOutput(event: any, input) {
    if (event.which === 46 && input && (input.indexOf('.') >= 0)) {
      return false;
    }
    input = input.replace(/^0+/, '');

    const decimalIndex = input.indexOf('.');

    if (decimalIndex !== -1 && input.length - decimalIndex > 2) {
      input = input.substring(0, decimalIndex + 3);
    }

    this.output = input;
    return true;
  }

  changeValue(event: any, input, type) {
    const allowedKeycodes = [46,48, 49,50,51,52,53,54,55,56,57]; 

    if (!allowedKeycodes.includes(event.keyCode)) {
  event.preventDefault(); 
     return false;
}
    if (event.which === 46 && input && (input.indexOf('.') >= 0)) {
      return false;
    }
    input = input.replace(/^0+/, '');

    const decimalIndex = input.indexOf('.');
    if (decimalIndex !== -1 && input.length - decimalIndex > 2) {
      input = input.substring(0, decimalIndex + 3);
    }
if(type ==='out'){
  this.output = input;
}else{
  this.setItems.setPending = input
}
    return true;
  }

  // changeValue(event: any, input) {
  //   if (event.which === 46 && input && (input.indexOf('.') >= 0)) {
  //     return false;
  //   }
  //   input = input.replace(/^0+/, '');

  //   const decimalIndex = input.indexOf('.');

  //   if (decimalIndex !== -1 && input.length - decimalIndex > 2) {
  //     input = input.substring(0, decimalIndex + 3);
  //   }

  //   this.setItems.setPending = input;
  //   return true;
  // }

  enterKeyEvent(event: any, option:any) {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTimeout(() => {
        document.getElementById(option).focus();
      }, 100);
    }
  }

  checkQty(rqty, Issqty) {
    if (Issqty > rqty) {
      Swal.fire({ text: 'IssQty must not be greater than ReqQty' });
      this.items[0].Issqty = 1;
    } else {
      this.items[0].Issqty = Number(this.items[0].Issqty).toFixed(3);
    }
  }

  changeValue1(event: any, uom, input) {
    if (event.which === 46 && input && (input.indexOf('.') >= 0)) {
      return false;
    }
    input = input.replace(/^0+/, '');

    const decimalIndex = input.indexOf('.');
    if (decimalIndex !== -1 && input.length - decimalIndex > 3) {
      input = input.substring(0, decimalIndex + 4);
      return false;
    }
    return true;

    // this.item.Issqty = input;
  }

  rowClick(index : number) {
    this.selectedRowIndex = index;

    for (let i = 0; i < this.List.length; i++) {
      if (i === index) {
        this.classArrTable[i] = true;
      } else {
        this.classArrTable[i] = false;
      }
    }
  }

  keyTab1(event: any, i, item, type) {
    if (event.key === 'Enter') {
      this.rowClick(i);
      if (type === 'view') {
        this.viewSavedDataById(item);
      } else {
        this.loadDataByid(item);
      }
    }
  }

  focusNext(event: any) {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTimeout(() => {
        if (this.isSecondOption === 'VIEWLIST') {
          document.getElementById('toDate').focus();
        } else {
          document.getElementById('indentTo').focus();
        }
      }, 100);
    }
  }

  //  var2:count, var3:itemname, ReqSub:Qrcontent
  printReq(sub: any, extra2: any, extra3: any) {
    this.progressval = 'indeterminate';
    this.subs.add(this.service.getBody({
      ReqMain: 'QrcodePrintForset',
      ReqSub: sub,
      TerCode: this.globals.gTerCode,
      StkWhCode: '0',
      Subcat: '0',
      Cat: '0',
      icode: '0',
      phyqty: '0',
      fdate: '0',
      tdate: '0',
      usr: '0',
      var1: this.globals.gLabelprinterIp,
      var2: extra2,
      var3: extra3,
    }).subscribe((result: any) => {
      const data = result;
      this.progressval = '';
      this.globals.gBeginTran = '';
      if (this.isSelection === 'VIEW' && this.isSecondOption === 'SAVE') {
        this.getprintResult(data);
      } else if (data.length > 0) {
        if (data[0].statusMsg === 'Success') {
          Swal.fire({ text: 'Print Successfully' });
          this.tcount = '';
        } else {
          Swal.fire({ text: data[0].errorMsg });
        }
      } else {
        Swal.fire({ text: 'Failed reprint request' });
      }
    }, (err: any) => {
      this.globals.gBeginTran = '';
      this.progressval = '';
      Swal.fire({ text: 'Print Server Error' });
      if (this.isSelection === 'SAVE') {
        this.getSaveResult();
      }
    }));
  }

  getprintResult(data: any) {
    this.getSaveResult();
    if (data.length > 0) {
      if (data[0].statusMsg === 'Success') {
        Swal.fire({ text: 'Print Successfully' });
      } else {
        Swal.fire({ text: data[0].errorMsg });
      }
    } else {
      Swal.fire({ text: 'Failed print request' });
    }
  }

  changeFinalDateFormat(startDate: any): any {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    const date = formatDate(startDate, format, locale);
    return date;
  }

  keypressValidation(event: any) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    }
    return false;
  }

  getItemCalculates() {
    if (this.pending < this.setItems.setPending) {
      Swal.fire({ text: `Maximum ${this.pending} sets only allowed` });
      this.setItems.setPending = this.pending;
      this.calculateValues();
    } else {
      this.calculateValues();
    }
  }

  onlyNumericValue(data: any) {
    const { value } = data;
    if (this.pending < value) {
      Swal.fire({ text: `Maximum ${this.pending} sets only allowed` });
      this.setItems.setPending = this.pending;
      this.calculateValues();
    } else {
      this.calculateValues();
    }
  }

  onlyKeyEnter(event: any) {
    if (event.key === 'Enter') {
      if (this.pending < this.setItems.setPending) {
        Swal.fire({ text: `Maximum ${this.pending} sets only allowed` });
        this.setItems.setPending = this.pending;
        this.calculateValues();
      } else {
        this.calculateValues();
      }
    }
  }

  onclear() {
    this.setItems = new setIssues(); this.savedItems = new SetIssueItems();
    this.isSelection = 'LIST';
    this.pending = undefined; this.output = undefined; this.receice = undefined;
    this.items = [];
  }

  backNavigation() {
    if (this.isSelection === 'LIST') {
      this.List = []; this.issueType = undefined;
      this.isSelection = 'OPTION';
    } else if (this.isSelection === 'VIEW') {
      this.isSelection = 'LIST';
      this.onclear();
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  homeNavigate() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(keydown$.subscribe((event: KeyboardEvent) => {
      if (event.altKey && (event.key === 'r' || event.key === 'R')) {
        event.preventDefault();
        document.getElementById('name')?.focus();
      }
      if (event.altKey && (event.key === 'q' || event.key === 'Q')) {
        event.preventDefault();
        document.getElementById('qrcount')?.focus();
      }
      if (event.altKey && (event.key === 'x' || event.key === 'X')) {
        event.preventDefault();
        this.backNavigation();
      }
      if (this.isSelection === 'VIEW' && this.isSecondOption === 'SAVE') {
        if (event.altKey && (event.key === 's' || event.key === 'S')) {
          event.preventDefault();
          this.saveConfirm();
        }
      }
      if (this.List.length > 0) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          const tbody:any = document.querySelectorAll('tbody tr');

          if (this.selectedRowIndex < this.List.length - 1) {
            this.selectedRowIndex += 1;

            tbody[this.selectedRowIndex]?.focus();
          }
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault();
          const tbody:any = document.querySelectorAll('tbody tr');

          if (this.selectedRowIndex > 0) {
            this.selectedRowIndex -= 1;
            tbody[this.selectedRowIndex]?.focus();
          }
        }
      }
    }));
  }
}

export class setIssues {
  fgcode: any;

  fginame: any;

  fguom: any;

  setPending: any;

  reqGivername: any;

  reqMastername: any;

  batch: any;

  Issqty: any;

  expectedQty: any;

  reqType: any;

  TrnId: any;
}

export class SetIssueItems {
  DestiBrcode: any;

  DestiBrname: any;

  TrnNo: any;

  todaydate: any;

  TrnTime: any;

  subcat: any;

  icode: any;

  iname: any;

  qty: any;

  uom: any;

  irate: any;

  TrayCnt: any;

  TrayUom: any;

  VehicleNo: any;

  DriverName: any;

  Usr: any;

  MyCompanyName: any;

  MyAdd1: any;

  MyAdd2: any;

  Mycity: any;

  Mypin: any;

  Myphone: any;

  myStates: any;

  MyGstNo: any;

  DGstNo: any;

  DcmpName: any;

  Dadd1: any;

  Dadd2: any;

  Dcity: any;

  Dpincode: any;

  Dphone: any;

  Dstates: any;

  BranchName: any;

  Descript: any;

  NoOfSet: any;

  OutputQty: any;

  Pending: any;
}

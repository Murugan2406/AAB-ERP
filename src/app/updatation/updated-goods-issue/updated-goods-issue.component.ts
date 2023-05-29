/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
/* eslint-disable radix */

/* eslint-disable import/order */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-concat */
/* eslint-disable no-empty */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Validators, FormControl } from '@angular/forms';
import {
  Component, OnInit, OnDestroy, ViewChildren, QueryList, TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from '../services/inventory.service';
import Swal from 'sweetalert2';
import { SubSink } from 'subsink';
import { formatDate } from '@angular/common';
import { debounceTime } from 'rxjs/operators';
import { CommonAuthourityComponent } from '../common-authourity/common-authourity.component';
import { DcOutItems } from '../dcout/dcout.component';
import { SecgateserviceService } from '../services/secgateservice.service';
import { SelectItemsComponent } from '../select-items/select-items.component';
import { CommonService } from 'src/app/services/common.service';

import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-updated-goods-issue',
  templateUrl: './updated-goods-issue.component.html',
  styleUrls: ['./updated-goods-issue.component.scss'],
})
export class UpdatedGoodsIssueComponent implements OnInit {
  searchTemp = '';

  showcontent: boolean = true;

  selectedIndex: number =0;

  constructor(
    private service: SecgateserviceService,
    public dialog: MatDialog,
        private inventryService: InventoryService,
    private router: Router,
        private globals: Globals,
        private commonservice: CommonService,
  ) {
    this.issueTYpe = this.globals.gmainMenuSelected;
    this.fromBrcode = this.globals.gBrcodeString;
    this.inventry.TerCode = this.globals.gTerCode;
    this.fromUsr = this.globals.gUsrid;
    this.inventryService.apiUrl = this.globals.gApiserver;
    this.service.gclicntApi = this.globals.gApiserver;

    this.inventry.usr = this.fromUsr;

    this.subs.add(this.issueControl.valueChanges.pipe(debounceTime(200)).subscribe((data) => {
      this.inventry.ReqMain = 'BranchSelection';
      this.inventry.Cat = this.globals.gBrcodeString;
      this.inventry.var2 = this.issueTYpe;
      this.inventry.var3 = data;
      this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
        this.issueToList = result;
      }, (err) => Swal.fire({ html: err.error })));
    }));

    this.subs.add(this.vehSearchControl.valueChanges.pipe(debounceTime(200)).subscribe((data) => {
      this.inventry.ReqMain = 'VehicleNoSearch';
      this.inventry.phyqty = this.issueTYpe;
      this.inventry.var2 = this.issueTYpe;

      this.inventry.var1 = data;
      this.inventry.var3 = data;
      this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
        this.vehList = result;
      }, (err) => Swal.fire({ html: err.error })));
    }));

    this.subs.add(this.supSearchControl.valueChanges.pipe(debounceTime(200)).subscribe((myvardatas) => {
      if (myvardatas !== '') {
        this.loadDatas('SupplierSearch', '0', '0', '0', myvardatas, '0');
      }
    }));
  }

      progressval = '';

     fromUsr = '';

     fromBrcode = '';

     issueTYpe = '';

      issueControl = new FormControl('', Validators.required);

     approvalControl = new FormControl();

     vehSearchControl = new FormControl('', Validators.required);

      private subs = new SubSink();

      dcoutItems: DcOutItems = new DcOutItems();

      today = new Date();

      inventry: any = {
        ReqMain: 'BranchSelection',
        ReqSub: '0',
        TerCode: '0',
        StkWhCode: '0',
        Subcat: '0',
        Cat: '0',
        icode: '0',
        phyqty: '0',
        fdate: '0',
        tdate: '0',
        usr: '0',
        var1: '0',
        var2: '0',
        var3: '0',
      };

      header: any;

     isOption = 'IssueSave';

     isItems = false;

     isSearch = true;

     isSelection = true;

     isView = false;

      itemList: any = [];

     individuals: any = [];

     issueToList: any = [];

     vehList: any = []

      issueTo = '';

     issueOption = '';

     approvedBy = '';

      empname: any;

      trnFrdate: any;

     trntodate: any;

      datalist: any = [];

     isViewoption = '';

     isprint = true;

      printTotal = 0;

      supSearchControl = new FormControl('', Validators.required);

      ngOnInit() {
        this.getHeaders();
        this.shortcuts();
      }

      ngOnDestroy() {
        this.subs.unsubscribe();
      }

      getHeaders() {
        if (this.issueTYpe === 'ISSUES_BROKEN') {
          this.header = 'BROKEN';
        } else if (this.issueTYpe === 'ISSUES_FREE') {
          this.header = 'COMPLEMENTORY';
        } else if (this.issueTYpe === 'ISSUES_WASTAGE') {
          this.header = 'WASTAGE';
        } else if (this.issueTYpe === 'ISSUES_VEHICLE') {
          this.header = 'FUEL';
        } else if (this.issueTYpe === 'ISSUES_FREE_STAFFISS') {
          this.header = 'STAFF';
        } else if (this.issueTYpe === 'ISSUES_SAMPLE') {
          this.header = 'SAMPLE';
        } else if (this.issueTYpe === 'ISSUES_RETURN') {
          this.header = 'RETURN';
        } else if (this.issueTYpe === 'RT_TO_SUP') {
          this.header = 'RT_TO_SUP';
        } else {
          this.backNavigation();
        }
      }

      changeFinalDateFormat(startDate: any): any {
        const format = 'dd-MM-yyyy';
        const locale = 'en-US';
        const date = formatDate(startDate, format, locale);
        return date;
      }

      shortcuts() {
        const keydown$ = fromEvent(window, 'keydown');
        this.subs.add(keydown$.subscribe((event: KeyboardEvent) => {
          if (event.altKey && (event.key === 's' || event.key === 'S')) {
            event.preventDefault();

            this.saveOption1();
          }
          if (event.altKey && (event.key === 'x' || event.key === 'X')) {
            event.preventDefault();
            this.backNavigation();
          }
          if (event.altKey && (event.key === 'n' || event.key === 'N')) {
            event.preventDefault();
            this.selectNext();
          }
          if (event.altKey && (event.key === 'c' || event.key === 'C')) {
            event.preventDefault();
            setTimeout(() => {
              this.childGames.forEach((c) => c.clear());
              document.getElementById('icode')?.focus();
            }, 200);
          }

          if (event.altKey && (event.key === 't' || event.key === 'T')) {
            if (this.selectedIndex === 0) {
              this.selectedIndex = 1;
              setTimeout(() => {
                document.getElementById('FromDate')?.focus();
              }, 100);
            } else {
              this.selectedIndex = 0;
            }
          }
        }));
      }

      suplist:any = [];

      loadDatas(reqmain: string, extra1: string, extra2: string, extra3: string, extra4: string, extra5: string) {
        this.subs.add(this.service.datareqsarnFour({
          reqMainreq: reqmain,
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: extra1,
          var2: extra2,
          var3: extra3,
          var4: extra4,
          var5: extra5,
          var6: '0',
          var7: '0',
          var8: '0',
          var9: '0',
          var10: '0',
          var11: '0',
          var12: '0',
          var13: '0',
          var14: '0',
          var15: '0',
          var16: '0',
          var17: '0',
          var18: '0',
          var19: '0',
          var20: '0',
        }).subscribe((result:any) => {
          this.progressval = '';
          this.suplist = result;
        }, (err:any) => {
          this.progressval = '';
          Swal.fire({ html: err.error });
        }));
      }

      getSelectsupplier(event: any, supplier) {
        if (event.source.selected) {
          this.issueTo = supplier.supcode;
          setTimeout(() => {
            document.getElementById('vehnum')?.focus();
          }, 100);
        }
      }

      getSelectedCode(event: any, brObj) {
        if (!event.source.selected) {
          return;
        }

        this.issueTo = brObj.brcode;

        if (this.issueTYpe === 'ISSUES_SAMPLE') {
          this.selectFocus('empCode');
        } else if (this.issueTYpe === 'ISSUES_BROKEN') {
          this.selectFocus('getApprovedBy');
        } else if (this.issueTYpe === 'ISSUES_RETURN') {
          this.selectFocus('vehicle');
        } else {
          this.selectFocus('isueoption');
        }
      }

      changeValue(event: any):any {
        if (this.issueTYpe === 'ISSUES_VEHICLE') {
          if (event.keyCode >= 48 && event.keyCode <= 57) {
            return true;
          } if (event.keyCode === 46) {
            if (this.approvedBy.indexOf('.') > -1) {
              return false;
            }
            return true;
          }
          return false;
        }
      }

      changeMeeterValue(event: any):any {
        if (this.issueTYpe === 'ISSUES_VEHICLE') {
          if (event.keyCode >= 48 && event.keyCode <= 57) {
            return true;
          } if (event.keyCode === 46) {
            if (this.issueOption.indexOf('.') > -1) {
              return false;
            }
            return true;
          }
          return false;
        }
      }

      selectVeh(event: any, option) {
        if (event.source.selected) {
          this.approvedBy = option.vehicleno;
          setTimeout(() => {
            document.getElementById('reason')?.focus();
          }, 100);
        }
      }

      enterToempcode(event: any) {
        if (event.key === 'Enter') {
          if (this.issueOption === null || this.issueOption === undefined || this.issueOption === '') {
            setTimeout(() => { Swal.fire({ text: 'Enter the Employee code' }); }, 300);
          } else {
            this.getEmpDetils();
          }
        }
      }

      getEmpDetils() {
        this.empname = '';
        this.inventry.ReqMain = 'GetEmpDetCode';
        this.inventry.var3 = this.issueOption;
        this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
          const details = result;
          if (details.length > 0) {
            if (details[0].result === 'Success') {
              this.empname = details[0].empname;
              this.selectFocus('reason');
            } else {
              Swal.fire({ text: 'Employee code Incorrect..' });
            }
          } else {
            Swal.fire({ text: 'Employee code Incorrect..' });
          }
        }, (err) => {
          Swal.fire({ html: err.error });
        }));
      }

      enterIssueOption(event: any) {
        if (event.key === 'Enter') {
          if (this.issueOption === null || this.issueOption === undefined || this.issueOption === '') {
            if (this.issueTYpe === 'ISSUES_FREE') {
              setTimeout(() => { Swal.fire({ text: 'Enter the recommended name' }); }, 300);
            } else if (this.issueTYpe === 'ISSUES_VEHICLE') {
              setTimeout(() => { Swal.fire({ text: 'Enter the current meter' }); }, 300);
            } else if (this.issueTYpe === 'ISSUES_FREE_STAFFISS' || this.issueTYpe === 'ISSUES_WASTAGE') {
              setTimeout(() => { Swal.fire({ text: 'Enter the Reason' }); }, 300);
            } else if (this.issueTYpe === 'ISSUES_SAMPLE') {
              setTimeout(() => { Swal.fire({ text: 'Enter the employee code' }); }, 300);
            }
          } else if (this.issueTYpe === 'ISSUES_FREE' || this.issueTYpe === 'ISSUES_WASTAGE') {
            this.selectFocus('getApprovedBy');
          } else if (this.issueTYpe === 'ISSUES_FREE_STAFFISS') {
            this.selectFocus('getApprovedBy');
          } else {
            this.selectFocus('reason');
          }
        }
      }

      enterApprBy(event: any) {
        if (event.key === 'Enter') {
          if (this.issueOption === null || this.issueOption === undefined || this.issueOption === '') {
            if (this.issueTYpe === 'ISSUES_SAMPLE') {
              setTimeout(() => { Swal.fire({ text: 'Enter the Reason' }); }, 300);
            } else if (this.issueTYpe === 'ISSUES_VEHICLE') {
              setTimeout(() => { Swal.fire({ text: 'Enter the current fuel stock' }); }, 300);
            } else if (this.issueTYpe === 'ISSUES_RETURN') {
              setTimeout(() => { Swal.fire({ text: 'Enter the Reason' }); }, 300);
            } else {
              setTimeout(() => { Swal.fire({ text: 'Enter the approved by name' }); }, 300);
            }
          } else {
            this.selectFocus('next');
            setTimeout(() => {
              this.selectNext();
            }, 100);
          }
        }
      }

      openApprDialog() {
        let dialogData: any;
        const dialogRef = this.dialog.open(CommonAuthourityComponent, {
          width: '450px',
          height: 'auto',
          autoFocus: false,
          data: {
            dialogType: 'ALL',
            data: 'N/A',
            authorityFlg: 'DcDelete_ThumbApproval',
            smsCaption: `${this.globals.gmainMenuSelected}_Approval`,
            keyCaption: 'DcInOffline',
          },
        });
        setTimeout(() => {
          document.getElementById('authority')?.focus();
        }, 500);
        dialogRef.afterClosed().subscribe((result) => {
          dialogData = result;
          if (dialogData === undefined) {
            Swal.fire({ text: 'Authentication failed!' });
          } else if (dialogData.event === 'Success') {
            this.approvedBy = dialogData.approvalAuthname;
            this.selectNext();
          } else {
            Swal.fire({ text: 'Get approved name failed' });
          }
        });
      }

      selectView() {
        this.trnFrdate = this.today;
        this.trntodate = this.today;
        this.isOption = 'IssueView';
      }

      selectCancel() {
        this.isOption = 'IssueSave';
      }

      saveOption() {
        this.individuals = this.globals.issueItems;
        if (this.individuals.length > 0) {
          Swal.fire({
            title: 'Are you sure to Save?',
            showCancelButton: true,
            confirmButtonText: 'YES',
            cancelButtonText: 'NO',
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#ff80ab',
          }).then(
            (result) => {
              if (result.value) {
                this.toItems();
              } else if (result.dismiss === Swal.DismissReason.cancel) { }
            },
          );
        } else {
          Swal.fire({ text: 'Enter the issue items' });
        }
      }

      toItems() {
        let items = '';
        this.individuals.forEach((e: any) => {
          items = `${items + e.icode}|${e.iqty}|NP|Nil|` + '1' + '|' + 'Tray' + '~';
        });
        this.inventry.fdate = this.changeFinalDateFormat(this.today);
        this.inventry.ReqSub = this.issueTo;
        this.inventry.Subcat = this.issueOption;
        this.inventry.StkWhCode = this.approvedBy;
        this.inventry.Cat = this.fromBrcode;
        this.inventry.phyqty = this.issueTYpe;
        this.inventry.var1 = items.substring(0, items.length - 1);
        this.saveItems();
      }

      saveItems() {
        let saveItems = [];
        this.inventry.icode = '0';
        this.inventry.ReqMain = 'GoodsOutSave';
        this.progressval = 'indeterminate';
        this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
          saveItems = result;
          this.progressval = '';
          if (saveItems.length > 0) {
            if (saveItems[0].statusMsg === 'Sucees') {
              this.childGames.forEach((c) => c.clear());
              Swal.fire({ text: 'Issue Save Success', timer: 800 });
              if (this.globals.gprinterForterminal4080 === '40') {
                this.printDiv02(this.changeFinalDateFormat(saveItems[0].TrnDate), saveItems[0].TrnNo);
              } else {
                Swal.fire({ text: 'Thermal Printer Not Connected' });
              }
              this.issueControl.reset();
              this.individuals = []; this.globals.issueItems = [];
              this.issueTo = ''; this.issueOption = ''; this.approvedBy = '';
              this.isSelection = true; this.isItems = false; this.empname = undefined;
              this.vehSearchControl.reset();
            } else {
              Swal.fire({ text: saveItems[0].statusMsg });
            }
            this.progressval = '';
          } else {
            Swal.fire({ text: 'Issue Saved Failed' });
          }
        }, (err) => {
          this.progressval = '';
          Swal.fire({ html: err.error });
        }));
      }

      loading = false;

      getViwelist() {
        this.inventry.ReqMain = 'GTNViewAllDate';
        this.inventry.Cat = this.fromBrcode;
        this.inventry.phyqty = this.issueTYpe;
        this.inventry.fdate = this.changeFinalDateFormat(this.trnFrdate);
        this.inventry.tdate = this.changeFinalDateFormat(this.trntodate);
        this.individuals = [];
        this.loading = true;
        this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
          this.individuals = result;
          this.progressval = '';
          this.loading = false;

          if (this.individuals.length > 0) {
            this.isSelection = false; this.isItems = true;
            this.isViewoption = 'chooseview';
          } else {
            Swal.fire({ text: 'Data not found' });
          }
        }, (err) => {
          this.loading = false;

          this.progressval = '';
          Swal.fire({ html: err.error });
        }));
      }

      getviweByid(trndate: any, trnnum: any, Template: TemplateRef<any>) {
        this.printTotal = 0;
        this.inventry.ReqMain = 'GTNViewDateSno';
        this.inventry.var2 = this.changeFinalDateFormat(trndate); // trn date
        this.inventry.var3 = trnnum; // trn num
        this.inventry.phyqty = this.issueTYpe;
        this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
          this.datalist = result;
          this.progressval = '';
          this.printTotal = 0;
          if (this.datalist.length > 0) {
            if (this.datalist[0].Result === 'Success') {
              this.datalist.forEach((element: any) => {
                this.printTotal += (element.qty * element.irate);
              });
              this.dcoutItems = this.datalist[0];
              this.isSelection = false; this.isItems = false;
              this.isView = true;
              this.dialog.open(Template, {
                minWidth: '95vw', maxHeight: '99vh', autoFocus: false, panelClass: 'gDialogBox',
              });
            } else {
              Swal.fire({ text: 'Data not found' });
            }
          } else {
            Swal.fire({ text: 'Data not found' });
          }
        }, (err) => {
          this.progressval = '';
          Swal.fire({ html: err.error });
        }));
      }

      printDiv02(date: any, trnNo: any) {
        if (this.globals.gprinterForterminal4080 === '40') {
          this.inventry.ReqMain = 'DcOutprinting';
          this.inventry.var2 = date;
          this.inventry.var3 = trnNo;
          this.inventry.fdate = this.inventryService.apiUrl;
          this.inventry.tdate = this.globals.gNetworkprinterIp;
          this.subs.add(this.inventryService.getBody(this.inventry).subscribe((print:any) => {
            const printList = print;
            if (printList[0].statusMsg === 'Done') {
              Swal.fire({ text: 'Printing complete' });
            } else {
              Swal.fire({ text: printList[0].errorMsg });
            }
          }, (err: any) => {
            this.progressval = '';
            Swal.fire({ html: err.error });
          }));
        } else if (this.globals.gprinterForterminal4080 === '80') {
        }
      }

      openDialog(trnNo: any, i: any) {
        let dialogData: any; let List = [];
        const dialogRef = this.dialog.open(CommonAuthourityComponent, {
          width: '450px',
          data: {
            dialogType: 'OTPONLY',
            data: trnNo,
            authorityFlg: 'DcDelete_ThumbApproval',
            smsCaption: `${this.globals.gmainMenuSelected}_Deletion`,
            keyCaption: '0',
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          dialogData = result;
          if (dialogData === undefined) {

          } else if (dialogData.event === 'Success') {
            this.progressval = 'indeterminate';

            const tdate = this.individuals.find((x:any) => x.TrnNo === dialogData.data)?.todaydate;

            this.inventry.ReqMain = 'DeleteGTNDateSno';
            this.inventry.var1 = dialogData.approvalAuthname;
            this.inventry.var2 = this.changeFinalDateFormat(tdate);
            this.inventry.var3 = dialogData.data;
            this.subs.add(this.inventryService.getReport(this.inventry).subscribe((data) => {
              this.progressval = '';
              List = data;
              if (List.length > 0) {
                if (List[0].StatusMsg) {
                  if (List[0].StatusMsg === 'Success') {
                    this.individuals.splice(i, 1);
                    this.progressval = '';
                    Swal.fire({ text: 'Issue Delete Success' });
                  } else if (List[0].StatusMsg !== 'Success') {
                    this.progressval = '';
                    Swal.fire({ text: List[0].StatusMsg });
                  }
                } else if (List[0].Result === 'Success') {
                  this.individuals.splice(i, 1);
                  this.progressval = '';
                  Swal.fire({ text: 'Issue Delete Success' });
                } else if (List[0].Result !== 'Success') {
                  this.progressval = '';
                  Swal.fire({ text: List[0].Result });
                }
              } else {
                this.progressval = '';
                Swal.fire({ text: ' Issue Delete Failed' });
              }
            }, (err) => {
              this.progressval = '';
              Swal.fire({ html: err.error });
            }));
          } else {
            Swal.fire({ text: ' Issue Delete Failed' });
          }
        });
      }

      selectFocus(option: any) {
        setTimeout(() => {
          document.getElementById(option)?.focus();
        }, 100);
      }

      backNavigation() {
        this.globals.issueItems = [];
        this.router.navigate(['/dashboard']);
      }

      homeNavigate() {
        this.globals.issueItems = [];
        this.globals.SelectDashboard = 'GROUPLIST';
        this.router.navigate(['/dashboard']);
      }

      @ViewChildren(SelectItemsComponent)
      childGames: QueryList<SelectItemsComponent>

      saveOption1() {
        if (this.issueTYpe === 'RT_TO_SUP') {
          if (this.supSearchControl.invalid || this.issueTo === '' || this.issueTo === null || this.issueTo === undefined) {
            Swal.fire({ text: 'select supplier name' });
            return;
          }
          if (typeof this.supSearchControl.value !== 'object') {
            Swal.fire({ text: 'select valid supplier name' });
            return;
          }
          if (this.supSearchControl.value === '' || this.supSearchControl.value === null || this.supSearchControl.value === undefined) {
            Swal.fire({ text: 'select supplier name ' });
            return;
          } if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Select vehicle number ' });
            return;
          }
        } else if (this.issueTYpe === 'ISSUES_BROKEN') {
          if (this.issueControl.invalid || this.issueTo === '' || this.issueTo === null || this.issueTo === undefined) {
            Swal.fire({ text: 'Enter the broken name' });
            return;
          }
          if (typeof this.issueControl.value !== 'object') {
            Swal.fire({ text: 'Enter the valid broken name' });
            return;
          }
          if (this.issueControl.value === '' || this.issueControl.value === null || this.issueControl.value === undefined) {
            Swal.fire({ text: 'Enter the broken name' });
            return;
          } if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Enter the approved by name' });
            return;
          }
        } else if (this.issueTYpe === 'ISSUES_FREE') {
          if (this.issueControl.invalid || this.issueTo === '' || this.issueTo === null || this.issueTo === undefined) {
            Swal.fire({ text: 'Enter the customer name' });
            return;
          }
          if (typeof this.issueControl.value !== 'object') {
            Swal.fire({ text: 'Enter the valid customer name' });
            return;
          }
          if (this.issueControl.value === '' || this.issueControl.value === null || this.issueControl.value === undefined) {
            Swal.fire({ text: 'Enter the customer name' });
            return;
          } if (this.issueOption === '' || this.issueOption === null || this.issueOption === undefined) {
            Swal.fire({ text: 'Enter the recommended name' });
            return;
          } if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Enter the approved by name' });
            return;
          }
        } else if (this.issueTYpe === 'ISSUES_WASTAGE') {
          if (this.issueOption === '' || this.issueOption === null || this.issueOption === undefined) {
            Swal.fire({ text: 'Enter the reason' });
            return;
          } if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Enter the approved by name' });
            return;
          }
        } else if (this.issueTYpe === 'ISSUES_VEHICLE') {
          if (this.issueControl.invalid || typeof this.issueControl.value !== 'object' || this.issueTo === '' || this.issueTo === null || this.issueTo === undefined) {
            Swal.fire({ text: 'Enter the Issue To' });
            return;
          }
          if (typeof this.issueControl.value !== 'object') {
            Swal.fire({ text: 'Enter the valid Issue To' });
            return;
          } if (this.issueOption === '' || this.issueOption === null || this.issueOption === undefined) {
            Swal.fire({ text: 'Enter the current meter' });
            return;
          } if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Enter the current fuel stock' });
            return;
          }
        } else if (this.issueTYpe === 'ISSUES_FREE_STAFFISS') {
          if (this.issueControl.invalid || this.issueTo === '' || this.issueTo === null || this.issueTo === undefined) {
            Swal.fire({ text: 'Enter the issue to ' });
            return;
          } if (typeof this.issueControl.value !== 'object') {
            Swal.fire({ text: 'Enter the valid issue to ' });
            return;
          }
          if (this.issueOption === '' || this.issueOption === null || this.issueOption === undefined) {
            Swal.fire({ text: 'Enter the reason' });
            return;
          } if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Enter the approved by name' });
            return;
          }
        } else if (this.issueTYpe === 'ISSUES_SAMPLE') {
          if (this.issueTo === '' || this.issueTo === null || this.issueTo === undefined) {
            Swal.fire({ text: 'Enter the customer name' });
            return;
          } if (this.empname === '' || this.empname === null || this.empname === undefined) {
            Swal.fire({ text: 'Enter the employee code' });
            return;
          } if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Enter the reason' });
            return;
          }
        } else if (this.issueTYpe === 'ISSUES_RETURN') {
          if (this.issueControl.value === '' || this.issueControl.value === null || this.issueControl.value === undefined) {
            Swal.fire({ text: 'select Destination Branch' });
            return;
          }
          if (typeof this.issueControl.value !== 'object') {
            Swal.fire({ text: 'select valid Destination' });
            return;
          } if (this.vehSearchControl.value === '' || this.vehSearchControl.value === null || this.vehSearchControl.value === undefined) {
            Swal.fire({ text: 'Select vehicle number' });
            return;
          }
          if (typeof this.vehSearchControl.value !== 'object') {
            Swal.fire({ text: 'Select valid vehicle number' });
            return;
          } if (this.issueOption === '' || this.issueOption === null || this.issueOption === undefined) {
            Swal.fire({ text: 'Enter the reason' });
            return;
          }
        }
        setTimeout(() => {
          this.saveOption();
        }, 100);
      }

      selectNext() {
        if (this.issueTYpe === 'RT_TO_SUP') {
          if (this.supSearchControl.invalid || this.issueTo === '' || this.issueTo === null || this.issueTo === undefined) {
            Swal.fire({ text: 'select supplier name' });
            return;
          }
          if (typeof this.supSearchControl.value !== 'object') {
            Swal.fire({ text: 'select valid supplier name' });
            return;
          }
          if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Select vehicle number ' });
            return;
          }
          this.isSelection = false; this.isItems = true; this.issueOption = '0';
        } else if (this.issueTYpe === 'ISSUES_BROKEN') {
          if (this.issueControl.invalid || this.issueTo === '' || this.issueTo === null || this.issueTo === undefined) {
            Swal.fire({ text: 'Enter the broken name' });
            return;
          }
          if (typeof this.issueControl.value !== 'object') {
            Swal.fire({ text: 'Enter the valid broken name' });
            return;
          } if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Enter the approved by name' });
            return;
          }
          this.isSelection = false; this.isItems = true; this.issueOption = '0';
        } else if (this.issueTYpe === 'ISSUES_FREE') {
          if (this.issueControl.invalid || this.issueTo === '' || this.issueTo === null || this.issueTo === undefined) {
            Swal.fire({ text: 'Enter the customer name' });
            return;
          }
          if (typeof this.issueControl.value !== 'object') {
            Swal.fire({ text: 'Enter the valid customer name' });
            return;
          }
          if (this.issueOption === '' || this.issueOption === null || this.issueOption === undefined) {
            Swal.fire({ text: 'Enter the recommended name' });
            return;
          } if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Enter the approved by name' });
            return;
          }
          this.isSelection = false; this.isItems = true;
        } else if (this.issueTYpe === 'ISSUES_WASTAGE') {
          if (this.issueOption === '' || this.issueOption === null || this.issueOption === undefined) {
            Swal.fire({ text: 'Enter the reason' });
          } else if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Enter the approved by name' });
          } else {
            this.isSelection = false; this.isItems = true; this.issueTo = '0';
          }
        } else if (this.issueTYpe === 'ISSUES_VEHICLE') {
          if (this.issueControl.invalid || this.issueTo === '' || this.issueTo === null || this.issueTo === undefined) {
            Swal.fire({ text: 'Enter the Issue To' });
            return;
          }
          if (typeof this.issueControl.value !== 'object') {
            Swal.fire({ text: 'Enter the valid Issue To' });
            return;
          } if (this.issueOption === '' || this.issueOption === null || this.issueOption === undefined) {
            Swal.fire({ text: 'Enter the current meter' });
            return;
          } if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Enter the current fuel stock' });
            return;
          }
          this.isSelection = false; this.isItems = true;
        } else if (this.issueTYpe === 'ISSUES_FREE_STAFFISS') {
          if (this.issueControl.invalid || this.issueTo === '' || this.issueTo === null || this.issueTo === undefined) {
            Swal.fire({ text: 'Enter the issue to ' });
            return;
          } if (typeof this.issueControl.value !== 'object') {
            Swal.fire({ text: 'Enter the valid issue to ' });
            return;
          }

          if (this.issueOption === '' || this.issueOption === null || this.issueOption === undefined) {
            Swal.fire({ text: 'Enter the reason' });
            return;
          } if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Enter the approved by name' });
            return;
          }
          this.isSelection = false; this.isItems = true;
        } else if (this.issueTYpe === 'ISSUES_SAMPLE') {
          if (this.issueTo === '' || this.issueTo === null || this.issueTo === undefined) {
            Swal.fire({ text: 'Enter the customer name' });
            return;
          } if (this.empname === '' || this.empname === null || this.empname === undefined) {
            Swal.fire({ text: 'Enter the employee code' });
            return;
          } if (this.approvedBy === '' || this.approvedBy === null || this.approvedBy === undefined) {
            Swal.fire({ text: 'Enter the reason' });
            return;
          }
          this.isSelection = false; this.isItems = true;
        } else if (this.issueTYpe === 'ISSUES_RETURN') {
          if (this.issueControl.value === '' || this.issueControl.value === null || this.issueControl.value === undefined) {
            Swal.fire({ text: 'select Destination Branch' });
            return;
          }
          if (typeof this.issueControl.value !== 'object') {
            Swal.fire({ text: 'select valid Destination' });
            return;
          } if (this.vehSearchControl.value === '' || this.vehSearchControl.value === null || this.vehSearchControl.value === undefined) {
            Swal.fire({ text: 'Select vehicle number' });
            return;
          }
          if (typeof this.vehSearchControl.value !== 'object') {
            Swal.fire({ text: 'Select valid vehicle number' });
            return;
          } if (this.issueOption === '' || this.issueOption === null || this.issueOption === undefined) {
            Swal.fire({ text: 'Enter the reason' });
            return;
          }
          this.isSelection = false; this.isItems = true;
        }
        setTimeout(() => {
          this.childGames.forEach((c) => c.itemShow());

          document.getElementById('icode')?.focus();
        }, 200);
      }

      onTabChanged = (tabIndex:Number) => {
        if (tabIndex === 1) {
          this.selectView();
          this.individuals = [];
        } else {
          this.selectCancel();
        }
      }

      selectEvent(event: any, id: any) {
        if (event.key === 'Enter' && event.target.value !== '') {
          document.getElementById(id)?.focus();
        }
      }

      XLExportBranchMapTable(tabledata) {
        if (tabledata.length > 0) {
          this.commonservice.exportAsExcelFile(tabledata, `${this.header}_ISSUE`);
        } else {
          this.commonservice.openSnackbar('No data To Export', 'Ok', 1500);
        }
      }

      itemShow() {
        this.showcontent = !this.showcontent;
      }

      displaySupplier(user: any): string {
        return user && user.Branch_Name ? user.Branch_Name : '';
      }

      displayBr(user: any): string {
        return user && user.brname ? user.brname : '';
      }

      displayVehicle(user: any): string {
        return user && user.vehicleno ? user.vehicleno : '';
      }
}

/* eslint-disable no-shadow */
/* eslint-disable no-empty */
/* eslint-disable no-dupe-else-if */
/* eslint-disable eqeqeq */
/* eslint-disable no-lonely-if */
/* eslint-disable prefer-const */
/* eslint-disable no-self-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-mixed-operators */
/* eslint-disable radix */
/* eslint-disable no-new-wrappers */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-concat */
import {
  Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime, distinctUntilChanged, filter, firstValueFrom, fromEvent, merge,
} from 'rxjs';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { Globals } from 'src/app/globals';
import { RecordsService } from 'src/app/services/records.service';
import { CommonService } from 'src/app/services/common.service';
import { groupBy } from 'lodash';
import { HttpClient } from '@angular/common/http';

declare let $: any;

interface invPreModel {
  gkSgstPerc: any;
  gkCgstPerc: any;
  SerTaxApplicablityITMTERM: any;
  servicetaxper: any;
  SertaxReq: any;
  HallRent_servicetaxper: any;
  StatusMsg: String;
  GSToutdoorPerCnt: String;
  gkGstGdsServSacCode: String;
  CreditBillAfterApprovalOnly: String;
  EnableSeperateCashier: String;
  ResaleExportGST: String;
  eInvoiceMust: String;
  gkInvPrintMethod: String;
  TcsPercentRegCust: String;
  UnTcsPercentUnRegCust: String;
  Credit_Sales_Allow: String;
  CoinageRoundOff: String;
  GSTDoorDly: String;
  GSThallPerCnt: String;
  Roomservice: String;
  discDaywiseFortercode:number;
  ItemRepeatAllow:string;
  WMLockedYesNo:string;
}

interface Item {
  itemCode: number;
  itemName: string;
  argQty: number;
  uom: string;
  itemRate: number;
  itemImg: string;
  itemDesc: string;
  itemPNP: string;
  itemGst: number;
  itemCess: number;
  itemDisc: number;
  itemServSuply: string;
  itemTotal: number;
  itemDiscAmt: number;
  itemTaxableAmt: number;
  itemSgstIgst_11: number;
  itemCgst_12: number;
  itemHsn_17: number;
  itemSgstIgstAmt: number;
  itemCgstAmt: number;
  itemCessAmt: number;
  itemGstAmt: number;
  itemGrossAmt: number;
  itemGoodsSevice_20: string;
  itemGetFrom: string;
  itmEditAlw: string;
  salesManId: string;
  reqtdOptn : string;
}

@Component({
  selector: 'app-orderInvoiceBill',
  templateUrl: './orderInvoiceBill.component.html',
  styleUrls: ['./orderInvoiceBill.component.css'],
})
export class OrderInvoiceBillComponent implements OnInit {
  private subs = new SubSink();

  @ViewChild('qtySel', { static: true }) qtySel: ElementRef;

  @ViewChild('icodeSel', { static: true }) icodeSel: ElementRef;

  @ViewChild('confirmSub', { static: true }) confirmBtn : ElementRef;

  @Output() itemcountChangedval: EventEmitter<number> = new EventEmitter();

  @Output() invAmtChangedval: EventEmitter<number> = new EventEmitter();

  searchItmresult: any = [];

  myTables: any = [];

 myItemDescs: any = [];

 invAmtInt = 0;

 invAmtPaise = 0;

  items: Item[] = [];

 progressval = '';

 ItemDetails = '';

  expand = false;

 dragToggle = false;

  public tblItemSelection: FormGroup;

  public favItemSelection: FormGroup;

 addItemdgle = false;

  public tblSelected = '';

 itmSelectedval = '';

 rateSelectedval = '';

 icodeselected = 0;

 selUom = '';

 icodeLiveInterpollation = '';

  public toPay = 0;

 totQtyCntDisply = 0;

 parcelYN = 'NP';

 stkChkvar = '';

 cart = '';

 selFIcode = 0;

  public total = 0;

 gstTotal = 0;

 deliveryCharges = 0;

 disamt = 0;

 qty_rate_dis = 0;

  private loadMyCartDone = 'N';

 sgstamt = 0;

 cgstamt = 0;

 cessamt = 0;

 finalamt = 0;

  public gitmTot = 0;

 qtySelected = 0;

 selitemRate = 0;

 selitemImg = '';

 selitemDesc = '';

  public selGst = 0;

 selCess = 0;

 selDiscper = 0;

 selServSuply = '';

 currentDivselected = false;

  varRejectOpt = false;

 varConfirmCaption = 'Confirm Order';

 TblServeSmsNeedYN = 'No';

 newCust = 'No';

  totdis = 0;

 favItemCart: any;

  searchItemFc: FormControl = new FormControl();

  searchItemFav: FormControl = new FormControl();

  productadded: boolean;

 qtyXrate: number;

 totalSgst: number;

 totalCgstamt: number;

 totalSgstamt: number;

 toalCessamt: any;

 discount: number = this.globals.gCustdisper;

  totalTaxable: number = 0;

 taxExmptnYN: any;

 selHsnCode: any;

 selGoods_Service: any;

 favItemsList = []

  invPreReqData: invPreModel[] = [];

  favitemDtsData: Object;

  viewFavGroupData: any = [];

  viewFavGroupName: any = [];

  selectedFavItem: any = [];

  isload: boolean;

  tempFavIcode: number;

  toPayBeforeRndoff: number = 0;

  chkRndOff: any;

  totalCoinage: any;

  cashRecdFormGrp: FormGroup;

  custdivsel: boolean = false;

  isLinear = false;

  getScreenWidth: number;

  getScreenHeight: number;

  tableHeight: number = 290;

  custcode: any;

  discpercent: number;

  discDaywiseFortercode: number;

  customerSelection: FormGroup;

  sellcItemGetFrom: any;

  sellclsItmEditAlw: any;

  selSalesManId: string;

  selReqtdOptn: string;

  wmDataShow:boolean = false;

  weighingMechineData: any[] = [];

  wmDataHeader: string[];

 additionalText = ''

  itemGetFor: string = '0';

  shortcutData = [
    // {
    //     "keys": "Ctrl/Cmd + V",
    //     "description": "Pressing Ctrl/Cmd and V keys together will prevent pasting on this page."
    // },
    {
      keys: 'F2',
      description: 'Open or close the item rate check option.',
    },
    {
      keys: 'F3',
      description: 'View the weighing machine data.',
    },
    {
      keys: 'Alt + I',
      description: 'To enter item code ',
    },
    {
      keys: 'Alt + P',
      description: 'For parcel',
    },
    {
      keys: 'Alt + Q',
      description: 'To enter quantity',
    },
    {
      keys: 'Space',
      description: 'Pressing the Space from item code field, focus to the sales person input field.',
    },
    {
      keys: 'Alt + Z',
      description: 'For discount',
    },
    {
      keys: 'Alt + V',
      description: 'Search item name ',
    },
    {
      keys: 'Alt + X',
      description: 'Close Billing.',
    },
    {
      keys: 'Alt + C',
      description: 'Clear screen and cart',
    },
    {
      keys: 'Alt + F',
      description: 'Favorite items',
    },
  ]

  itemSerchmodelisOpen: boolean = false;

  constructor(
private router: Router,
    private myGService: RecordsService,
    private globals: Globals,
    private commonService: CommonService,
private http: HttpClient,
  ) {
    this.commonService.apiUrl = this.globals.gApiserver;
    this.commonService.reqSendto = 'approvalReqTwo';
    // /api/getApproveV1
    // console.log(this.globals.gmainMenuSelected == 'CounterMnlWmOrdBill');
    this.favItemCart = `favItemCart_${this.globals.gUsrid}`;
    this.cart = `cart_${this.globals.gTerCode}`;

    this.tblItemSelection = new FormGroup({
      icodeSel: new FormControl('', Validators.required),
      itemNameSel: new FormControl({ value: '', disabled: true }, Validators.required),
      rateSel: new FormControl({ value: '', disabled: true }),
      uomSel: new FormControl({ value: '', disabled: true }),
      qtySel: new FormControl('', Validators.required),
      itemDesc: new FormControl(),
      parcelSel: new FormControl(),
      descSel: new FormControl(),
      itmSerchT: new FormControl(),
    });
    this.favItemSelection = new FormGroup({
      icodeSel: new FormControl('', Validators.required),
      itemNameSel: new FormControl('', Validators.required),
      rateSel: new FormControl({ value: '', disabled: true }),
      grpName: new FormControl('', Validators.required),
    });

    this.customerSelection = new FormGroup({
      searchCustomerFc: new FormControl('', Validators.required),
      salesMan: new FormControl({ value: '', disabled: true }, Validators.required),
      discPernt: new FormControl(''),
      grpName: new FormControl('', Validators.required),
    });

    this.itemNameSearch();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.autoHeightForTable();
  }

  @HostListener('paste', ['$event']) onPaste(e: any) {
    e.preventDefault();
  }

  autoHeightForTable() {
    if (this.getScreenWidth > 1200) {
      this.tableHeight = 270;
    }
    if (this.getScreenWidth > 995 && this.getScreenWidth < 1200) {
      this.tableHeight = 295;
    }
    if (this.getScreenWidth > 760 && this.getScreenWidth < 995) {
      this.tableHeight = 320;
    }
    if (this.getScreenWidth > 600 && this.getScreenWidth < 760) {
      this.tableHeight = 425;
    }
    if (this.getScreenWidth > 250 && this.getScreenWidth < 600) {
      this.tableHeight = 485;
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    const cart = localStorage.getItem(this.cart);
    const stringifyItemsData = this.chngItemArrayToStrig();
    if (cart !== stringifyItemsData) {
      this.setItemsToLS();
      return false;
    }
    return true;
  }

  @HostListener('document:keyup', ['$event']) onKeyUp(ev: KeyboardEvent) {
    if (ev.code === 'ShiftRight') {
      this.NextGoclick();
    }
    // if (ev.code === 'ShiftLeft') {
    //   this.goBack();
    //   return
    // }
  }

  // * Navigation Block
  NextGoclick() {
    this.globals.gdivOptSelected = 'ItemSelection';
    // if(!!this.customerSelection.get('salesMan').value){
    //   this.kotFormSubit()
    //   return
    // }

    this.kotFormSubit();

    // if(!this.focusedElement){
    //   this.kotFormSubit()

    // }
    // this.globals.gCustdisper = 0;
    // this.router.navigate(['/PosInvoice/invpayment']);
    // this.router.navigate(['/SalesClnt/kot']);
  }

  goBack() {
    this.router.navigate(['dashboard']);
    this.globals.gCustdisper = 0;
  }

  testPrint() {
    this.router.navigate(['/SalesClnt/testprint']);
  }

  // * initial Load
  ngOnInit() {
    if (this.globals.gCustcode !== '0') {
      this.custdivsel = true;
      this.customerSelection.get('searchCustomerFc').setValue(this.globals.gCustNameseld);
      this.customerSelection.get('discPernt').setValue(this.globals.gCustdisper);
      this.custcode = this.globals.gCustcode;
      this.checkDisc();
    }

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.autoHeightForTable();

    if (this.globals.gmainMenuSelected === 'KOT') {
      this.tblSelected = `TABLE ${this.globals.gTblSelected} - ${this.globals.gCustSelected}`;
    } else if (this.globals.gmainMenuSelected === 'PARCELV2') {
      this.tblSelected = 'PARCEL BILLING';

      this.tblItemSelection.patchValue({ parcelSel: true });
      this.tblItemSelection.get('parcelSel').disable();
    } else if (this.globals.gmainMenuSelected === 'SELFV2') {
      this.tblSelected = 'SELF SERVICE';
    } else if (this.globals.gmainMenuSelected === 'COUNTERV2') {
      this.tblSelected = 'COUNTER BILLING';
    }

    this.shortcuts(); // observable
    this.globals.gBeginTran = '';
    this.getDescriptionList();
    this.invoicePreRequist();
    this.icodeSel.nativeElement.focus();
    // this.loadFavItemCart()
    this.viewFavGroups();
    this.getFavItemToClient();
    this.grpNameChange();
    this.customerSearch();
  }

  customerSearch() {
    this.subs.add(
      this.commonService.autoComplete(this.customerSelection.get('searchCustomerFc').valueChanges).subscribe((myvardatas) => {
        this.myGService.getapprovalReqJson(
          'CustomerSearch',
          '0',
          myvardatas,
          this.globals.gUsrid,
          '0',
          '0',
          '0',
          0,
          '0',
          '0',
          '0',
          '0',
          '0',
        )
          .subscribe({
            next: (data) => {
              this.searchItmresult = data;
              this.searchItmresult = this.searchItmresult.splice(0, 200);
            },
            error: (err) => this.logError(err),
          });
      }),
    );
  }

  checkDisc() {
    if (this.custcode === '0' || this.custcode === null || this.custcode === '0') {
      if (this.custdivsel === true) { Swal.fire('Select customer name'); return; }
    }

    this.progressval = 'indeterminate';
    this.subs.add(this.myGService.getapprovalReqJson(
      'GetDiscountAppValue',
      this.custcode,
      0,
      this.globals.gUsrid,
      0,
      0,
      0,
      0,
      0,
      0,
      '0',
      '0',
      this.globals.gTerCode,
    )
      .subscribe({
        next: (data) => {
          this.checkRecordExists(data);
        },
        error: (err) => this.logError(err),
      }));
  }

  checkRecordExists(data:any) {
    this.discDaywiseFortercode = this.invPreReqData[0]?.discDaywiseFortercode;
    this.progressval = '';
    if (data.length === 0) {
      if (this.discDaywiseFortercode > 0 || data[0].discApproved === 0) {
        this.customerSelection.get('discPernt').setValue(0);
        this.discpercent = 0; this.globals.gCustdisper = 0;
        Swal.fire('No discount approved for this customer');
        this.globals.gCustdisper = this.discDaywiseFortercode; this.discpercent = this.discDaywiseFortercode;
        this.customerSelection.get('discPernt').setValue(this.discpercent);
      }
    } else if (data[0].discApproved > 0) {
      this.discpercent = data[0].discApproved;
      this.globals.gCustdisper = this.discpercent;
      this.customerSelection.get('discPernt').setValue(this.discpercent);
    } else {
      this.globals.gCustdisper = this.discDaywiseFortercode; this.discpercent = this.discDaywiseFortercode;
      this.customerSelection.get('discPernt').setValue(this.discpercent);
    }

    setTimeout(() => {
      document.getElementById('discPernt').focus();
    }, 300);

    this.loadCart();
  }

  onChangeslide(value:any) {
    if (value.checked === true) {
      this.custdivsel = true;
      this.customerSelection.get('searchCustomerFc').setValue('');
      this.customerSelection.get('discPernt').setValue(0);
      this.custcode = '0';
      this.globals.gCustcode = '0';
      this.globals.gCustdisper = 0;
    } else {
      this.custdivsel = false;
      this.customerSelection.get('searchCustomerFc').setValue('');
      this.customerSelection.get('discPernt').setValue(this.invPreReqData[0].discDaywiseFortercode);
      this.custcode = '0';
      this.globals.gCustcode = '0';
      this.globals.gCustdisper = this.invPreReqData[0].discDaywiseFortercode;
    }

    // this.checkDisc();
  }

  getSelectedCustcode(e:any, argvalue:any) {
    if (e.source.selected) {
      console.log(argvalue);
      this.globals.gCustNameseld = argvalue.custname;
      this.custcode = argvalue.custcode;
      this.globals.gCustcode = this.custcode;
      this.customerSelection.get('discPernt').setValue('');
      this.discpercent = 0;
      this.checkDisc();
    }
    // this.globals.gCustNameseld = argvalue.split(':')[0]
    // const stPosition = argvalue.indexOf(':');
    // this.custcode = argvalue.substr(stPosition + 1, 20);
    // this.globals.gCustcode = this.custcode
    // this.customerSelection.get('discPernt').setValue('');
    // this.discpercent = 0;
    // this.checkDisc();
  }
  // loadFavItemCart(){
  //   if(JSON.parse(localStorage.getItem(this.favItemCart)) !== null){
  //     this.favItemsList = JSON.parse(localStorage.getItem(this.favItemCart))
  //   }
  // }

  invoicePreRequist() {
    this.invPreReqData = [];
    const api = {
      reqMainreq: 'InvoicePrerequisite', raFlag: this.globals.gTerCode, aprStatus: '', Usr: this.globals.gUsrid, reqfromDTAP: '0', reqfromIp: '0', TrnNo: '0', brcode: this.globals.gBrcode, appby: '0', splreason: '0', extra1: '0', extra2: '0', extra3: '0',
    };

    this.subs.add(this.commonService.sendReqst(api).subscribe({
      next: (data) => {
        if (data) {
          this.invPreReqData.push(data[0]);

          if (this.globals.gCustdisper === 0) {
            this.customerSelection.get('discPernt').setValue(this.invPreReqData[0].discDaywiseFortercode);
          } else {
            this.customerSelection.get('discPernt').setValue(this.globals.gCustdisper);
          }

          this.customerSelection.get('salesMan').setValue(this.myGService.salesManid);
          this.loadCart();
        } else {
          this.commonService.showStatusPopup('No records found from invioce pre request');
        }
      },
      error: (err) => {
        this.commonService.showStatusPopup(err.message);
      },
    }));
  }

  itemNameSearch() {
    merge(this.searchItemFc.valueChanges, this.favItemSelection.get('itemNameSel').valueChanges).pipe(filter((res) => res !== null && res !== ''), debounceTime(600), distinctUntilChanged())
      .subscribe((myvardatas) => {
        this.myGService.getapprovalReqJson(
          'ItemSearch',
          this.globals.gRateoption,
          myvardatas,
          this.globals.gUsrid,
          '0',
          '0',
          '0',
          0,
          '0',
          '0',
          '0',
          '0',
          '0',
        )
          .subscribe({
            next: (data) => {
              this.searchItmresult = data;
            },
            error: (err) => {
              this.logError(err);
            },
          });
      });
  }

  getDescriptionList() {
    this.subs.add(this.myGService.getapprovalReqJson(
      'ItemSplDescriptions',
      this.globals.gTerCode,
      '0',
      '0',
      '0',
      '0',
      '0',
      0,
      '0',
      '0',
      '0',
      '0',
      '0',
    )
      .subscribe((data) => {
        this.myItemDescs = data;
      }));
  }

  // * Keyboard Triggered Event () -- inclues Shortcut ()
  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(keydown$.subscribe((event: KeyboardEvent) => {
      if (!this.isload) {
        if (!this.itemSerchmodelisOpen) {
          if ((event.key === 'v' || event.key === 'V') && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
          }
          // * item code focus
          if (event.key === 'F2') {
            if (this.itemGetFor === 'ItemRateCheck') {
              this.closeItemRateCheck();
            } else {
              this.itemRateCheck();
            }
            this.icodeSel.nativeElement.focus();
            return;
          }
          if (event.key === 'F3') {
            event.preventDefault();
            if (this.tblSelected === 'COUNTER BILLING') {
              if (this.wmDataShow) {
                this.wmDataShow = false;
                this.weighingMechineData = [];
              } else {
                this.getWMdata();
              }
              this.icodeSel.nativeElement.focus();
            }
            return;
          }
          // * item code focus
          if (event.altKey && (event.key === 'i' || event.key === 'I')) {
            this.icodeSel.nativeElement.focus();
            return;
          }
          if (event.altKey && (event.key === 'p' || event.key === 'P')) {
            if (this.tblSelected !== 'PARCEL BILLING') {
              this.tblItemSelection.get('parcelSel').setValue(!this.tblItemSelection.get('parcelSel').value);
              // if(this.tblItemSelection.get('parcelSel').value == true){
              //   this.tblItemSelection.get('parcelSel').value = false
              // } else{
              //   this.tblItemSelection.get('parcelSel').value = false

              // }
            }
            return;
          }
          // * quantity focus
          if (event.altKey && (event.key === 'q' || event.key === 'Q')) {
            this.qtySel.nativeElement.focus();
            return;
          }
          // * SalesMan focus
          if (this.focusedElement && this.tblItemSelection.get('icodeSel').value == '' && (event.code === 'Space')) {
            if (this.customerSelection.get('salesMan').disabled || this.globals.gmainMenuSelected !== 'COUNTERV2') {
              this.kotFormSubit();
            } else {
              document.getElementById('salesManId').focus();
            }
            return;
          }
          // * Discount focus
          if (event.altKey && (event.key === 'z' || event.key === 'Z')) {
            document.getElementById('discountId').focus();
            return;
          }
          // * Item Name Search focus
          if (event.altKey && (event.key === 'v' || event.key === 'V')) {
            this.itmSearchClick();
            return;
          }

          // * Clear Cart
          if (event.altKey && (event.key === 'c' || event.key === 'C')) {
            this.clearcart();
            this.checkWMData();
            this.closeItemRateCheck();
            this.icodeSel.nativeElement.focus();
            this.searchItmresult = [];
            $('#itemNamelist').modal('hide');
            this.itemSerchmodelisOpen = false;
            return;
          }
          // * Open FavItem
          if (event.altKey && (event.key === 'f' || event.key === 'F')) {
            event.preventDefault();

            this.dragToggle = !this.dragToggle;

            return;
          }
          if (event.altKey && (event.key === 'x' || event.key === 'X')) {
            if (this.viewShortcut) {
              this.viewShortcut = false;
            } else {
              this.goBack();
            }
          }
        } else {
          // * Item Name Search Modal Close
          if (event.altKey && (event.key === 'x' || event.key === 'X')) {
            if (this.itemSerchmodelisOpen) {
              this.searchItmresult = [];
              $('#itemNamelist').modal('hide');
              this.itemSerchmodelisOpen = false;
            } else if (this.viewShortcut) {
              this.viewShortcut = false;
            } else {
              this.goBack();
            }
          }
        }
      }
    }));
  }

  restrictNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  restrictNumericwithdot(e: any, uom: any) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (uom == 'KGS') {
      if (e.which === 46) {
        // return true;
        if ((e.target.value) && (e.target.value.indexOf('.') >= 0)) return false;
        return true;
      }
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  onIcodeKeydown(event) {
    if (event.key === 'Enter') {
      this.productadded = false;
      this.selectItem('Icode');
    }
  }

  onQtyKeydown(event : any) {
    if (event.key === 'Enter') {
      // this.productadded = true;
      this.selectedArgs();
    }
  }

  keyEnter(event : any) {
    if (event.key === 'Enter') {
      this.icodeSel.nativeElement.focus();
    }
  }

  // * Get Item details using Item name auto complete
  itmSearchClick() {
    this.searchItemFc.setValue('');
    this.itemSerchmodelisOpen = true;
    $('#itemNamelist').modal('show');
    // this.clearPage();
    this.clearAdditem();

    setTimeout(() => {
      document.getElementById('searchItemFc1').focus();
    }, 500);
  }

  getSelectedItemcode(argvalue) {
    $('#itemNamelist').modal('hide');
    this.itemSerchmodelisOpen = false;
    this.productadded = false;
    const stPosition = argvalue.indexOf(':');
    this.icodeLiveInterpollation = argvalue.substr(stPosition + 1, 10);
    this.tblItemSelection.get('icodeSel').setValue(this.icodeLiveInterpollation);
    this.selectItem('Icode');
  }

  clearcart() {
    localStorage.removeItem(this.cart);
    this.toPay = 0; this.totQtyCntDisply = 0;
    this.clearPage();
    this.items = [];
    this.finalAmtCalc();
  }

  // * Get Item details using Item code

  selectItemFirst(fromWhere: string) {
    this.productadded = false;
    this.selectItem(fromWhere);
  }

  selectItem(fromWhere: string) {
    if (this.tblItemSelection.get('icodeSel').value === '' || this.tblItemSelection.get('icodeSel').value === null
    ) {
      // Swal.fire({  text: 'Enter valid item codes'});
      return;
    }

    this.icodeselected = this.tblItemSelection.get('icodeSel').value;
    this.parcelYN = 'NP';
    if (this.tblItemSelection.get('parcelSel').value === true) {
      this.parcelYN = 'P';
    }
    // this.subs.add(this.myGService.getapprovalReqJson('GetItemDetailsCode', this.globals.gRateoption, this.parcelYN,
    //   '0', '0', '0', '0', this.icodeselected, '0', '0', '0', '0', '0')
    const api = {
      reqMainreq: 'GetItemDetailsCodeNew',
      raFlag: this.globals.gRateoption,
      aprStatus: this.parcelYN,
      Usr: '',
      reqfromDTAP: '0',
      reqfromIp: '0',
      TrnNo: '0',
      brcode: this.icodeselected,
      appby: '0',
      splreason: '0',
      extra1: this.globals.gTerCode,
      extra2: this.itemGetFor,
      extra3: '0',
    };

    this.subs.add(this.commonService.sendReqst(api).subscribe({
      next: (data) => {
        if (data[0].result === 'OK') {
          if (data[0].ItemGetFrom === 'OwnQrcode' || data[0].ItemGetFrom === 'WMGet') {
            this.addItemToArray(data);
            this.tblItemSelection.get('qtySel').disable();
            // if(data[0].ItemGetFrom === "WMGet"){
            //   this.customerSelection.get('salesMan').setValue(data[0].SalesManId)
            //   this.checkWMData()
            // }
          } else {
            this.tblItemSelection.get('qtySel').enable();
          }

          this.selFIcode = this.icodeselected;
          this.itmSelectedval = data[0].iname;
          this.rateSelectedval = data[0].rate;
          this.selUom = data[0].mment;
          this.selitemRate = data[0].rate;
          this.selitemImg = '';
          this.selGst = data[0].gst;
          this.selCess = data[0].cess;
          this.selServSuply = '';
          this.selHsnCode = data[0].HsnCode;
          this.selGoods_Service = data[0].Goods_Service;
          this.sellcItemGetFrom = data[0].ItemGetFrom;
          this.sellclsItmEditAlw = data[0].itmEditAlw;
          this.selSalesManId = data[0].SalesManId;

          this.tblItemSelection.get('itemNameSel').setValue(data[0].iname);
          this.tblItemSelection.get('rateSel').setValue(data[0].rate);
          if (this.tblItemSelection.get('uomSel').value !== data[0].mment) {
            this.tblItemSelection.get('qtySel').setValue('');
          }
          this.tblItemSelection.get('uomSel').setValue(data[0].mment);

          // this.tblItemSelection.get('qtySel').setValue('');
          // if (!this.tblItemSelection.get('parcelSel').value) {
          //   this.tblItemSelection.get('qtySel').setValue('');
          //   }

          if (fromWhere === 'Icode') {
            this.qtySel.nativeElement.focus();
          }
          if (this.productadded === true) {
            this.clearAdditem();
            // this.clearPage();

            document.getElementById('icodeSel').focus();
          }
        } else {
          Swal.fire({ text: data[0].result || data[0].statusMsg });
          // this.clearPage();
          this.clearAdditem();
        }
      },
      error: (err) => {
        this.logError(err);
      },
    }));
  }

  onDragStart(event: DragEvent) {
    event.preventDefault();
  }

  itemRateCheck() {
    this.additionalText = ' - Item Rate Checking';
    this.itemGetFor = 'ItemRateCheck';
    this.clearcart();
  }

  closeItemRateCheck() {
    this.additionalText = '';
    this.itemGetFor = '0';
    this.clearcart();
  }

  async addItemToArray(reqItems:any) {
    this.isload = true;

    const checkIcode = this.items.filter((e) => e.itemGetFrom === 'WMGet');
    //  && reqItems[i].ItemGetFrom ==='WMGet')
    for (let i = 0; i < reqItems.length; i++) {
      this.ItemDetails = `${reqItems[i].icode}|${reqItems[i].Qty}|${reqItems[i].Parcel}|0`;
      const ReplyWhat = 'StkInner';
      const itemDetails = this.ItemDetails;
      await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/stkChkMulti`, { ReplyWhat, itemDetails }, this.commonService.httpOptions)).then(async (data: Item) => {
        if (checkIcode.length > 0 && reqItems[i].ItemGetFrom === 'WMGet') {
        // this.clearPage()
          this.clearAdditem();
          document.getElementById('icodeSel').focus();
          Swal.fire({ text: "Already items get from Weighing Machine, can't add another code" });
        } else if (data[0].statusMsg === 'AVAILABLE') {
          // const checkIcode = this.items.some((e) => e.itemCode == reqItems[i].icode && e.itemPNP === reqItems[i].Parcel);
          // if(checkIcode.length > 0 && reqItems[i].ItemGetFrom ==='WMGet'){
          //   this.clearPage()
          //   document.getElementById('icodeSel').focus()
          //   Swal.fire({text:"Already items get from Weighing Machine, can't add another code"})
          // }
          // else {
          this.addOrderitems(
            reqItems[i].icode,
            reqItems[i].iname,
            reqItems[i].Qty,
            reqItems[i].mment,
            reqItems[i].rate,
            '',
            '',
            reqItems[i].Parcel,
            reqItems[i].gst,
            reqItems[i].cess,
            0,
            reqItems[i].Goods_Service,
            reqItems[i].HsnCode,
            reqItems[i].Goods_Service,
            reqItems[i].ItemGetFrom,
            reqItems[i].itmEditAlw,
            reqItems[i].SalesManId,
            reqItems[i].ReqtdOptn,
          );
          // }
        } else {
          await Swal.fire(`${reqItems[i].icode} : ${reqItems[i].iname} Stock not available`).then(() => {
            this.addOrderitems(
              reqItems[i].icode,
              reqItems[i].iname,
              reqItems[i].Qty,
              reqItems[i].mment,
              reqItems[i].rate,
              '',
              '',
              reqItems[i].Parcel,
              reqItems[i].gst,
              reqItems[i].cess,
              0,
              reqItems[i].Goods_Service,
              reqItems[i].HsnCode,
              reqItems[i].Goods_Service,
              reqItems[i].ItemGetFrom,
              reqItems[i].itmEditAlw,
              reqItems[i].SalesManId,
              reqItems[i].ReqtdOptn,
            );
          });
        }
      }).catch(async (error) => {
        await Swal.fire({ text: error });
      });
    }
    this.isload = false;
  }

  async removeWMItemFromArray(reqItems:any, index : any) {
    this.commonService.saveConfirmation(`remove ${this.items[index].itemCode} - ${this.items[index].itemName} : ${this.items[index].argQty} ${this.items[index].uom}`).then(async (res) => {
      if (res.isConfirmed) {
        this.isload = true;
        for (let i = 0; i < reqItems.length; i++) {
          const api = {
            reqMainreq: 'DelWmDataRow',
            raFlag: '0',
            aprStatus: '0',
            Usr: this.globals.gUsrid,
            reqfromDTAP: '0',
            reqfromIp: '0',
            TrnNo: '0',
            brcode: reqItems[i].itemCode,
            appby: '0',
            splreason: '0',
            extra1: reqItems[i].argQty,
            extra2: reqItems[i].salesManId,
            extra3: '0',
          };
          await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/approvalReqTwo`, api, this.commonService.httpOptions)).then(async (data) => {
            if (data[0].result === 'Success') {
              this.items.splice(index, 1);
              this.setItemsToLS();
              this.finalAmtCalc();
            } else {
              await Swal.fire({ text: data[0].result });
            }
          }).catch((error) => {
          });
        }
        this.isload = false;
      }
    });
  }

  logError(err: any) {
    Swal.fire({ text: err.message });
  }

  // *  add item to table and LS before check stocks of the item then push to table
  selectedArgsFirst() {
    this.selectedArgs();
  }

  // check forms are valid
  selectedArgs() {
    if (this.tblItemSelection.get('icodeSel').value === '' || this.tblItemSelection.get('icodeSel').value === null
    ) {
      setTimeout(() => {
        Swal.fire({ text: 'Enter valid item code' })
          .then(() => {
          });
      }, 100);
      this.icodeSel.nativeElement.focus();
      return;
    }
    this.icodeselected = this.tblItemSelection.get('icodeSel').value;
    if (this.itmSelectedval === '' || this.itmSelectedval === null || this.itmSelectedval === '0') {
      setTimeout(() => {
        Swal.fire({ text: 'Select item' });
      }, 100);
      return;
    }
    if (this.tblItemSelection.get('rateSel').value === '' || this.tblItemSelection.get('rateSel').value === null
      || this.tblItemSelection.get('rateSel').value === 0) {
      setTimeout(() => {
        Swal.fire({ text: 'Invalid item selected or check rate of this item' });
      }, 100);
      return;
    }
    if (this.tblItemSelection.get('qtySel').value === '' || this.tblItemSelection.get('qtySel').value === null
      || this.tblItemSelection.get('qtySel').value < 0.001 || this.tblItemSelection.get('qtySel').value == 0
    ) {
      setTimeout(() => {
        Swal.fire({ text: 'Enter valid quantity' });
      }, 100);
      return;
    }
    this.qtySelected = this.tblItemSelection.get('qtySel').value;
    if (this.tblItemSelection.get('itemDesc').value === '' || this.tblItemSelection.get('itemDesc').value === null
      || this.tblItemSelection.get('itemDesc').value === '0') {
      this.selitemDesc = '0';
    } else { this.selitemDesc = this.tblItemSelection.get('itemDesc').value; }

    this.parcelYN = 'NP';
    if (this.tblItemSelection.get('parcelSel').value === true) { this.parcelYN = 'P'; }
    if (this.qtySelected === 0) {
      setTimeout(() => {
        Swal.fire({ text: 'Select Quantity' });
      }, 100);
      return;
    }
    if (this.selFIcode !== this.icodeselected) {
      setTimeout(() => {
        Swal.fire({ text: 'Select item once again' });
      }, 100);
      return;
    }
    if (this.itemGetFor === 'ItemRateCheck') {
      this.addOrderitems(
        this.icodeselected,
        this.itmSelectedval,
        this.qtySelected,
        this.selUom,
        this.selitemRate,
        this.selitemImg,
        this.selitemDesc,
        this.parcelYN,
        this.selGst,
        this.selCess,
        this.selDiscper,
        this.selServSuply,
        this.selHsnCode,
        this.selGoods_Service,
        this.sellcItemGetFrom,
        this.sellclsItmEditAlw,
        this.selSalesManId,
        this.selReqtdOptn,
      );
      if (this.productadded === true) {
        // this.clearPage();
        this.clearAdditem();
      }
      this.icodeSel.nativeElement.focus();
    } else {
      this.ItemDetails = `${this.icodeselected}|${this.qtySelected}|${this.parcelYN}|${this.selitemDesc}`;
      this.checkStock('StkInner', this.ItemDetails);
    }
  }

  // check stock of the item
  checkStock(rtnMsgType: string, allItemDetails: string) {
    this.subs.add(this.myGService.checkStockSngOrMulti(rtnMsgType, allItemDetails)
      .subscribe({
        next: (data) => {
          if (data[0].statusMsg === 'AVAILABLE') {
            this.addOrderitems(
              this.icodeselected,
              this.itmSelectedval,
              this.qtySelected,
              this.selUom,
              this.selitemRate,
              this.selitemImg,
              this.selitemDesc,
              this.parcelYN,
              this.selGst,
              this.selCess,
              this.selDiscper,
              this.selServSuply,
              this.selHsnCode,
              this.selGoods_Service,
              this.sellcItemGetFrom,
              this.sellclsItmEditAlw,
              this.selSalesManId,
              this.selReqtdOptn,
            );
            if (this.productadded === true) {
              // this.clearPage();
              this.clearAdditem();
            }

            this.icodeSel.nativeElement.focus();
          } else {
            Swal.fire({ text: data[0].statusMsg });
          }
        },
        error: (err) => this.logError(err),
      }));
  }

  isFloat(num: number): boolean {
    return Number(num) === num && num % 1 !== 0;
  }

  // finally add table and LS
  addOrderitems(
    lcitemCode: number,
    lcitemName: string,
    lcargQty: number,
    lcuom: string,
    lcitemRate: number,
    lcitemImg: string,
    lcitemDesc: string,
    lcitemPNP: string,
    lcGst: number,
    lcCess: number,
    lcDiscper: number,
    lcServSuply: string,
    lcHsnCode: number,
    lsGoods_Service : string,
    lcItemGetFrom : string,
    lsItmEditAlw: string,
    lsSalesManid:string,
    lsreqtdOptn :string,
  ) {
    if (isNaN(lcargQty)) {
      return;
    }
    if (lcuom === 'NOS') {
      if (this.isFloat(lcargQty)) {
        this.commonService.showStatusPopup(`Please enter a whole number (not a decimal), because this item's UOM is ${lcuom}`);
        return;
      }
    }

    const gkSgstPerc = Number(this.invPreReqData[0].gkSgstPerc);
    const gkCgstPerc = Number(this.invPreReqData[0].gkCgstPerc);

    const total = (lcargQty * lcitemRate);
    const discAmt = (total * lcDiscper) / 100;
    const sgstPer = (lcGst * gkSgstPerc / 100);
    const cgstPer = (lcGst * gkCgstPerc / 100);
    const taxableAmt = (total - discAmt);
    const sgstCalc = taxableAmt * sgstPer;
    const cgstCalc = taxableAmt * cgstPer;
    const cessCalc = (taxableAmt * lcCess) / 100;
    const totalGstAmt = (taxableAmt * lcGst) / 100;
    const GrossAmt = taxableAmt + totalGstAmt;

    const item: Item = {
      itemCode: lcitemCode,
      itemName: lcitemName,
      argQty: lcargQty,
      uom: lcuom,
      itemRate: lcitemRate,
      itemImg: lcitemImg,
      itemDesc: lcitemDesc,
      itemPNP: lcitemPNP,
      itemGst: lcGst,
      itemCess: lcCess,
      itemCessAmt: cessCalc,
      itemDisc: lcDiscper,
      itemServSuply: lcServSuply,
      itemTotal: total,
      itemDiscAmt: discAmt,
      itemTaxableAmt: taxableAmt,
      itemSgstIgst_11: sgstPer,
      itemSgstIgstAmt: sgstCalc,
      itemCgst_12: cgstPer,
      itemCgstAmt: cgstCalc,
      itemHsn_17: lcHsnCode,
      itemGoodsSevice_20: lsGoods_Service,
      itemGstAmt: totalGstAmt,
      itemGrossAmt: GrossAmt,
      itemGetFrom: lcItemGetFrom,
      itmEditAlw: lsItmEditAlw,
      salesManId: lsSalesManid,
      reqtdOptn: lsreqtdOptn,
    };
    if (this.items === null || this.items.length === 0) {
      this.items.push(item);
      this.productadded = true;
      this.finalAmtCalc();
    } else if (this.invPreReqData[0].ItemRepeatAllow === 'NOT ALLOW') {
      const checkIcode = this.items.some((e) => e.itemCode == lcitemCode && e.itemPNP === lcitemPNP);
      const checkIndex = this.items.findIndex((e) => e.itemCode === lcitemCode && e.itemPNP === lcitemPNP);
      if (checkIcode) {
        setTimeout(() => {
          Swal.fire({
            text: `Item : ${lcitemName} is already exists, Do you want change qty ?`,
            showCancelButton: true,
            confirmButtonText: 'Close',
            cancelButtonText: 'Yes',
          }).then((result) => {
            if (!result.isConfirmed) {
              setTimeout(() => {
                let focusId = '';
                focusId = `qtyField_${checkIndex}`;
                document.getElementById(focusId).focus();
              }, 300);
            }
          });
        }, 100);
        return;
      }
      this.items.push(item);
      this.finalAmtCalc();
      this.productadded = true;
    } else {
      this.items.push(item);
      this.finalAmtCalc();
      this.productadded = true;
    }
    // this.clearPage();
    this.clearAdditem();
    document.getElementById('icodeSel').focus();
    this.setItemsToLS();
    this.checkWMData();
  }

  clearAdditem() {
    this.tblItemSelection.get('icodeSel').setValue('');
    this.tblItemSelection.get('itemNameSel').setValue('');
    this.tblItemSelection.get('rateSel').setValue('');
    this.tblItemSelection.get('qtySel').setValue('');
    this.tblItemSelection.get('uomSel').setValue('');
    this.tblItemSelection.get('itemDesc').setValue('');

    // this.customerSelection.get('discPernt').setValue('');

    // this.customerSelection.get('searchCustomerFc').setValue('');

    this.itmSelectedval = '';
    this.rateSelectedval = ''; this.selUom = '';
    if (this.globals.gmainMenuSelected === 'PARCELV2') {
      this.tblItemSelection.patchValue({ parcelSel: true });
    } else {
      this.tblItemSelection.patchValue({ parcelSel: false });
    }
  }

  // clear form when successfully add to table & LS
  clearPage() {
    this.tblItemSelection.get('icodeSel').setValue('');
    this.tblItemSelection.get('itemNameSel').setValue('');
    this.tblItemSelection.get('rateSel').setValue('');
    this.tblItemSelection.get('qtySel').setValue('');
    this.tblItemSelection.get('uomSel').setValue('');
    this.tblItemSelection.get('itemDesc').setValue('');

    if (this.invPreReqData[0]?.discDaywiseFortercode == 0) {
      this.customerSelection.get('discPernt').setValue('');
      this.customerSelection.get('searchCustomerFc').setValue('');
    }

    this.itmSelectedval = '';
    this.rateSelectedval = ''; this.selUom = '';
    if (this.globals.gmainMenuSelected === 'PARCELV2') {
      this.tblItemSelection.patchValue({ parcelSel: true });
    } else {
      this.tblItemSelection.patchValue({ parcelSel: false });
    }
  }

  roundNumber(number, decimals) { // Arguments: number to round, number of decimal places
    const newnumber = new Number(`${number}`).toFixed(parseInt(decimals));
    return parseFloat(newnumber); // Output the result to the form field (change for your purposes)
  }

  loadCart() {
    const cart = JSON.parse(localStorage.getItem(this.cart));
    if (cart !== null) {
      this.items = JSON.parse(`[${cart}]`);
      this.finalAmtCalc();
      this.checkWMData();
    }
  }

  qtyIncDnc(cArgQty: number, cItemRate: number, index: number) {
    const tempQty = Number(cArgQty).toFixed(3);
    this.items[index].argQty = Number(tempQty);
    this.items[index].itemTotal = Number((this.items[index].argQty * cItemRate).toFixed(2));
    this.finalAmtCalc();
  }

  // Purpose to calculate payable amount, it will be called any changes made like qty add, del,...
  finalAmtCalc() {
    const gkSgstPerc = Number(this.invPreReqData[0].gkSgstPerc);
    const gkCgstPerc = Number(this.invPreReqData[0].gkCgstPerc);

    this.total = 0; this.gstTotal = 0;
    this.deliveryCharges = 0;
    this.toPay = 0;
    this.totdis = 0;
    this.sgstamt = 0;
    this.cgstamt = 0;
    this.cessamt = 0; // itemwise cess
    this.qtyXrate = 0; // itemwise total
    this.totalSgstamt = 0; // total SGST
    this.totalCgstamt = 0; // total CGST
    this.toalCessamt = 0; // toatl CESS
    this.totalTaxable = 0;
    this.taxExmptnYN = 0;

    if (this.items) {
      this.items.forEach((item) => {
        this.taxPerDefineItemWise(item);

        this.total += item.itemRate * item.argQty; // itemwise total
        this.total = this.roundNumber(this.total, 2);
        this.qtyXrate = item.argQty * item.itemRate;
        this.disamt = this.qtyXrate * this.globals.gCustdisper / 100; // itemwise discount amount
        this.qty_rate_dis = (this.qtyXrate) - this.disamt; // itemwise discounted amount total

        if (this.globals.gkGstGdsServSply === 'GoodsSupply') {
          item.itemSgstIgstAmt = this.qty_rate_dis * item.itemSgstIgst_11 / 100;
          item.itemCgstAmt = this.qty_rate_dis * item.itemCgst_12 / 100;
          item.itemCessAmt = this.qty_rate_dis * item.itemCess / 100;
        } else if (this.globals.gkGstGdsServSply === 'ServiceSupply') {
          item.itemSgstIgstAmt = this.qty_rate_dis * (this.globals.gkGstSerTaxPerc * gkSgstPerc / 100) / 100;
          item.itemCgstAmt = this.qty_rate_dis * (this.globals.gkGstSerTaxPerc * gkCgstPerc / 100) / 100;
          item.itemCessAmt = 0;
        }

        // emk
        item.itemDisc = this.globals.gCustdisper; // Discount Percentage entire items
        item.itemDiscAmt = this.disamt; // Discount Amount item wise
        item.itemTaxableAmt = this.qty_rate_dis; // Taxable Amount
        item.itemGstAmt = item.itemSgstIgstAmt + item.itemCgstAmt + item.itemCessAmt; // All Tax combained
        item.itemGrossAmt = this.qty_rate_dis + item.itemSgstIgstAmt + item.itemCgstAmt + item.itemCessAmt; // discounted total value + combained Tax value

        // this.finalamt       = this.qty_rate_dis + item.itemSgstIgstAmt + item.itemCgstAmt + item.itemCessAmt;
        this.deliveryCharges = 0;

        this.totdis += this.disamt;
        this.totalTaxable += this.qty_rate_dis;
        this.totalSgstamt += item.itemSgstIgstAmt;
        this.totalCgstamt += item.itemCgstAmt;
        this.toalCessamt += item.itemCessAmt;
        this.gstTotal += item.itemSgstIgstAmt + item.itemCgstAmt + item.itemCessAmt;
        this.toPay += item.itemGrossAmt;
      });

      this.gstTotal = Number(this.gstTotal.toFixed(2));
      this.globals.gInvAmtBeforeRndoff = this.toPay;
      this.toPayBeforeRndoff = this.toPay; // new varialble

      // this.RoundedoffCaller();
      // console.log(this.toPay);
      // console.log(this.invAmtInt);
      // console.log(this.invAmtPaise);

      this.globals.gOrdervalue = this.toPay;
      this.totQtyCntDisply = this.items.length;
    }
  }

  taxPerDefineItemWise(item: Item) {
    const gkGstGdsServSacCode = Number(this.invPreReqData[0].gkGstGdsServSacCode);
    const GSToutdoorPerCnt = Number(this.invPreReqData[0].GSToutdoorPerCnt);
    const ResaleExportGST = Number(this.invPreReqData[0].ResaleExportGST);
    const GSTDoorDly = Number(this.invPreReqData[0].GSTDoorDly);
    const GSThallPerCnt = Number(this.invPreReqData[0].GSThallPerCnt);
    const { Roomservice } = this.invPreReqData[0];

    const gkSgstPerc = Number(this.invPreReqData[0].gkSgstPerc);
    const gkCgstPerc = Number(this.invPreReqData[0].gkCgstPerc);

    if (this.globals.gGstorVat === 'GST') {
      if (this.taxExmptnYN == 'SEZ-ZERO') {
        item.itemSgstIgst_11 = 0;
        item.itemCgst_12 = 0;
        item.itemCess = 0;
        item.itemHsn_17 = item.itemHsn_17;
      } else if (this.taxExmptnYN === 'DIR-EXP') {
        item.itemSgstIgst_11 = 0;
        item.itemCgst_12 = 0;
        item.itemCess = 0;
        item.itemHsn_17 = item.itemHsn_17;
      } else if (this.taxExmptnYN === 'RSL-EXP' && this.globals.gbilling === 'Normal') {
        const ctaxi = ResaleExportGST * gkSgstPerc / 100;
        item.itemSgstIgst_11 = ctaxi;
        item.itemCgst_12 = ctaxi;
        item.itemCess = 0;
        item.itemHsn_17 = item.itemHsn_17;
      } else if (this.taxExmptnYN === 'RSL-EXP' && this.globals.gbilling === 'CstSales') {
        const ctaxi = ResaleExportGST * gkSgstPerc / 100;
        item.itemSgstIgst_11 = ctaxi * 2;
        item.itemCgst_12 = 0;
        item.itemCess = 0;
        item.itemHsn_17 = item.itemHsn_17;
      } else if (this.globals.gbilling === 'CstSales') {
        item.itemSgstIgst_11 = item.itemGst;
        item.itemCgst_12 = 0;
        item.itemCess = item.itemCess;
        item.itemHsn_17 = item.itemHsn_17;
      } else { // Normal Billing counter sales
        if (this.globals.gkGstGdsServSply === 'GoodsSupply') {
          item.itemSgstIgst_11 = item.itemGst * gkSgstPerc / 100;
          item.itemCgst_12 = item.itemGst * gkCgstPerc / 100;
          item.itemCess = item.itemCess;
          item.itemHsn_17 = item.itemHsn_17;
        } else if (this.globals.gkGstGdsServSply === 'ServiceSupply') {
          if (this.globals.gbilling === 'Outdoor') {
            if (this.globals.BillMde_CFrm === 'IGST') {
              item.itemSgstIgst_11 = GSToutdoorPerCnt;
              item.itemCgst_12 = 0;
              item.itemHsn_17 = gkGstGdsServSacCode;
              item.itemCess = 0;
            } else {
              item.itemSgstIgst_11 = GSToutdoorPerCnt * gkSgstPerc / 100;
              item.itemCgst_12 = GSToutdoorPerCnt * gkCgstPerc / 100;
              item.itemCess = 0;
              item.itemHsn_17 = gkGstGdsServSacCode;
            }
          } else if (this.globals.gbilling === 'HALLRENT') {
            if (item.itemGoodsSevice_20 === 'SERVICE') {
              item.itemSgstIgst_11 = item.itemGst * gkSgstPerc / 100;
              item.itemCgst_12 = item.itemGst * gkCgstPerc / 100;
              item.itemCess = 0;
              item.itemHsn_17 = item.itemHsn_17;
            } else {
              item.itemSgstIgst_11 = GSThallPerCnt * gkSgstPerc / 100;
              item.itemCgst_12 = GSThallPerCnt * gkCgstPerc / 100;
              item.itemCess = 0;
              item.itemHsn_17 = gkGstGdsServSacCode;
            }
          } else if (Roomservice === 'OnlineOrder') {
            item.itemSgstIgst_11 = GSTDoorDly * gkSgstPerc / 100;
            item.itemCgst_12 = GSTDoorDly * gkCgstPerc / 100;
            item.itemCess = 0;
            item.itemHsn_17 = gkGstGdsServSacCode;
          } else {
            item.itemSgstIgst_11 = this.globals.gkGstSerTaxPerc * gkSgstPerc / 100;
            item.itemCgst_12 = this.globals.gkGstSerTaxPerc * gkCgstPerc / 100;
            item.itemCess = 0;
            item.itemHsn_17 = gkGstGdsServSacCode;
          }
        }
      }
      return;
    }

    const HallRent_servicetaxper = Number(this.invPreReqData[0].HallRent_servicetaxper);
    const { SertaxReq } = this.invPreReqData[0];
    const servicetaxper = Number(this.invPreReqData[0].servicetaxper);
    const { SerTaxApplicablityITMTERM } = this.invPreReqData[0];

    if (this.globals.gGstorVat === 'VAT') {
      if (this.taxExmptnYN == 'SEZ-ZERO') {
        item.itemSgstIgst_11 = 0;
      } else if (this.globals.gbilling === 'Scrap') {
        item.itemSgstIgst_11 = item.itemGst;
      } else if (this.globals.gbilling === 'CstSales') {
        // if(this.globals.BillMde_CFrm === "AgnstCFrmSale"){
        //   if(item.itemGst === 0){
        //     item.itemSgstIgst_11  = 0;
        //   } else{
        //     item.itemSgstIgst_11 = WithCFormTaxRate;
        //   }
        // }
        if (this.globals.BillMde_CFrm === 'CstSale') {
          item.itemSgstIgst_11 = item.itemGst;
        }
      } else if (this.globals.gbilling === 'Outdoor') {
        item.itemSgstIgst_11 = item.itemGst;
      } else if (this.globals.gbilling === 'Normal') {
        item.itemSgstIgst_11 = item.itemGst;
      }
      if (this.globals.gbilling === 'HALLRENT') {
        item.itemCgst_12 = HallRent_servicetaxper;
      } else if (this.globals.gbilling === 'Normal') {
        if (SertaxReq === 'Yes') {
          if (SerTaxApplicablityITMTERM === 'TERMINAL BASED') {
            item.itemCgst_12 = item.itemCgst_12;
          } else {
            // if(PC === "P"){
            //   item.itemCgst_12  = item.itemCgst_12;
            // }else{
            item.itemCgst_12 = item.itemCgst_12;
            // }
          }
        } else {
          item.itemCgst_12 = 0;
        }
      } else if (this.globals.gbilling === 'CstSales') {
        item.itemCgst_12 = 0;
      } else if (this.globals.gbilling === 'CstSales') {
        item.itemCgst_12 = servicetaxper;
      }
    }
  }

  removeItemFromTable(index: number): void {
    this.commonService.saveConfirmation(`remove  ${this.items[index].itemCode} - ${this.items[index].itemName} : ${this.items[index].argQty} ${this.items[index].uom}`).then(async (res) => {
      if (res.isConfirmed) {
        this.items.splice(index, 1);
        this.setItemsToLS();
        this.finalAmtCalc();
      }
      // else{
      //   if(this.items[index].argQty < 0.001){
      //     setTimeout(() => {
      //       let focusId = ''
      //       focusId = 'qtyField_' + index
      //       document.getElementById(focusId).focus()
      //     }, 300);
      //   }
      // }
    });
  }

  qtyWhenZeroFocus(index: number, argQty: any) {
    if (argQty < 0.001) {
      this.removeItemFromTable(index);
    }
  }

  public async kotFormSubit() {
    if (this.items.length === 0) {
      Swal.fire({ text: 'Cart is empty please add aleast one item' }).then(() => {
        setTimeout(() => {
          this.icodeSel.nativeElement.focus();
        }, 300);
      });
      return;
    }
    if (this.itemGetFor !== '0') {
      Swal.fire({ text: 'You are currently in item rate checking mode. Please clear the mode and try again.' });
      return;
    }
    if (isNaN(this.toPay)) {
      Swal.fire({ text: 'Please check payable amount is a number' });
      return;
    }
    // const findZeroQty =  this.items.filter(item => item.argQty < 0.001)
    const findZeroIndex = this.items.findIndex((item) => item.argQty < 0.001);
    if (findZeroIndex !== -1) {
      console.log(this.items[findZeroIndex]);

      Swal.fire({ text: `Please enter the quantity of ${this.items[findZeroIndex].itemCode} - ${this.items[findZeroIndex].itemName}` }).then(() => {
        setTimeout(() => {
          let focusId = '';
          focusId = `qtyField_${findZeroIndex}`;
          document.getElementById(focusId).focus();
        }, 300);
      });
      return;
    }
    if (this.tblSelected === 'COUNTER BILLING') {
      if (this.customerSelection.get('salesMan').value == '' || this.customerSelection.get('salesMan').value == null) {
        Swal.fire({ text: 'Enter sales man id' }).then(() => {
          setTimeout(() => {
            document.getElementById('salesManId').focus();
          }, 300);
        });
        return;
      }
    }
    if (Math.sign(this.toPay) == -1) {
      Swal.fire({ text: 'The payable amount is a negative value, please check it' });
      return;
    }

    if (this.globals.gBeginTran === 'BeginTran') {
      return;
    }

    if (this.globals.gTerCode === '' || this.globals.gTerCode === null) {
      Swal.fire({ text: 'Sign out and relogin again' });
      return;
    }

    if (this.globals.gUsrid === '' || this.globals.gUsrid === null) {
      Swal.fire({ text: 'Sign out and relogin again' });
      return;
    }
    this.globals.gTrnAmount = this.toPay;
    this.setItemsToLS();
    // this.globals.gmainMenuSelected = 'COUNTER2';
    const result = await this.cnfrimToPaymentScrn();

    if (result[0].StatusMsg === 'SUCCESS') {
      this.router.navigate(['/PosInvoice/invpayment']);
    } else if (result[0].StatusRes == 'Error converting data type varchar to numeric.') {
      this.commonService.showStatusPopup(result[0].StatusRes);
    } else {
      this.commonService.showStatusPopup(result[0].StatusMsg);
    }
  }

  setItemsToLS() {
    const stringifyItemsData = this.chngItemArrayToStrig();
    localStorage.setItem(this.cart, stringifyItemsData);
  }

  chngItemArrayToStrig() {
    // let stringifyJsonItems = []
    // this.items.map(item => {
    //   stringifyJsonItems.push(JSON.stringify(item))
    // })
    // return JSON.stringify(stringifyJsonItems)
    return JSON.stringify(this.items.map((item) => JSON.stringify(item)));
  }

  discountChange(discPer: number) {
    this.globals.gCustdisper = discPer;
    this.finalAmtCalc();
  }

  salesManSelect(salesManNumber : any) {
    this.myGService.salesManid = salesManNumber;
  }

  favItem() {
    this.dragToggle = true;
  }

  favList(itemCode: any) {
    this.tblItemSelection.get('icodeSel').setValue(itemCode);
    this.productadded = false;
    this.selectItem('Icode');
    this.dragToggle = false;
  }

  addFavItem(icode: any) {
    this.addFavGroupItems(icode);
    this.favItemSelection.reset();
    document.getElementById('icodeSel').focus();
  }

  addFavItemToLS() {
    localStorage.setItem(this.favItemCart, JSON.stringify(this.favItemsList));
  }

  removeFavItem(item: any) {
    const api = {
      reqMainreq: 'DelFav', raFlag: this.globals.gTerCode, aprStatus: this.favItemSelection.get('grpName').value, Usr: this.globals.gUsrid, reqfromDTAP: '0', reqfromIp: '0', TrnNo: '0', brcode: this.globals.gBrcode, appby: '0', splreason: '0', extra1: item.Icode, extra2: '0', extra3: '0',
    };

    this.subs.add(this.commonService.sendReqst(api)
      .subscribe({
        next: (data) => {
          if (data[0].StatusMsg === 'Success') {
            // this.favItemSelection.reset()
            this.viewFavGroups();
            this.viewFavGroupItems();
            this.getFavItemToClient();
            document.getElementById('icodeSel').focus();
          } else {
            this.commonService.showStatusPopup('No records found');
          }
        },
        error: (err) => {
          this.commonService.showStatusPopup(err.message);
        },
      }));
  }

  onFavIcodeKeydown(e: any) {
    if (e.key === 'Enter') {
      this.productadded = false;
      this.favItemCodeDetails();
    }
  }

  favItemCodeDetails() {
    this.icodeselected = this.favItemSelection.get('icodeSel').value;
    this.subs.add(this.myGService.getapprovalReqJson(
      'GetItemDetailsCode',
      this.globals.gRateoption,
      this.parcelYN,
      '0',
      '0',
      '0',
      '0',
      this.icodeselected,
      '0',
      '0',
      '0',
      '0',
      '0',
    )
      .subscribe({
        next: (data) => {
          if (data[0].result === 'OK') {
            this.tempFavIcode = this.icodeselected;
            this.favitemDtsData = { ...data[0], qty: 1 };
            this.favItemSelection.get('itemNameSel').setValue(data[0].iname);
            this.favItemSelection.get('rateSel').setValue(data[0].rate);
            document.getElementById('addFavItemId').focus();
          } else {
            this.commonService.showStatusPopup('No Records Found !');
          }
        },
      }));
  }

  addFavGroupItems(itemCode: any) {
    const findItem = this.viewFavGroupData.filter(({ Icode }) => Icode == itemCode);

    if (findItem.length > 0) {
      this.commonService.showStatusPopup('item Already Exist');
      return;
    }
    if (this.favItemSelection.get('icodeSel').invalid || this.favItemSelection.get('grpName').invalid || this.favItemSelection.get('itemNameSel').invalid) {
      this.commonService.showStatusPopup('Fill all required Fields');
      return;
    }
    if (this.tempFavIcode !== this.favItemSelection.get('icodeSel').value) {
      setTimeout(() => {
        Swal.fire({ text: 'Select item once again' });
      }, 100);
      return;
    }
    const api = {
      reqMainreq: 'AddToFav', raFlag: this.globals.gTerCode, aprStatus: this.favItemSelection.get('grpName').value, Usr: this.globals.gUsrid, reqfromDTAP: '0', reqfromIp: '0', TrnNo: '0', brcode: this.globals.gBrcode, appby: '0', splreason: '0', extra1: itemCode, extra2: '0', extra3: '0',
    };

    this.subs.add(this.commonService.sendReqst(api)
      .subscribe({
        next: (data) => {
          if (data[0].StatusMsg === 'Success') {
            this.viewFavGroups();
            this.viewFavGroupItems();
            this.getFavItemToClient();
            this.favItemSelection.reset({
              grpName: this.favItemSelection.value.grpName,
            });
            document.getElementById('icodeSel').focus();
          } else {
            this.commonService.showStatusPopup('No records found from invioce pre request');
          }
        },
        error: (err) => {
          this.commonService.showStatusPopup(err.message);
        },
      }));
  }

  viewFavGroupItems() {
    const api = {
      reqMainreq: 'ViewFav', raFlag: this.globals.gTerCode, aprStatus: this.favItemSelection.get('grpName').value, Usr: this.globals.gUsrid, reqfromDTAP: '0', reqfromIp: '0', TrnNo: '0', brcode: this.globals.gBrcode, appby: '0', splreason: '0', extra1: '0', extra2: '0', extra3: '0',
    };

    this.subs.add(this.commonService.sendReqst(api)
      .subscribe({
        next: (data: any) => {
          if (data.length > 0) {
            if (data[0].StatusMsg === 'Success') {
              this.viewFavGroupData = data;
            } else {
              this.commonService.showStatusPopup(data[0].StatusMsg);
            }
          } else {
            this.viewFavGroupData = [];
          }
        },
        error: (err) => {
          this.commonService.showStatusPopup(err.message);
        },
      }));
  }

  viewFavGroups() {
    const api = {
      reqMainreq: 'ViewFavGrp', raFlag: this.globals.gTerCode, aprStatus: '', Usr: this.globals.gUsrid, reqfromDTAP: '0', reqfromIp: '0', TrnNo: '0', brcode: this.globals.gBrcode, appby: '0', splreason: '0', extra1: '0', extra2: '0', extra3: '0',
    };

    this.subs.add(this.commonService.sendReqst(api)
      .subscribe({
        next: (data: any) => {
          if (data.length > 0) {
            if (data[0].StatusMsg === 'Success') {
              this.viewFavGroupName = data;
            } else {
              this.commonService.showStatusPopup(data[0].StatusMsg);
            }
          } else {
            this.viewFavGroupData = [];
          }
        },
        error(err) {
          this.commonService.showStatusPopup(err.message);
        },
      }));
  }

  getFavItemToClient() {
    const api = {
      reqMainreq: 'ViewFavTercodeALL', raFlag: this.globals.gTerCode, aprStatus: '', Usr: this.globals.gUsrid, reqfromDTAP: '0', reqfromIp: '0', TrnNo: '0', brcode: this.globals.gBrcode, appby: '0', splreason: '0', extra1: '0', extra2: '0', extra3: '0',
    };

    this.subs.add(this.commonService.sendReqst(api)
      .subscribe({
        next: (data: any) => {
          this.favItemsList = [];
          if (data.length > 0) {
            if (data[0].StatusMsg === 'Success') {
              const dataWithSelect = [];
              if (this.globals.gmainMenuSelected === 'PARCELV2') {
                data.map((data) => dataWithSelect.push({
                  ...data, Parcel: 'P', selected: false, checked: true,
                }));
              } else {
                data.map((data) => dataWithSelect.push({ ...data, selected: false, checked: false }));
              }
              // data.map(data => dataWithSelect.push({...data,selected:false, checked:false } ))
              const groupedData = groupBy(dataWithSelect, 'GrpName');
              const GroupNames = Object.keys(groupedData);
              GroupNames.forEach(((data) => {
                this.favItemsList.push({ groupName: data, data: groupedData[data] });
              }));
            } else {
              this.commonService.showStatusPopup(data[0].StatusMsg);
            }
          } else {
            this.viewFavGroupData = [];
          }
        },
        error(err) {
          this.commonService.showStatusPopup(err.message);
        },
      }));
  }

  favCheckStock(rtnMsgType: string, allItemDetails: string) {
    this.subs.add(this.myGService.checkStockSngOrMulti(rtnMsgType, allItemDetails)
      .subscribe((data) => {
        if (data[0].statusMsg === 'AVAILABLE') {
          return true;
        }
        Swal.fire({ text: data[0].statusMsg });
        return false;
      }));
  }

  selectedList(e: any, item: any, j) {
    if (item.selected === false) {
      item.selected = true;
      this.ItemDetails = `${item.Icode}|${item.Qty}|${item.Parcel}|` + '';
      this.favCheckStock('StkInner', this.ItemDetails);
    } else {
      item.selected = false;
    }
  }

  favQtyIncDnc(qty: any, item: any) {
    item.Qty = qty;
    if (qty == '' || qty < 0.01) {
      return;
    }
    this.ItemDetails = `${item.Icode}|${item.Qty}|${item.Parcel}|` + '';
    this.favCheckStock('StkInner', this.ItemDetails);
  }

  FavqtyWhenZeroFocus(item: any, argQty: any) {
    if (argQty < 0.01 || argQty == '') {
      item.Qty = 1;
    }
  }

  selcChange(e: any) {
    if (e.option.value.selected) {
      e.option.value.selected = false;
    } else {
      e.option.value.selected = true;
    }
    this.selectedFavItem = e.source._value;
  }

  async addFavItemToOrderList(reqItems:any) {
    const storeItemDetails = [];
    this.isload = true;
    for (let i = 0; i < reqItems.length; i++) {
      const api = {
        reqMainreq: 'GetItemDetailsCodeNew', raFlag: this.globals.gRateoption, aprStatus: reqItems[i].Parcel, Usr: this.globals.gUsrid, reqfromDTAP: '0', reqfromIp: '0', TrnNo: '0', brcode: reqItems[i].Icode, appby: '0', splreason: '0', extra1: this.globals.gTerCode, extra2: this.itemGetFor, extra3: '0',
      };
      await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/approvalReqTwo`, api, this.commonService.httpOptions)).then(async (data: Item) => {
        storeItemDetails.push(data[0]);
        if (data[0].rate > 0) {
          this.addOrderitems(
            data[0].icode,
            data[0].iname,
            reqItems[i].Qty,
            data[0].mment,
            data[0].rate,
            '',
            '',
            reqItems[i].Parcel,
            data[0].gst,
            data[0].cess,
            0,
            data[0].Goods_Service,
            data[0].HsnCode,
            data[0].Goods_Service,
            data[0].ItemGetFrom,
            data[0].itmEditAlw,
            data[0].SalesManId,
            data[0].ReqtdOptn,
          );
        } else {
          await Swal.fire('This item not allowed in this terminal');
        }
      }).catch((error) => {
      });
    }
    this.isload = false;
    this.favModelClose();
  }
  // async addFavItemToOrderList(reqItems: any) {
  //   this.isload = true;
  //   for (const { Parcel, Icode, Qty } of reqItems) {
  //     try {
  //       const api = {
  //         reqMainreq: "GetItemDetailsCodeNew",
  //         raFlag: this.globals.gRateoption,
  //         aprStatus: Parcel,
  //         Usr: this.globals.gUsrid,
  //         reqfromDTAP: "0",
  //         reqfromIp: "0",
  //         TrnNo: "0",
  //         brcode: Icode,
  //         appby: "0",
  //         splreason: "0",
  //         extra1: this.globals.gTerCode,
  //         extra2: "0",
  //         extra3: "0"
  //       };
  //       const [item] = await this.http
  //         .post<any>(`${this.globals.gApiserver}/api/approvalReqTwo`, api, this.commonService.httpOptions)
  //         .toPromise();
  //         console.log(item);

  //       if (item.rate > 0) {
  //         this.addOrderitems(
  //           item.icode,
  //           item.iname,
  //           Qty,
  //           item.mment,
  //           item.rate,
  //           '',
  //           '',
  //           Parcel,
  //           item.gst,
  //           item.cess,
  //           0,
  //           item.Goods_Service,
  //           item.HsnCode,
  //           item.Goods_Service,
  //           item.ItemGetFrom,
  //           item.itmEditAlw,
  //           item.SalesManId,
  //           item.ReqtdOptn
  //         );
  //       } else {
  //         await Swal.fire(`${item.icode} : ${item.iname} rate ${item.rate} in ${Parcel == 'P' ? 'Parcel' : 'No Parcel'} so this item can't add`);
  //       }
  //     } catch (error) {}
  //   }
  //   this.isload = false;
  //   this.favModelClose();
  // }

  favModelClose() {
    this.dragToggle = false;
    this.addItemdgle = false;
    this.favItemSelection.reset();
    this.viewFavGroupData = [];
    this.favItemsList.forEach((groupName) => {
      groupName.data.forEach((element) => {
        element.selected = false;
      });
    });
  }

  //  async favItemCodeOneByOne(item:any) {
  //   await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/approvalReqTwo`, api, this.commonService.httpOptions)).then((data) => {
  //       return data
  //   }).catch(error => {
  //       return error
  //   });
  // }
  // this.subs.add(this.myGService.getapprovalReqJson('GetItemDetailsCode', this.globals.gRateoption, item.Parcel,
  //   '0', '0', '0', '0', item.Icode, '0', '0', '0', '0', '0')
  //   .subscribe({
  //     next: data => {
  //       let dataResult = "No record Found"
  //       if (data[0].result === 'OK') {
  //         return data[0]
  //       }else{
  //         this.commonService.showStatusPopup('No Records Found !')
  //         return dataResult
  //       }
  //     }, error(err) {
  //       let dataResult = "No record Found"
  //       return dataResult
  //     },
  //   }
  //   ))
  // }
  // * Destroy all request and observables
  ngOnDestroy() {
    this.setItemsToLS();
    this.subs.unsubscribe();
  }

  getSelectFavItemcode(argvalue) {
    this.productadded = false;
    const stPosition = argvalue.indexOf(':');
    this.icodeLiveInterpollation = argvalue.substr(stPosition + 1, 10);
    this.favItemSelection.get('icodeSel').setValue(this.icodeLiveInterpollation);
    this.favItemCodeDetails();
  }

  step = 0;

  setStep(index: number) {
    this.favItemsList.forEach((groupName) => {
      groupName.data.forEach((element) => {
        element.selected = false;
      });
    });
    this.selectedFavItem = [];
    this.step = index;
  }

  changeParcel(e: any, item: any) {
    if (item.checked) {
      item.Parcel = 'P';
    } else {
      item.Parcel = 'NP';
    }
  }

  grpNameChange() {
    this.commonService.autoComplete(this.favItemSelection.get('grpName').valueChanges).subscribe((data) => {
      if (this.viewFavGroupName.length > 0) {
        const filteredData = this.viewFavGroupName.filter(({ GrpName }) => GrpName === data);
        if (filteredData.length > 0) {

        } else {
          this.viewFavGroupData = [];
        }
      }
    });
  }

  checkItemAlreadyExist(itemCode: any, itemPNP: any) {
    const checkIcode = this.items.some((e) => e.itemCode === itemCode && e.itemPNP === itemPNP);
    return checkIcode;
  }

  checkWMData() {
    // if(this.items.length > 0){

    const checkItem = this.items.filter((e) => e.itemGetFrom === 'WMGet');
    if (checkItem.length > 0) {
      this.customerSelection.get('salesMan').setValue(checkItem[0].salesManId);
      this.customerSelection.get('salesMan').disable();
    } else {
      this.customerSelection.get('salesMan').enable();
      if (this.items.length === 0) {
        this.customerSelection.get('salesMan').setValue('');
      }
    }
    // }
  }

  RoundedoffCaller() {
    // const demk = 'OneRupeeStd';
    // const CoinageRoundOff = demk;
    let { CoinageRoundOff } = this.invPreReqData[0];
    let SecndDigit: string;
    let FirstDigt: string;
    let fina = 0;
    this.invAmtInt = Math.floor(this.toPay);
    this.invAmtPaise = this.roundNumber(Math.abs(this.toPay - this.invAmtInt), 2);
    // if (tc.Text) {
    //   ("*Bundl Technologies*" | tc.Text);
    //   "*Zomato*";
    //     CoinageRoundOff = "NoRoundOff";
    // }
    let cmbbtype = ''; // ! TEMP DECLARATION
    if (((this.chkRndOff) || ((CoinageRoundOff == 'NoRoundOff') || ((cmbbtype == 'CARD') || (cmbbtype == 'CREDIT'))))) {
      fina = this.toPay;
    } else if ((CoinageRoundOff == 'OneRupee')) {
      if (((this.invAmtPaise >= 0) && (this.invAmtPaise <= 0.9))) {
        fina = this.invAmtInt;
      } else {
        fina = (this.invAmtInt + 1);
      }
    } else if ((CoinageRoundOff == 'OneRupeeStd')) {
      if (((this.invAmtPaise >= 0) && (this.invAmtPaise <= 0.49))) {
        fina = this.invAmtInt;
      } else {
        fina = (this.invAmtInt + 1);
      }
    } else if ((CoinageRoundOff == 'FiftyPaise')) {
      if (((this.invAmtPaise >= 0) && (this.invAmtPaise < 0.25))) {
        fina = this.invAmtInt;
      } else if (((this.invAmtPaise >= 0.25) && (this.invAmtPaise < 0.75))) {
        fina = (this.invAmtInt + 0.5);
      } else if ((this.invAmtPaise >= 0.75)) {
        fina = (this.invAmtInt + 1);
      }
    } else if ((CoinageRoundOff == 'FivePaise')) {
      SecndDigit = String(this.roundNumber(this.invAmtPaise, 2));
      FirstDigt = SecndDigit.substring(0, 2);
      SecndDigit = SecndDigit.substring((SecndDigit.length - 1));
      this.invAmtInt += Number(FirstDigt);
      if (((SecndDigit == '0') || ((SecndDigit == '1') || (SecndDigit == '2')))) {
        fina = this.invAmtInt;
      } else if (((SecndDigit == '3') || ((SecndDigit == '4') || ((SecndDigit == '5') || ((SecndDigit == '6') || (SecndDigit == '7')))))) {
        fina = (this.invAmtInt + 0.05);
      } else if (((SecndDigit == '8') || (SecndDigit == '9'))) {
        fina = this.roundNumber((this.invAmtInt + 0.1), 2);
      }
    }

    this.totalCoinage = this.roundNumber((fina - this.toPay), 2);
    this.toPay = fina;
  }

  focusedElement: boolean;

  onFocus(flag: any) {
    if (flag == 'focused') {
      this.focusedElement = true;
    } else {
      this.focusedElement = false;
    }
  }

  keyFocus(event) {
    if (event.key === 'Enter') {
      this.kotFormSubit();
    }
  }

  getWMdata() {
    const api = {
      reqMainreq: 'ViewAllWmDatas',
      raFlag: this.globals.gTerCode,
      aprStatus: '',
      Usr: this.globals.gUsrid,
      reqfromDTAP: '0',
      reqfromIp: '0',
      TrnNo: '0',
      brcode: this.globals.gBrcode,
      appby: '0',
      splreason: '0',
      extra1: '0',
      extra2: '0',
      extra3: '0',
    };

    this.subs.add(this.commonService.sendReqst(api)
      .subscribe({
        next: (data: any) => {
          if (data.length > 0) {
            if (data[0].result === 'Success') {
              const tempData = data;
              const header = Object.keys(tempData[0]);
              header.splice(0, 1);
              this.wmDataHeader = header;
              this.weighingMechineData = data;

              this.wmDataShow = true;
            } else {
              this.commonService.showStatusPopup(data[0].result);
            }
          } else {
            this.commonService.showStatusPopup('No Record Found');
          }
        },
        error(err) {
          this.commonService.showStatusPopup(err.message);
        },
      }));
  }

  removeWMData() {
    this.commonService.saveConfirmation('remove WM data ?').then((res) => {
      if (res.isConfirmed) {
        const api = {
          reqMainreq: 'RemoveAllWmDatas',
          raFlag: this.globals.gTerCode,
          aprStatus: '',
          Usr: this.globals.gUsrid,
          reqfromDTAP: '0',
          reqfromIp: '0',
          TrnNo: '0',
          brcode: this.globals.gBrcode,
          appby: '0',
          splreason: '0',
          extra1: '0',
          extra2: '0',
          extra3: '0',
        };

        this.subs.add(this.commonService.sendReqst(api)
          .subscribe({
            next: (data: any) => {
              if (data.length > 0) {
                if (data[0].result === 'Success') {
                  this.commonService.showStatusPopup(data[0].result);
                  this.wmDataShow = false;
                } else {
                  this.commonService.showStatusPopup(data[0].result);
                }
              } else {
                this.commonService.showStatusPopup('No Record Found');
              }
            },
            error(err) {
              this.commonService.showStatusPopup(err.message);
            },
          }));
      }
    });
  }

  async cnfrimToPaymentScrn() {
    if (this.customerSelection.get('discPernt').value == '') {
      this.globals.gCustdisper = 0;
    }

    const api = {
      reqMainreq: 'GInvoiceValidate',
      brcode: this.globals.gBrcode,
      Usr: this.globals.gUsrid,
      var1: 'Invoice',
      var2: 'Invoice',
      var3: this.globals.gTerCode,
      var4: this.globals.gbilling,
      var5: this.globals.BillMde_CFrm,
      var6: '',
      var7: this.globals.gCustcode,
      var8: this.toPay,
      var9: Number(this.globals.gCustdisper),
      var10: '0',
      var11: this.myGService.salesManid,
    };
    try {
      const result = await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/getApproveV1`, api, this.commonService.httpOptions));
      return result;
    } catch (e) {
      return [{ result: e.message }];
    }
  }

  viewShortcut : boolean = false;
}

/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-empty */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { DatePipe } from '@angular/common';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Globals } from 'src/app/globals';
import { VinthService } from 'src/app/services/vinth.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-section-common-product-issue',
  templateUrl: './section-common-product-issue.component.html',
  styleUrls: ['./section-common-product-issue.component.scss'],
})
export class SectionCommonProductIssueComponent implements OnInit {
  private subs = new SubSink();

  select = 'sectionissue';

  isLoading = false;

  pipe: DatePipe;

  section1: any;

  post: any;

  sname: any;

  lname: any;

  iname: any;

  toname: any;

  loadslectionitem: any[]=[];

  Branchloc: FormControl;

  loadtoselectionitem: any[]=[];

  Branchloc1: FormControl;

  loadstockmaster: any[]=[];

  date1: any;

  scode: any;

  tocode: any;

  loadlistitem: any[]=[];

  Branchloc2: FormControl;

  Branchloc3: FormControl;

  loaditemmaster: any[]=[];

  lcode: any;

  icode: any;

  irate: any;

  mment: any;

  inputmm: boolean = false;

  getitemmaster: any[] = [];

  dataadd: any[] = [];

  qty: any;

 amount: any;

  getselectionsave: any[] = [];

 i = 1;

  toname1: any;

  lname1: any;

  iname2: any;

  auth: any;

  frmdate: any;

  todate: any;

  getviewselection: any[] = [];

  reason: any;

  getDeleteselection: any[]=[];

  deletevalue: boolean = false;

  brcode1: any;

  TrnNo: any;

  TrnDate: any;

  newform: any;

  getdeleteviewselection: any[] = [];

  SearchForm1: any;

  submitted: boolean = false;

  sect1: any;

  seccode: any;

  trno: any;

  trndate: any;

  getviewseledet: any[] = [];

  viewdett: boolean = true;

  viewdett1: boolean = false;

  auth1: boolean = false;

  array: any;

  array1: any;

  viewSearch = ''

  SelectedItem: any;

  constructor(
public vinthService: VinthService,
private router: Router,
    private globals: Globals,
private fb: FormBuilder,
  ) {
    this.Branchloc = new FormControl();
    this.Branchloc1 = new FormControl('', Validators.required); this.Branchloc2 = new FormControl('', Validators.required);
    this.Branchloc3 = new FormControl(); this.pipe = new DatePipe('en');
  }

  ngOnInit(): void {
    this.frmdate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    this.todate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    this.newform = this.fb.group({
      reason: ['', Validators.required],
    });
    this.SearchForm1 = this.fb.group({
      date1: [''], toname: [''], lname: [''], icode: ['', Validators.required], iname: [''], irate: [''], qty: ['', Validators.required], amount: [''],
    });
    this.datapic();
    this.subs.add(this.Branchloc.valueChanges.pipe(debounceTime(600)).subscribe((data: any) => {
      this.post = {};
      this.post.reqMainreq = 'LoadIssueSection';
      this.post.Usr = this.globals.gUsrid;
      this.post.brcode = this.globals.gBrcode;
      this.post.var1 = 'FromSection';
      this.post.var2 = data;
      if (data !== '') {
        this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe((data: any) => {
          this.loadslectionitem = data;
        }));
      }
    }));
    this.subs.add(this.Branchloc1.valueChanges.pipe(debounceTime(600)).subscribe((data: any) => {
      this.post = {};
      this.post.reqMainreq = 'LoadIssueSection';
      this.post.Usr = this.globals.gUsrid;
      this.post.brcode = this.globals.gBrcode;
      this.post.var1 = 'ToSection';
      this.post.var2 = data;
      if (data !== '') {
        this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe((data: any[]) => {
          this.loadtoselectionitem = data;
        }));
      }
    }));
    this.subs.add(this.Branchloc2.valueChanges.pipe(debounceTime(600)).subscribe((data: any) => {
      this.post = {};
      this.post.reqMainreq = 'LoadIssueSection';
      this.post.Usr = this.globals.gUsrid;
      this.post.brcode = this.globals.gBrcode;
      this.post.var1 = 'List';
      this.post.var2 = data;
      if (data !== '') {
        this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe((data: any[]) => {
          this.loadlistitem = data;
        }));
      }
    }));

    this.subs.add(this.Branchloc3.valueChanges.pipe(debounceTime(600)).subscribe((data: any) => {
      this.post = {};
      this.post.reqMainreq = 'LoadSectionIssueItem';
      this.post.Usr = this.globals.gUsrid;
      this.post.brcode = this.globals.gBrcode;
      this.post.var1 = this.globals.gTerCode;
      this.post.var2 = data;
      this.post.var3 = 'SI';
      this.post.var4 = this.toname;
      if (data !== '') {
        this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe((data: any[]) => {
          this.loaditemmaster = data;
        }));
      }
    }));
  }

  datapic() {
    this.post = {};
    this.post.reqMainreq = 'LoadSectionStockDate';
    this.post.Usr = this.globals.gUsrid;
    this.post.brcode = this.globals.gBrcode;
    this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe((data: any[]) => {
      this.loadstockmaster = data;
      this.date1 = this.pipe.transform(data[0].SectionStkDate, 'yyyy-MM-dd');
    }));
  }

  changeloc(e: any, title: any) {
    if (e.source.selected) {
      this.scode = title.code;
      this.sname = title.name;
    }
  }

  changeloc1(e: any, title: any) {
    if (e.source.selected) {
      this.tocode = title.code;
      this.toname1 = title.name;
      setTimeout(() => { document.getElementById('searchitemb2')?.focus(); }, 100);
    }
  }

  changeloc2(e: any, title: any) {
    if (e.source.selected) {
      this.lcode = title.code;
      this.lname1 = title.name;
      setTimeout(() => { document.getElementById('code')?.focus(); }, 100);
    }
  }

  changeloc3(e: any, title: any) {
    if (e.source.selected) {
      this.inputmm = true;
      this.iname2 = title.iname;
      this.icode = title.icode;
      this.irate = title.irate;
      this.mment = title.mment;
      this.qty = '';
      this.SelectedItem = title;

      setTimeout(() => { document.getElementById('dataqty')?.focus(); }, 100);
    }
  }

  enter() {
    setTimeout(() => { document.getElementById('searchitemb3')?.focus(); }, 100);
  }

  Keydown(event: any) {
    if (event.key === 'Enter') {
      setTimeout(() => { document.getElementById('searchitemb3')?.focus(); }, 100);
    }
  }

  onKeydown(event: any, add: any) {
    if (event.key === 'Enter') {
      this.qty = '';
      setTimeout(() => {
        this.checkITemName();
      }, 100);
    }
  }

  checkITemName() {
    if (this.icode === undefined) {
      setTimeout(() => { document.getElementById('searchitemb3')?.focus(); }, 10);
    } else {
      this.post = {};
      this.post.reqMainreq = 'GetSectionIssueItem';
      this.post.Usr = this.globals.gUsrid;
      this.post.brcode = this.globals.gBrcode;
      this.post.var1 = this.globals.gTerCode;
      this.post.var2 = this.icode;
      this.post.var3 = 'SI';
      this.post.var4 = this.toname;
      this.getitemmaster = [];

      this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe((data: any[]) => {
        this.getitemmaster = data;
        this.SelectedItem = data[0];
        if (data[0].StatusRes === 'Item Does not Exists') {
          Swal.fire({ text: 'Enter Valid Item Code' });

          setTimeout(() => { document.getElementById('code')?.focus(); }, 10);
        } else if (this.icode === null) {
          this.amount = '0';
          setTimeout(() => { document.getElementById('searchitemb3')?.focus(); }, 10);
        } else if (this.icode === data[0].icode) {
          this.amount = '0';
          setTimeout(() => { document.getElementById('dataqty')?.focus(); }, 10);
        }
        this.iname2 = data[0].iname;
        this.icode = data[0].icode;
        this.irate = data[0].irate;
        this.mment = data[0].mment;
        this.iname = this.iname2;
        this.qty = '';
        this.inputmm = true;
      }));
    }
  }

  selectEvt(e: any, add: any) {
    if (e.key === 'Enter') {
      setTimeout(() => { document.getElementById('sec1')?.focus(); }, 10);
    }
  }

  selectEvt1(event: any, dat: any) {
    if (event.key === 'Enter') {
      if (this.section1 === undefined || this.section1 === null || this.section1 === 'select' || this.section1 === '') {
        // setTimeout(() => { Swal.fire({ text: 'Select section Type' }); }, 100);
      } else {
        document.getElementById('sec2')?.focus();
      }
    }
  }

  changesave(event: any) {
    this.amount = (Number(event.target.value) * this.irate).toFixed(2);
  }

  onKeydown1(event:any) {
    if (event.key === 'Enter') {
      if (this.qty === undefined || this.qty === null || this.qty === 'select' || this.qty === '') {

      } else {
        setTimeout(() => { document.getElementById('button')?.focus(); }, 10);
      }
    }
  }

  addvalue() {
    if (this.SearchForm1.valid) {
      this.submitted = false;
      const objaddvalue = {
        Sno: this.i++,
        Icode: this.icode,
        Iname: this.iname,
        Qty: this.qty,
        Uom: this.mment,
        Rate: this.irate,
        Amount: this.amount,
        Flag: 'Issue',
        date: this.date1,
      };
      if (this.toname1 === this.toname || this.toname === '' || this.toname === null || this.toname === undefined) {
        if (this.lname1 === this.lname || this.lname === '' || this.lname === null || this.lname === undefined) {
          if (this.iname2 === this.iname) {
            console.log(this.SelectedItem, this.icode, this.iname);
            if (this.SelectedItem.icode !== this.icode) {
              Swal.fire('Invalid Item Code');
              return;
            }

            if (this.dataadd.length > 0) {
              const objcode = this.dataadd.some((e) => e.Icode === this.icode);
              if (objcode !== true) {
                this.dataadd.push(objaddvalue);

                this.iname = '';

                this.icode = ''; this.irate = ''; this.mment = ''; this.amount = ''; this.qty = '';

                setTimeout(() => { document.getElementById('code')?.focus(); }, 10);
              } else {
                Swal.fire('Item code Already exists');
              }
            } else if (!this.dataadd.length) {
              this.auth = true;

              this.dataadd.push(objaddvalue);
              setTimeout(() => { document.getElementById('code')?.focus(); }, 10);
              this.iname = '';

              this.icode = ''; this.irate = ''; this.mment = ''; this.amount = ''; this.qty = '';
            }
          } else {
            Swal.fire({ text: 'Invalid Item Name' });
          }
        } else {
          Swal.fire({ text: 'Invalid Section List' });
        }
      } else {
        Swal.fire({ text: 'Invalid To Section' });
      }

      this.inputmm = false;
    } else if (this.SearchForm1.invalid) {
      this.submitted = true;
    }
  }

  clear() {
    this.iname = ''; this.scode = ''; this.lcode = ''; this.tocode = '';
    this.icode = ''; this.irate = ''; this.mment = ''; this.amount = ''; this.qty = '';
    this.lname = ''; this.sname = ''; this.toname = '';
    this.auth = false;
    this.submitted = false;
    this.SearchForm1.reset();
    this.datapic();
    this.dataadd = [];
  }

  clear1() {
    this.viewdett1 = false;
    this.viewdett = true;
    this.auth = false;
    this.auth1 = false;
    this.submitted = false;
    this.SearchForm1.reset();
    this.datapic();
    this.getviewselection = [];
    this.frmdate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    this.todate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
  }

  save() {
    const array = JSON.parse(JSON.stringify(this.dataadd));
    array.filter((e:any) => { delete e.date; });
    this.post = {};
    this.post.reqMainreq = 'S@/SectionIssueSave/E@';
    this.post.ListCode = this.lcode;
    this.post.ListName = this.lname;
    this.post.FromSectionCode = 9001;
    this.post.FromSection = 'SOUTH INDIAN SECTION';
    this.post.ToSectionCode = this.tocode;
    this.post.ToSection = this.toname;
    this.post.EntryDate = this.date1;
    this.post.Usr = this.globals.gUsrid;
    this.post.Terminal = this.globals.gTerName;
    this.post.SecIssueList = array;
    Swal.fire({
      title: 'Do you Confirm?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      denyButtonText: 'cancel',
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.subs.add(this.vinthService.getsavedata(this.post).subscribe((data: any[]) => {
          this.getselectionsave = data;
          if (data[0].Result === 'Success') {
            Swal.fire({ text: 'Save Successfully' });
            this.dataadd = [];
            this.i = 1;
            this.auth = false; this.lname = ''; this.toname = '';
          } else {
            Swal.fire({ text: data[0].Result });
          }
        }));
      }
    });

    // this.lname = ''; this.sname = ''; this.toname = '';
  }

  eduRemove(obj:any) {
    Swal.fire({
      title: 'Do you Confirm?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      denyButtonText: 'cancel',
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.dataadd.splice(obj, 1);
      }
    });
  }

  viewsec() {
    this.select = 'viewissue';
    this.frmdate = this.pipe.transform(this.frmdate, 'yyyy-MM-dd');
    this.todate = this.pipe.transform(this.todate, 'yyyy-MM-dd');
    // this.getviewselection = [];
  }

  viewvalue() {
    this.post = {};
    this.post.reqMainreq = 'ViewSectionIssue';
    this.post.Usr = this.globals.gUsrid;
    this.post.brcode = this.globals.gBrcode;
    this.post.var1 = this.pipe.transform(this.frmdate, 'dd-MMM-yyyy');
    this.post.var2 = this.pipe.transform(this.todate, 'dd-MMM-yyyy');
    // this.post['var3'] = this.lcode;
    this.post.var4 = 'ALL';
    this.getviewselection = [];
    this.isLoading = true;
    this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe((data: any[]) => {
      this.getviewselection = data;
      this.isLoading = false;
    }));
  }

  viewRemove() {
    this.deletevalue = true;
    // this.brcode1 = eve.Brcode;
    // this.TrnNo = eve.TrnNo;
    // this.TrnDate = eve.TrnDate;
  }

  cancel() {
    this.deletevalue = false;
    this.newform.reset();
    this.newform.get('reason').clearValidators();
    this.newform.get('reason').updateValueAndValidity();
  }

  viewdet(add: any) {
    this.array1 = add;
    this.sect1 = add.ToSection; this.seccode = add.ToSectionCode;
    this.trno = add.TrnNo; this.trndate = add.TrnDate;
    this.post = {};
    this.post.reqMainreq = 'ViewIssueDetail';
    this.post.Usr = this.globals.gUsrid;
    this.post.brcode = this.globals.gBrcode;
    this.post.var1 = this.trndate;
    this.post.var2 = this.trno;
    this.post.var3 = this.seccode;
    this.post.var4 = this.sect1;
    this.getviewseledet = [];
    this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe((data: any[]) => {
      this.getviewseledet = data;
      this.viewdett = false;
      this.viewdett1 = true; this.inputmm = true; this.auth = true;
      this.auth1 = true;
      this.select = 'sectionissue';

      this.toname = data[0].ToSection;
      this.date1 = this.pipe.transform(data[0].TrnDate, 'yyyy-MM-dd');
      this.TrnNo = data[0].TrnNo;
      this.lname = data[0].ListName;
      this.lcode = data[0].ListCode;
    }));
  }

  deletefun() {
    this.post = {};
    this.newform.get('reason').setValidators([Validators.required]);
    this.newform.get('reason').updateValueAndValidity();
    if (this.newform.valid) {
      this.post.reqMainreq = 'DeleteSectionIssue';
      this.post.Usr = this.globals.gUsrid;
      this.post.brcode = this.globals.gBrcode;
      this.post.var1 = this.TrnNo;
      this.post.var2 = this.pipe.transform(this.date1, 'dd-MMM-yyyy');
      this.post.var3 = this.globals.gUsrid;
      this.post.var4 = this.newform.value.reason;

      Swal.fire({
        title: 'Do you Confirm?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        denyButtonText: 'cancel',
      }).then((result: { isConfirmed: any; }) => {
        if (result.isConfirmed) {
          this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe((data: any[]) => {
            this.getdeleteviewselection = data;
            if (data[0].StatusRes === 'Success') {
              this.viewvalue();
              this.viewdet(this.array1);

              this.deletevalue = false;
              this.newform.get('reason').clearValidators();
              this.newform.get('reason').updateValueAndValidity();
              this.newform.reset();
              this.auth = false;
              this.auth1 = false;
              this.datapic();
            } else {
              Swal.fire({ text: data[0].StatusRes });
            }
          }));
        }
      });
    }
  }

  keytab(e: any, add: any) {
    if (e.key === 'Enter') {
      setTimeout(() => { document.getElementById('searchitemb21')?.focus(); }, 10);
    }
  }

  keytab1(e: any, add: any) {
    if (e.key === 'Enter') {
      setTimeout(() => { document.getElementById('todate')?.focus(); }, 10);
    }
  }

  keytab2(e: any) {
    if (e.key === 'Enter') {
      document.getElementById('view')?.focus();
    }
  }

  backNavigation() {
    if (this.select === 'sectionissue') {
      this.router.navigate(['/dashboard']);
    } else if (this.select === 'viewissue') {
      this.lname = ''; this.lcode = '';
      this.toname = ''; this.tocode = '';
      this.dataadd = []; this.auth = false;
      // this.getviewselection = [];
      this.select = 'sectionissue';
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  public homeNavigate() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

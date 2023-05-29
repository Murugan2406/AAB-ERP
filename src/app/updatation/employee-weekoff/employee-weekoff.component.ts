/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { DatePipe } from '@angular/common';
import {
  Component, ElementRef, OnInit, QueryList, ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Globals } from 'src/app/globals';
import { VinthService } from 'src/app/services/vinth.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-weekoff',
  templateUrl: './employee-weekoff.component.html',
  styleUrls: ['./employee-weekoff.component.css'],
})
export class EmployeeWeekoffComponent implements OnInit {
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef> | any;

  isLoading: boolean = false;

  private subs = new SubSink();

  pipe: DatePipe;

 Branchloc = new Subject<any>();

 Branchloc1 = new Subject<any>();

 Branchloc2 = new Subject<any>();

  Branchloc3 = new Subject<any>();

 Branchloc4 = new Subject<any>();

  Empcode: any;

 month: any;

 Empname: any;

 Reason: any;

 branch: any;

 weekoffdate: any;

 chgdate: any;

  day: any;

 company: any;

  getempcode: any[] = [];

 getempday: any[] = [];

 getempname: any[];

  Empcode1: any;

 Empname1: any;

 doj: any;

  getempcodedata: any[] = [];

  brcode: any;

 gMenu: any;

  getempdatedata: any[] = [];

 getempnamealter: any[] = [];

  Empcodealt: any;

 Empcodealt1: any;

 Empnamealt: any;

 Empnamealt1: any;

 branchalt: any;

 brcodealt: any;

  getempcodealtdata: any[] = [];

 getapprbranch: any[] = [];

  frmety: any;

 toety: any;

 frmalt: any;

 toalt: any;

 altstatus: any;

 Region: any;

  getempviewdata: any[] = [];

 getempviewaltdata: any[] = [];

 getloadapprdata: any[] = [];

  aaprbranch = 'ALL';

 brcodeappr = '0';

 aaprbranch1 = 'ALL';

 brcodeappr1 = '0';

 aaprdesign1 = 'ALL';

 aaprdesign = 'ALL'

  getapprdesign: any[] = [];

 getempviewapprdata: any[] = [];

  getempviewappr: any[];

 dataarray: any[] = [];

 dataarray1: any[] = [];

  isMasterSel: boolean = false;

 selected: boolean = false;

 areason: any;

  emplappr: boolean = false;

  Viewapprrejectstatus: any[] = [];

  getempview: any[];

  getbrname: any[] = [];

  obrcode: any;

 obrcode1: any;

  empltable: boolean = false;

  getallempday: any[] = [];

  getallemp: string[];

  getempcodealt: string[];

  textnot: boolean = false;

  getempcodes: string[];

  auth: boolean = false;

  constructor(private service: VinthService, private router: Router, private globals: Globals) { this.pipe = new DatePipe('en'); this.gMenu = this.globals.gmainMenuSelected; }

  ngOnInit(): void {
    this.gMenu = 'EmployeeWeekoffentry';
    if (this.gMenu == 'EmployeeWeekoffalter') {
      this.getalterdate(); this.chgdate = this.pipe.transform(new Date(), 'yyyy-MM-dd'); this.getcodename1();
    } else if (this.gMenu == 'EmployeeWeekoffentry') {
      this.getload(); this.getcodename();
    } else if (this.gMenu == 'EmployeeWeekoffapproval') {
      this.loadappr(); this.altstatus = 'PENDING'; this.Region = 'ALL';
      this.appname1(); this.getalterdate1(); this.appname2();
    }
    if (this.globals.gclientServer == 'Client') {
      this.branch = this.globals.gBrname; this.branchalt = this.globals.gBrname; this.obrcode = this.globals.gBrcode;
    } else {
      this.getbrcodename();
    }
  }

  brchange(e: any) { this.Branchloc4.next(e); }

  brchangeloc(e: any, title: any) {
    if (e.source.selected) {
      this.obrcode = title.brcode; this.obrcode1 = title.brcode;
      this.branch = title.brname; this.branchalt = title.brname;
    }
  }

  getbrcodename() {
    this.subs.add(this.Branchloc4.pipe(debounceTime(600), distinctUntilChanged()).subscribe((dat: any) => {
      const gload = {
        reqMainreq: 'LoadBranchForEmployeeByAutoComplete', Usr: this.globals.gUsrid, brcode: this.globals.gBrcode, var1: dat,
      };
      this.getbrname = [];
      if (dat !== '') {
        this.subs.add(this.service.getratedata(gload).subscribe({
          next: (data: any) => {
            this.getbrname = data;
          },
          error: (err: any) => this.Error(err),
        }));
      }
    }));
  }

  getallview() {
    if (this.branch != '' && this.branch != undefined) {
      const gload = {
        reqMainreq: 'ViewAllEmployeeWeekOffDetail', Usr: this.globals.gUsrid, brcode: this.globals.gBrcode, var3: this.branch,
      };
      this.isLoading = true;
      this.subs.add(this.service.getratedata(gload).subscribe({
        next: (data: any) => {
          this.getallempday = data;
          this.empltable = true;
          this.getallempday.forEach((e: any) => {
            if (data[0].StatusRes == 'Success') { delete e.StatusRes; }
          });
          if (data.length > 0) {
            const Fullviewhead = this.getallempday[0];
            const Fullkeys = Object.keys(Fullviewhead);
            this.getallemp = Fullkeys;
          }
          this.isLoading = false;
        },
        error: (err: any) => this.Error(err),
      }));
    } else { Swal.fire({ text: 'Select Branch Name !.' }); }
  }

  Cleartab() {
    this.empltable = false;
  }

  // Weekoffentry
  getload() {
    const gload = { reqMainreq: 'LoadWeekOffDetail', Usr: this.globals.gUsrid, brcode: this.globals.gBrcode };
    this.subs.add(this.service.getratedata(gload).subscribe({
      next: (data: any) => {
        this.getempday = data;
      },
      error: (err: any) => this.Error(err),
    }));
  }

  change(e: any) { this.Branchloc.next(e); }

  changeloc(e: any, title: any) {
    if (e.source.selected) {
      this.Empcode = title.empcode; this.Empcode1 = title.empcode;
      this.Empname = title.empname; this.Empname1 = title.empname; this.getcode();
    }
  }

  getcodename() {
    this.subs.add(this.Branchloc.pipe(debounceTime(600), distinctUntilChanged()).subscribe((dat: any) => {
      const gload = {
        reqMainreq: 'LoadEmployeeForWeekOff', Usr: this.globals.gUsrid, brcode: this.obrcode, var1: dat,
      };
      this.getempname = [];
      if (dat !== '') {
        this.subs.add(this.service.getratedata(gload).subscribe({
          next: (data: any) => {
            this.getempname = data;
          },
          error: (err: any) => this.Error(err),
        }));
      }
    }));
  }

  clear1() {
    this.Empcode = ''; this.Empcode1 = ''; this.Empname = ''; this.Empname1 = ''; this.doj = '';
  }

  clear() {
    if (this.globals.gclientServer == 'Client') {
      this.getempcodedata = [];
      this.branch = this.globals.gBrname; this.branchalt = this.globals.gBrname; this.obrcode = this.globals.gBrcode; this.clear1(); this.day = '';
    } else {
      this.clear1(); this.day = ''; this.brcode = ''; this.branch = ''; this.getempcodedata = [];
    }
  }

  getcode() {
    const gload = {
      reqMainreq: 'GetEmployeeDetForWeekOff', Usr: this.globals.gUsrid, brcode: this.obrcode, var1: this.Empcode, var2: '', var3: this.branch,
    };
    this.getempcodedata = [];
    this.subs.add(this.service.getratedata(gload).subscribe({
      next: (data: any) => {
        this.getempcodedata = data;
        if (data[0].StatusRes == 'Success') {
          this.brcode = data[0].Brcode; this.branch = data[0].Branch;
          this.doj = data[0].DOJ; this.Empname = data[0].Empname; this.Empname1 = data[0].Empname;
          this.Empcode = data[0].Empcode; this.Empcode1 = data[0].Empcode;
        } else { Swal.fire({ text: data[0].StatusRes }); }
        this.getempcodedata.forEach((e: any) => {
          if (data[0].StatusRes == 'Success') { delete e.StatusRes; }
        });
        if (data.length > 0) {
          const Fullviewhead = this.getempcodedata[0];
          const Fullkeys = Object.keys(Fullviewhead);
          this.getempcodes = Fullkeys;
        }
      },
      error: (err: any) => this.Error(err),
    }));
  }

  keyemp(e: any) {
    if (e.key === 'Enter') {
      this.getcode(); setTimeout(() => { document.getElementById('day')?.focus(); }, 100);
    }
  }

  keytab(e: any, id: any) {
    if (e.key === 'Enter') {
      document.getElementById(id)?.focus();
    }
  }

  save() {
    if (this.branch != '' && this.branch != undefined) {
      if (this.branchalt == this.branch) {
        if (this.Empcode != '' && this.Empcode != undefined) {
          if (this.Empname != '' && this.Empname != undefined) {
            if (this.Empname == this.Empname1) {
              if (this.day != '' && this.day != undefined) {
                Swal.fire({
                  text: 'Are you sure to save',
                  // + ' ' + this.Empname.toLowerCase() + ' ?..'
                  showCancelButton: true,
                  confirmButtonText: 'YES',
                  cancelButtonText: 'NO',
                  confirmButtonColor: '#5bb75b',
                  cancelButtonColor: '#da4f49',
                }).then((result: { isConfirmed: any; }) => {
                  if (result.isConfirmed) {
                    const gesave = {
                      reqMainreq: 'SaveEmployeeWeekOffDetail',
                      Usr: this.globals.gUsrid,
                      brcode: this.brcode,
                      var1: this.Empcode,
                      var2: this.Empname,
                      var3: this.branch,
                      var4: this.day,
                      var5: this.doj,
                    };
                    this.subs.add(this.service.getratedata(gesave).subscribe({
                      next: (data: any) => {
                        this.getempcodedata = data;
                        if (data[0].StatusRes == 'Success') {
                          this.clear();
                        } else { Swal.fire({ text: data[0].StatusRes }); }
                      },
                      error: (err: any) => this.Error(err),
                    }));
                  }
                });
              } else { Swal.fire({ text: 'Select day !..' }); }
            } else { Swal.fire({ text: 'Invalid Empname !..' }); }
          } else { Swal.fire({ text: 'Enter Empname !..' }); }
        } else { Swal.fire({ text: 'Enter Empcode !..' }); }
      } else { Swal.fire({ text: 'Invalid Branch !..' }); }
    } else { Swal.fire({ text: 'Select Branch !..' }); }
  }

  viewsec() {
    if (this.globals.gclientServer == 'Client') {
      this.branch = this.globals.gBrname; this.obrcode = this.globals.gBrcode;
      this.auth = true;
    } else {
      this.branch = ''; this.obrcode = '';
      this.auth = false;
    }
    this.gMenu = 'Entryviewweekoff';
    this.frmety = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    this.toety = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    this.getempviewdata = []; // this.viewdata();
  }

  viewdata() {
    if (this.branch != '' && this.branch != undefined) {
      if (this.branch == this.branchalt) {
        const gload = {
          reqMainreq: 'ViewEmployeeWeekOffDetail',
          Usr: this.globals.gUsrid,
          brcode: this.obrcode,
          var1: this.pipe.transform(this.frmety, 'dd-MMM-yyyy'),
          var2: this.pipe.transform(this.toety, 'dd-MMM-yyyy'),
          var3: this.branch,
        };
        this.getempviewdata = []; this.isLoading = true;
        this.subs.add(this.service.getratedata(gload).subscribe({
          next: (data: any) => {
            this.getempviewdata = data;
            this.isLoading = false;
          },
        }));
      } else { Swal.fire({ text: 'Invalid Branch !..' }); }
    } else { Swal.fire({ text: 'Select Branch !..' }); }
  }

  // Weekoffalter
  getalterdate() {
    this.getempdatedata = [];
    const gload = { reqMainreq: 'LoadWeekOffAlterDetail', Usr: this.globals.gUsrid, brcode: this.globals.gBrcode };
    this.subs.add(this.service.getratedata(gload).subscribe({
      next: (data: any) => {
        this.getempdatedata = data;
        if (data[0].StatusRes == 'Success') {
          this.month = this.pipe.transform(data[0].TrnValue, 'yyyy-MM-dd');
        }
      },
    }));
  }

  change1(e: any) { this.Branchloc1.next(e); }

  changeloc1(e: any, title: any) {
    if (e.source.selected) {
      this.Empcodealt = title.empcode; this.Empcodealt1 = title.empcode;
      this.Empnamealt = title.empname; this.Empnamealt1 = title.empname;
      this.getalterempcode();
    }
  }

  getcodename1() {
    this.subs.add(this.Branchloc1.pipe(debounceTime(600), distinctUntilChanged()).subscribe((dat: any) => {
      const gload = {
        reqMainreq: 'LoadEmployeeForWeekOffAlter', Usr: this.globals.gUsrid, brcode: this.obrcode, var1: dat,
      };
      this.getempnamealter = [];
      if (dat !== '') {
        this.subs.add(this.service.getratedata(gload).subscribe({
          next: (data: any) => {
            this.getempnamealter = data;
          },
          error: (err: any) => this.Error(err),
        }));
      }
    }));
  }

  getalterempcode() {
    this.getempcodealtdata = [];
    const gload = {
      reqMainreq: 'GetEmployeeDetailForWeekOffAlter', Usr: this.globals.gUsrid, brcode: this.obrcode, var1: this.Empcodealt, var2: this.pipe.transform(this.month, 'dd-MMM-yyyy'), var3: this.branchalt,
    };
    this.subs.add(this.service.getratedata(gload).subscribe({
      next: (data: any) => {
        this.getempcodealtdata = data;

        if (data[0].StatusRes == 'Success') {
          this.textnot = true;
          this.Empcodealt = data[0].EmpCode; this.Empcodealt1 = data[0].EmpCode;
          this.Empnamealt = data[0].EmpName; this.Empnamealt1 = data[0].EmpName;
          this.branchalt = data[0].Branch; this.brcodealt = data[0].Brcode; this.weekoffdate = data[0].WeekOffAlterDay;
        } else { Swal.fire({ text: data[0].StatusRes }); }
        this.getempcodealtdata.forEach((e: any) => {
          if (data[0].StatusRes == 'Success') { delete e.StatusRes; }
        });
        if (data.length > 0) {
          const Fullviewhead = this.getempcodealtdata[0];
          const Fullkeys = Object.keys(Fullviewhead);
          this.getempcodealt = Fullkeys;
        }
      },
      error: (err: any) => this.Error(err),
    }));
  }

  keyemp1(e: any) {
    if (e.key === 'Enter') {
      this.getalterempcode();
      setTimeout(() => { document.getElementById('weekoffdate')?.focus(); }, 100);
    }
  }

  savealt() {
    if (this.branchalt != '' && this.branchalt != undefined) {
      if (this.branchalt == this.branch) {
        if (this.Empcodealt != '' && this.Empcodealt != undefined) {
          if (this.Empnamealt != '' && this.Empnamealt != undefined) {
            if (this.Empnamealt == this.Empnamealt1) {
              if (this.Reason != '' && this.Reason != undefined) {
                Swal.fire({
                  text: 'Are you sure to save',
                  // + ' ' + this.Empnamealt.toLowerCase() + ' ?..'
                  showCancelButton: true,
                  confirmButtonText: 'YES',
                  cancelButtonText: 'NO',
                  confirmButtonColor: '#5bb75b',
                  cancelButtonColor: '#da4f49',
                }).then((result: { isConfirmed: any; }) => {
                  if (result.isConfirmed) {
                    const gesave = {
                      reqMainreq: 'SaveWeekOffAlterDetail',
                      Usr: this.globals.gUsrid,
                      brcode: this.brcodealt,
                      var1: this.Empcodealt,
                      var2: this.pipe.transform(this.month, 'dd-MMM-yyyy'),
                      var3: this.pipe.transform(this.chgdate, 'dd-MMM-yyyy'),
                      var4: this.Empnamealt,
                      var5: this.branchalt,
                      var6: this.weekoffdate,
                      var7: this.Reason,
                    };
                    this.subs.add(this.service.getratedata(gesave).subscribe({
                      next: (data: any) => {
                        this.getempcodedata = data;
                        if (data[0].StatusRes == 'Success') {
                          this.clearalt();
                        } else { Swal.fire({ text: data[0].StatusRes }); }
                      },
                      error: (err: any) => this.Error(err),
                    }));
                  }
                });
              } else { Swal.fire({ text: 'Enter Reason !..' }); }
            } else { Swal.fire({ text: 'Invalid Empname !..' }); }
          } else { Swal.fire({ text: 'Enter Empname !..' }); }
        } else { Swal.fire({ text: 'Enter Empcode !..' }); }
      } else { Swal.fire({ text: 'Invalid Branch !..' }); }
    } else { Swal.fire({ text: 'Select Branch !..' }); }
  }

  clearalt() {
    if (this.globals.gclientServer == 'Client') {
      this.branch = this.globals.gBrname; this.branchalt = this.globals.gBrname; this.obrcode = this.globals.gBrcode; this.brcodealt = this.globals.gBrcode;
    } else {
      this.Empcodealt = ''; this.Empcodealt1 = ''; this.Empnamealt = ''; this.Empnamealt1 = ''; this.brcodealt = ''; this.branchalt = '';
      this.weekoffdate = ''; this.chgdate = this.pipe.transform(new Date(), 'yyyy-MM-dd'); this.Reason = ''; this.getalterdate(); this.getempcodealtdata = [];
    }
  }

  viewsecalt() {
    if (this.globals.gclientServer == 'Client') {
      this.auth = true;
      this.branchalt = this.globals.gBrname; this.obrcode = this.globals.gBrcode;
    } else {
      this.auth = false;
      this.branchalt = ''; this.obrcode = '';
    }
    this.gMenu = 'Entryviewweekoffalter'; this.altstatus = 'ALL';
    this.frmalt = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    this.toalt = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    this.getempviewaltdata = [];
  }

  changests() {
    this.viewdataalt();
  }

  viewdataalt() {
    if (this.branchalt != '' && this.branchalt != undefined) {
      if (this.branch == this.branchalt) {
        const gloadalt = {
          reqMainreq: 'ViewWeekOffAlterDetail',
          Usr: this.globals.gUsrid,
          brcode: this.obrcode,
          var1: this.pipe.transform(this.frmalt, 'dd-MMM-yyyy'),
          var2: this.pipe.transform(this.toalt, 'dd-MMM-yyyy'),
          var3: this.altstatus,
          var4: this.branchalt,
        };
        this.getempviewaltdata = []; this.isLoading = true;
        this.subs.add(this.service.getratedata(gloadalt).subscribe({
          next: (data: any) => {
            this.getempviewaltdata = data;
            this.getempviewaltdata.forEach((e: any) => {
              if (data[0].StatusRes == 'Success') { delete e.StatusRes; }
            });
            if (data.length > 0) {
              const Fullviewhead = this.getempviewaltdata[0];
              const Fullkeys = Object.keys(Fullviewhead);
              this.getempview = Fullkeys;
            }
            this.isLoading = false;
          },
        }));
      } else { Swal.fire({ text: 'Invalid Branch !..' }); }
    } else { Swal.fire({ text: 'Select Branch !..' }); }
  }

  // approval
  getalterdate1() {
    this.getempdatedata = [];
    const gload = { reqMainreq: 'LoadWeekOffAlterDetail', Usr: this.globals.gUsrid, brcode: this.globals.gBrcode };
    this.subs.add(this.service.getratedata(gload).subscribe({
      next: (data: any) => {
        this.getempdatedata = data;
        if (data[0].StatusRes == 'Success') {
          this.month = this.pipe.transform(data[0].TrnValue, 'yyyy-MM-dd');
          this.viewapprove();
        }
      },
    }));
  }

  loadappr() {
    const gloadappr = { reqMainreq: 'LoadWeekOffAlterApprovalDetail', Usr: this.globals.gUsrid, brcode: this.globals.gBrcode };
    this.getloadapprdata = [];
    this.subs.add(this.service.getratedata(gloadappr).subscribe({
      next: (data: any) => {
        this.getloadapprdata = data;
      },
    }));
  }

  appchange(e: any) { this.Branchloc2.next(e); }

  appchangeloc(e: any, title: any) {
    if (e.source.selected) {
      this.brcodeappr = title.CODE; this.brcodeappr1 = title.CODE;
      this.aaprbranch = title.CNAME; this.aaprbranch1 = title.CNAME;
    }
  }

  appname1() {
    this.subs.add(this.Branchloc2.pipe(debounceTime(600), distinctUntilChanged()).subscribe((dat: any) => {
      const gload = {
        reqMainreq: 'LoadDetailForWeekOffAlterApprovalByAutoComplete', Usr: this.globals.gUsrid, brcode: this.globals.gBrcode, var1: dat, var2: 'BRANCH', var3: this.Region,
      };
      this.getapprbranch = [];
      if (dat !== '') {
        this.subs.add(this.service.getratedata(gload).subscribe({
          next: (data: any) => {
            this.getapprbranch = data;
          },
          error: (err: any) => this.Error(err),
        }));
      }
    }));
  }

  appchange1(e: any) { this.Branchloc3.next(e); }

  appchangeloc1(e: any, title: any) {
    if (e.source.selected) {
      this.aaprdesign = title.CNAME; this.aaprdesign1 = title.CNAME;
    }
  }

  appname2() {
    this.subs.add(this.Branchloc3.pipe(debounceTime(600), distinctUntilChanged()).subscribe((dat: any) => {
      const gload = {
        reqMainreq: 'LoadDetailForWeekOffAlterApprovalByAutoComplete', Usr: this.globals.gUsrid, brcode: this.globals.gBrcode, var1: dat, var2: 'DEPARTMENT', var3: this.Region,
      };
      this.getapprdesign = [];
      if (dat !== '') {
        this.subs.add(this.service.getratedata(gload).subscribe({
          next: (data: any) => {
            this.getapprdesign = data;
          },
          error: (err: any) => this.Error(err),
        }));
      }
    }));
  }

  viewapprove() {
    const gloadview = {
      reqMainreq: 'ViewWeekOffAlterApprovalDetail',
      Usr: this.globals.gUsrid,
      brcode: this.brcodeappr,
      var1: this.Region,
      var2: this.aaprbranch,
      var3: this.aaprdesign,
      var4: this.pipe.transform(this.month, 'dd-MMM-yyyy'),
      var5: this.altstatus,
    };
    this.getempviewapprdata = []; this.isLoading = true;
    this.subs.add(this.service.getratedata(gloadview).subscribe({
      next: (data: any) => {
        this.selected = false;
        this.isMasterSel = false;
        this.getempviewapprdata = data.map((e) => ({ ...e, selected: false }));
        this.getempviewapprdata.forEach((e: any) => {
          if (data[0].StatusRes == 'Success') { delete e.StatusRes; delete e.selected; }
        });
        if (data.length > 0) {
          const Fullviewhead = this.getempviewapprdata[0];
          const Fullkeys = Object.keys(Fullviewhead);
          this.getempviewappr = Fullkeys;
        }
        this.isLoading = false;
      },
    }));
  }

  changesnew() { this.viewapprove(); }

  checkUncheckAll() {
    this.dataarray = []; this.dataarray1 = [];
    for (let i = 0; i < this.getempviewapprdata.length; i++) { this.getempviewapprdata[i].selected = this.isMasterSel; }
    this.getList();
  }

  getList() {
    for (let i = 0; i < this.getempviewapprdata.length; i++) {
      if (this.getempviewapprdata[i].selected == true) {
        this.dataarray.push(this.getempviewapprdata[i]);
      } else if (this.getempviewapprdata[i].selected == false) { this.dataarray1 = []; }
    }
    this.dataarray.forEach((brn1: any) => { this.dataarray1.push(brn1.TrnNo); });
    console.log(this.dataarray1, this.dataarray);
  }

  chkchange(el: any, appr: any) {
    this.isMasterSel = this.getempviewapprdata.every((item: any) => item.selected == true);
    if (!this.dataarray.includes(appr)) {
      this.dataarray = [...this.dataarray, appr];
      this.dataarray1.push(appr.TrnNo);
      console.log(this.dataarray1, this.dataarray);
    } else {
      this.dataarray.forEach((e) => {
        if (e == appr) { this.dataarray.splice(this.dataarray.indexOf(e), 1); }
      });
      this.dataarray1.forEach((ele) => {
        if (ele == appr.TrnNo) { this.dataarray1.splice(this.dataarray1.indexOf(ele), 1); }
      });
    }
  }

  Apprreject() {
    if (this.dataarray1.length == 0) {
      Swal.fire({ text: 'Select atleast one value !..' });
    } else {
      this.emplappr = true;
    }
  }

  changeapprej(appreject: NgForm, id: any, timerProgressBar: boolean = false) {
    let rej: any;
    if (id === 'APPROVED') {
      rej = id;
    } else if (id == 'REJECTED') {
      rej = id;
    }
    if (this.areason != undefined && this.areason != '') {
      const gloadview = {
        reqMainreq: 'ApproveWeekOffAlter',
        Usr: this.globals.gUsrid,
        brcode: this.brcodeappr,
        var1: rej,
        var3: this.areason,
        var4: this.pipe.transform(this.month, 'dd-MMM-yyyy'),
        var20: this.dataarray1.join(','),
      };
      this.subs.add(this.service.getratedata(gloadview).subscribe((data) => {
        this.Viewapprrejectstatus = data;
        if (data[0].StatusRes === 'Success') {
          this.viewapprove(); this.dataarray1 = []; this.dataarray = [];
          this.checkboxes.forEach((ele: any) => {
            ele.nativeElement.checked = false;
          }); this.isMasterSel = false; appreject.resetForm();
          Swal.fire({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            icon: 'success',
            timerProgressBar,
            timer: 1200,
            title: 'Successfully Updated !.',
          });
          this.emplappr = false; this.areason = '';
        } else { Swal.fire({ text: data[0].StatusRes }); }
      }));
    }
  }

  cancel(REJECTED: NgForm) {
    this.viewapprove();
    this.selected = false; this.isMasterSel = false; this.emplappr = false;
    REJECTED.resetForm(); this.dataarray = []; this.dataarray1 = [];
  }

  backNavigation() {
    if (this.gMenu == 'Entryviewweekoffalter') {
      if (this.globals.gclientServer == 'Client') {
        this.gMenu = 'EmployeeWeekoffalter'; this.branchalt = this.globals.gBrname; this.obrcode = this.globals.gBrcode;
      } else {
        this.gMenu = 'EmployeeWeekoffalter'; this.branchalt = ''; this.obrcode = '';
      }
    } else if (this.gMenu == 'Entryviewweekoff') {
      if (this.globals.gclientServer == 'Client') {
        this.gMenu = 'EmployeeWeekoffentry'; this.branch = this.globals.gBrname; this.obrcode = this.globals.gBrcode;
      } else {
        this.gMenu = 'EmployeeWeekoffentry'; this.branch = ''; this.obrcode = '';
      }
    } else { this.router.navigate(['/dashboard']); }
  }

  public homeNavigate() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy() { this.subs.unsubscribe(); }

  Error(err: any) {
    this.isLoading = false;
    Swal.fire(err.message);
  }
}

/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-mixed-operators */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { VinthService } from 'src/app/services/vinth.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-ip-config',
  templateUrl: './ip-config.component.html',
  styleUrls: ['./ip-config.component.css'],
})
export class IpConfigComponent implements OnInit {
  @ViewChild('Editipconfig') form: any;

  isLoading: boolean = false;

  private subs = new SubSink();

  pipe: DatePipe;

  select = 'ipconfighome';

 Reason: any;

 Manual: any;

 status: any;

 Branch='ALL';

  getbranchloaddata: any[] = [];

 Branchloc = new Subject<any>();

  Branch1='ALL';

 Brcode='0';

 Brcode1='0';

  getstatdata: any[] = [];

 getUpdateddata: any[] = [];

  Reasonvalue: boolean = false;

 rejectreason: any;

 AppServerIp: any;

 Ip: any;

 DbName: any;

  DbIp: any;

 AppServerApiPort: any;

 SecondaryDbIp: any;

 SecondaryDbName: any;

 SqlWebPort: any;

  DrIp: any;

 To: any;

 From: any;

  getviewdata: any[] = [];

  fullviewdata: any[] = [];

  Fullviewhead: any;

  newBrcode: any;

  submitted: boolean =false;

  // emk updates 15-Jul-2022
  AppSerOS:any;

 appSerOSList = ['Windows', 'Ubuntu']
 // emk

 constructor(
private service: VinthService,
private router: Router,
private globals: Globals,
private commonService: CommonService,

    private fb: FormBuilder,
 ) { this.pipe = new DatePipe('en'); }

 ngOnInit(): void {
   this.getbranchload(); this.keytab1();
   this.From = this.pipe.transform(new Date(), 'yyyy-MM-dd');
   this.To = this.pipe.transform(new Date(), 'yyyy-MM-dd');
 }

 change(e: any) {
   this.Branchloc.next(e);
 }

 getbranchload() {
   this.subs.add(this.Branchloc.pipe(debounceTime(600), distinctUntilChanged()).subscribe((dat: any) => {
     const rateload = {
       reqMainreq: 'LoadBranchWithAllByAutoComplete', Usr: this.globals.gUsrid, brcode: this.globals.gBrcode, var1: dat,
     };
     if (dat != '') {
       this.subs.add(this.service.getratedata(rateload).subscribe({
         next: (data: any) => {
           this.getbranchloaddata = data;
         },
         error: (err: any) => this.Error(err),
       }));
     }
   }));
 }

 changeloc(e: any, title: any) {
   if (e.source.selected) {
     this.Branch = title.brname;
     this.Branch1 = title.brname;
     this.Brcode = title.brcode;
     this.Brcode1 = title.brcode;
     this.keytab1();
     this.viewalldata();
   }
 }

 IPAddressKeyOnly(event: any) {
   return '';
 }

 keytab1() {
   if (this.Branch != '' && this.Branch != undefined) {
     if (this.Branch == this.Branch1) {
       const statload = {
         reqMainreq: 'GetBranchIpConfigDetail', Usr: this.globals.gUsrid, brcode: this.Brcode, var1: this.Branch,
       };
       this.subs.add(this.service.getratedata(statload).subscribe({
         next: (data: any) => {
           this.getstatdata = data;
         },
         error: (err: any) => this.Error(err),
       }));
     } else {
       Swal.fire({ text: 'Invalid Branch Name' });
     }
   } else {
     Swal.fire({ text: 'Select Branch Name' });
   }
 }

 edit(ask: any) {
   // this.form.invalid;
   this.newBrcode = ask.Brcode;
   this.AppServerIp = ask.AppServerIp; this.Ip = ask.Ip; this.DbName = ask.DbName;
   this.DbIp = ask.DbIp; this.AppServerApiPort = ask.AppServerApiPort; this.SecondaryDbIp = ask.SecondaryDbIp;
   this.SecondaryDbName = ask.SecondaryDbName; this.SqlWebPort = ask.SqlWebPort; this.DrIp = ask.DrIp;
   this.Reasonvalue = true; this.AppSerOS = ask.AppServerOS;
 }

 keytab(e: any, id: any) {
   if (e.key === 'Enter') {
     document.getElementById(id)?.focus();
   }
 }

 getdasta() {
   console.log(this.AppSerOS);
   if (this.form.valid) {
     this.commonService.taskConfirmation('Are you sure to update ?', '', true, 'Yes', '').then((res) => {
       if (res.isConfirmed) {
         const viewdata = {
           reqMainreq: 'SaveBranchIpConfigDetail',
           Usr: this.globals.gUsrid,
           brcode: this.newBrcode,
           var1: this.Ip.toString(),
           var2: this.DbIp.toString(),
           var3: this.DbName.toString(),
           var4: this.AppServerIp.toString(),
           var5: this.AppServerApiPort.toString(),
           var6: this.SqlWebPort.toString(),
           var7: this.SecondaryDbIp.toString(),
           var8: this.SecondaryDbName.toString(),
           var9: this.DrIp.toString(),
           var10: this.AppSerOS,
         };
         this.subs.add(this.service.getratedata(viewdata).subscribe({
           next: (data: any) => {
             this.getviewdata = data;
             if (data[0].StatusRes == 'Success') {
               this.keytab1();
               this.Reasonvalue = false;
               Swal.fire({ text: 'Updated Successfully' });
             } else {
               Swal.fire({ text: data[0].StatusRes });
             }
           },
           error: (err: any) => this.Error(err),
         }));
       }
     });
   }
 }

 cancelapp() {
   this.Reasonvalue = false;
 }

 viewdattab() {
   this.Branch = 'ALL';
   this.select = 'ipconfigview';
   this.fullviewdata = [];
   this.viewalldata();
 }

 viewalldata() {
   if (this.Branch != '' && this.Branch != undefined) {
     if (this.Branch == this.Branch1) {
       const viewlistdata = {
         reqMainreq: 'ViewBranchIpConfigDetail',
         Usr: this.globals.gUsrid,
         brcode: this.Brcode,
         var1: this.Branch,
         var3: this.pipe.transform(this.From, 'dd-MMM-yyyy'),
         var4: this.pipe.transform(this.To, 'dd-MMM-yyyy'),
       };
       this.isLoading = true;
       this.subs.add(this.service.getratedata(viewlistdata).subscribe({
         next: (data: any) => {
           this.fullviewdata = data;
           this.isLoading = false;
           this.fullviewdata.forEach((e: any) => {
             if (data[0].StatusRes == 'Success') {
               delete e.StatusRes;
             }
           });
           if (data.length > 0) {
             const Fullviewhead = this.fullviewdata[0];
             const Fullkeys = Object.keys(Fullviewhead);
             this.Fullviewhead = Fullkeys;
           }
         },
         error: (err: any) => this.Error(err),
       }));
     } else {
       Swal.fire({ text: 'Invalid Branch Name' });
     }
   } else {
     Swal.fire({ text: 'Select Branch Name' });
   }
 }

 exportexcel(): void {
   this.fullviewdata.forEach((e: any) => {
     delete e.StatusRes;
   });
   this.service.exportAsExcelFile(this.fullviewdata, this.Branch);
 }

 backNavigation() {
   if (this.select == 'ipconfigview') {
     this.select = 'ipconfighome';
     this.Branch = 'ALL'; this.fullviewdata = [];
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

 Error(err: any) {
   this.isLoading = false;
   Swal.fire(err.message);
 }
}

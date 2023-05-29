import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  FormGroup, FormsModule, FormBuilder, Validators, ValidationErrors,
} from '@angular/forms';
import { RecordsService } from '../records.service';
import { ApprovalreqconsComponent } from '../approvalreqcons/approvalreqcons.component';
import { Globals } from '../globals';

@Component({
  selector: 'app-approvalreqdtls',
  templateUrl: './approvalreqdtls.component.html',
  styleUrls: ['./approvalreqdtls.component.css'],
})

export class ApprovalreqdtlsComponent implements OnInit {
  lguser = { reason: '' } ;

  public mode = ''; // indeterminate

  public reasonVisible = false;

  getApprovalData: any = [];

 progressval = '';

  reqMainreq = 'TOAPPROVE_DTLVIEW';

  aprStatus = 'FRESH';

 reqfromDTAP = '0';

 reqfromIp = '0';

  TrnNoCollection = '';

  constructor(private router: Router, private myGService: RecordsService, private globals: Globals, private toastr: ToastrService) { }

  ngOnInit() {
    this.myGService.getapprovalReqJson(
      this.reqMainreq,
      this.globals.gsideMenuSelected,
      this.aprStatus,
      this.globals.gUsrid,
      this.reqfromDTAP,
      this.reqfromIp,
      this.globals.gTrnNo,
      this.globals.gBrcode,
      '0',
      '0',
      '0',
      '0',
      '0',
    )
      .subscribe(
        (data) => {
          this.getApprovalData = data;
        },
      );
  }

  showCancellReasonDiv() {
    if (this.reasonVisible === false) {
      this.reasonVisible = true;
    } else {
      this.reasonVisible = false;
    }
  }

  approveRequest() {
    if (confirm('Do you approve ?') === true) {
      this.mode = 'indeterminate';
      this.reqMainreq = 'Final_Approval'; this.aprStatus = 'APPROVE';
      this.TrnNoCollection = `''${this.globals.gTrnNo}''`;
      this.myGService.doApprovalConfirm(
        this.globals.gsideMenuSelected,
        this.aprStatus,
        this.globals.gBrcode,
        this.TrnNoCollection,
        this.globals.gUsrid,
        '1-1-1',
        '0',
        this.globals.gTrnNo,
        '1-1-1',
        'MOBAPP',
        '0',
        '0',
      )
        .subscribe((data) => {
          if (data[0].statusmsg === 'OK') {
          // this.mode = 'determinate';
          // this.toastr.warning("Ok! Approved successfully","Confirm");
            this.globals.gTrnNo = '0';
            this.router.navigate(['approvalreqcons']);
          } else {
            window.alert(data[0].statusmsg);
          }
        });
    }
  }

  // REJECT
  cancelRequest(reasonInput: string) {
    window.alert(reasonInput);
    if (confirm('Do you reject ?') === true) {
      this.mode = 'indeterminate';
      this.reqMainreq = 'Final_Approval'; this.aprStatus = 'REJECT';
      this.TrnNoCollection = `''${this.globals.gTrnNo}''`;
      this.myGService.doApprovalConfirm(
        this.globals.gsideMenuSelected,
        this.aprStatus,
        this.globals.gBrcode,
        this.TrnNoCollection,
        this.globals.gUsrid,
        '1-1-1',
        reasonInput,
        this.globals.gTrnNo,
        '1-1-1',
        'MOBAPP',
        '0',
        '0',
      )
        .subscribe(
          (data) => {
            if (data[0].statusmsg === 'OK') {
              this.globals.gTrnNo = '0';
              this.router.navigate(['approvalreqcons']);
            } else {
              this.mode = '';
              this.globals.gTrnNo = '0';
              this.router.navigate(['approvalreqcons']);
              window.alert(data[0].statusmsg);
            }
          },
          (err) => this.logError(err),
        );
    }
  }

  onSubmit({ value, valid }) {
    if (valid) {
      if (confirm('Do you reject ?') === true) {
        this.mode = 'indeterminate';
        this.reqMainreq = 'Final_Approval'; this.aprStatus = 'REJECT';
        this.TrnNoCollection = `''${this.globals.gTrnNo}''`;
        this.myGService.doApprovalConfirm(
          this.globals.gsideMenuSelected,
          this.aprStatus,
          this.globals.gBrcode,
          this.TrnNoCollection,
          this.globals.gUsrid,
          '1-1-1',
          value.reason,
          this.globals.gTrnNo,
          '1-1-1',
          'MOBAPP',
          '0',
          '0',
        )
          .subscribe(
            (data) => {
              if (data[0].statusmsg === 'OK') {
                this.globals.gTrnNo = '0';
                this.router.navigate(['approvalreqcons']);
              } else {
                this.mode = '';
                this.globals.gTrnNo = '0';
                this.router.navigate(['approvalreqcons']);
                window.alert(data[0].statusmsg);
              }
            },
            (err) => this.logError(err),
          );
      }
    } else {
      console.log('Invalid inputs');
    }
  }

  logError(err: any) {
    window.alert('Client or server not connected !..');
  }
}

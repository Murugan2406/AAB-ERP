import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Globals } from 'src/app/globals';
import { RecordsService } from 'src/app/records.service';

@Component({
  selector: 'app-approvalreqcons',
  templateUrl: './approvalreqcons.component.html',
  styleUrls: ['./approvalreqcons.component.css']
})

export class ApprovalreqconsComponent implements OnInit {
  menuCaption = '';
  getApprovalData: any = [];
  reqMainreq = 'TOAPPROVE_CONSVIEW';
  raFlag = this.globals.gsideMenuSelected;
  aprStatus = 'FRESH';
  reqfromDTAP = '0'; reqfromIp = '0';

  constructor(private myGService: RecordsService, private globals: Globals) { }

  ngOnInit() {
    // this.raFlag = 'CR_APP_ORD'
    // this.menuCaption = 'Credit Bill Approval for Order';

    if (this.raFlag === 'CR_APP_ORD') {
      this.menuCaption = 'Credit Bill Approval for Order';
    } else if (this.raFlag === 'CRP_CRAMT_MORE') {
      this.menuCaption = 'High Value or Credit Period';
    } else if (this.raFlag === 'CR_APP_CUST') {
      this.menuCaption = 'Credit Approval for Customer';
    } else if (this.raFlag === 'DISC_APP_CUST') {
      this.menuCaption = 'Discount Approval for Customer';
    } else if (this.raFlag === 'DISC_APP_ORD') {
      this.menuCaption = 'Discount Approval for Order';
    } else if (this.raFlag === 'DISC_APP_ORD_ITM') {
      this.menuCaption = 'Rate Change Request';
    }
    this.myGService.getapprovalReqJson(this.reqMainreq, this.raFlag, this.aprStatus, this.globals.gUsrid,
    this.reqfromDTAP, this.reqfromIp, '0', 0, '0', '0', '0', '0', '0')
    .subscribe (
      (data) => { this.getApprovalData = data;
      },
      err => this.logError(err)
      );
    }


  logError(err: any) {
    window.alert('Client or server not connected !..');
  }


  OnSelectedval(brcodeLc: any, trnNolc: string, orderno: string) {
    this.globals.gBrcode = brcodeLc;
    this.globals.gTrnNo = trnNolc;
    this.globals.orderno = orderno;
  }


}

/* eslint-disable import/prefer-default-export */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositentryComponent } from './depositentry/depositentry.component';

import { EmployeeWeekoffComponent } from './employee-weekoff/employee-weekoff.component';
import { SetIssuesComponent } from './set-issues/set-issues.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { CommonAuthourityComponent } from './common-authourity/common-authourity.component';
import { DcinComponent } from './dcin/dcin.component';
import { DcoutComponent } from './dcout/dcout.component';
import { FaceapicrossverifyComponent } from './faceapicrossverify/faceapicrossverify.component';
import { GoodsIssuesComponent } from './goods-issues/goods-issues.component';
import { UpdatedGoodsIssueComponent } from './updated-goods-issue/updated-goods-issue.component';

import { ItemsSelectComponent } from './items-select/items-select.component';
import { UpdateOldComponent } from './update-old/update-old.component';
import { DebtorLedgerComponent } from './debtor-ledger/debtor-ledger.component';
import { SectionCommonProductIssueComponent } from './section-common-product-issue/section-common-product-issue.component';
import { RmsalesportionComponent } from './rmsalesportion/rmsalesportion.component';
import { CustomerSalesReportComponent } from './customer-sales-report/customer-sales-report.component';
import { OrderInvoiceBillComponent } from './orderInvoice/orderInvoiceBill.component';
import { StockCorrectionComponent } from './stock-correction/stock-correction.component';
import { StockReportComponent } from '../stock-report/stock-report.component';
import { SetReturnRequestComponent } from '../set-return-request/set-return-request.component';

const routes: Routes = [
  { path: 'Updated-goods-Issues', component: UpdatedGoodsIssueComponent },
  { path: 'goods-Issues', component: GoodsIssuesComponent },
  { path: 'item-select', component: ItemsSelectComponent },
  { path: 'face-api', component: FaceapicrossverifyComponent },
  { path: 'do-out', component: DcoutComponent },
  { path: 'do-in', component: DcinComponent },
  { path: 'common-authority', component: CommonAuthourityComponent },
  { path: 'ledger', component: DebtorLedgerComponent },
  { path: 'SecProdIssue', component: SectionCommonProductIssueComponent },
  { path: '', component: UpdateOldComponent },
  { path: 'SalesReport', component: SalesReportComponent },
  { path: 'RmsSalesReport', component: RmsalesportionComponent },
  { path: 'customersalesReport', component: CustomerSalesReportComponent },
  { path: 'set-issue', component: SetIssuesComponent },
  { path: 'employeeWelfare', component: EmployeeWeekoffComponent },
  { path: 'orderinvoice', component: OrderInvoiceBillComponent },
  { path: 'stockCorrection', component: StockCorrectionComponent },
  { path: 'deposite', component: DepositentryComponent },
  { path: 'stock-report', component: StockReportComponent },
  { path: 'set-return', component: SetReturnRequestComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatationRoutingModule { }

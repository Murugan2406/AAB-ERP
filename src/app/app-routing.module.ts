/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningBalanceComponent } from './opening-balance/opening-balance.component';
import { NumberingTypeComponent } from './numbering-type/numbering-type.component';

import { AMCMasterComponent } from './amcmaster/amcmaster.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';
import { CustomerOnAccBalanceComponent } from './customer-on-acc-balance/customer-on-acc-balance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemSwapComponent } from './Karupasamy Sir/item-swap/item-swap.component';
import { ChequePaymentsComponent } from './RamaChandran sir/cheque-payments/cheque-payments.component';
import { JournalVoucherComponent } from './Saranya Mam/journal-voucher/journal-voucher.component';
import { SundryReceiptsComponent } from './Saranya Mam/SundryReceipts/SundryReceipts.component';
import { TableTestComponent } from './table-test/table-test.component';
import { TerminalToUserComponent } from './terminal-to-user/terminal-to-user.component';
import { MasterLedgerComponent } from './master-ledger/master-ledger.component';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { DebitCreditNoteComponent } from './Saranya Mam/debit-credit-note/debit-credit-note.component';
import { DebtorLedgerComponent } from './debtor-ledger/debtor-ledger.component';
import { IpConfigComponent } from './ip-config/ip-config.component';
import { FactoryProductionComponent } from './factory-production/factory-production.component';
import { ProductionBarcodeComponent } from './production-barcode/production-barcode.component';
import { TareWeightComponent } from './tare-weight/tare-weight.component';
import { StoreissueComponent } from './storeissue/storeissue.component';
import { IntentItemsComponent } from './intent-items/intent-items.component';
import { SetIssuesComponent } from './updatation/set-issues/set-issues.component';
import { TrackarComponent } from './trackar/trackar.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { MyticketsComponent } from './mytickets/mytickets.component';
import { FilterTicketsComponent } from './filter-tickets/filter-tickets.component';
import { BrticketReportsComponent } from './brticket-reports/brticket-reports.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { NewTrackerComponent } from './new-tracker/new-tracker.component';
import { DcinoutmappingbranchComponent } from './dcinoutmappingbranch/dcinoutmappingbranch.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ChequePaymentsComponent,
    outlet: 'child1',
  },
  {
    path: '',
    component: TableTestComponent,
    outlet: 'child2',
  },
  // { path: 'newdashboard', component: NewdashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'Accounts',
    loadChildren: () => import('./accounts/accounts.module').then((m) => m.AccountsModule),
  },
  {
    path: 'EmployeeWelfare',
    loadChildren: () => import('./employee-welfare/employee-welfare.module').then((m) => m.EmployeeWelfareModule),
  },
  {
    path: 'finbookGroup',
    loadChildren: () => import('./finbook-group/finbook-group.module').then((m) => m.FinbookGroupModule),
  },
  {
    path: 'Updatation',
    loadChildren: () => import('./updatation/updatation.module').then((m) => m.UpdatationModule),
  },
  {
    path: 'Approval',
    loadChildren: () => import('./approvals-list/approvals-list.module').then((m) => m.ApprovalsListModule),
  },
  { path: 'customer-on-acc-balance', component: CustomerOnAccBalanceComponent },
  { path: 'terminal-to-user', component: TerminalToUserComponent },
  // { path: 'SharedComponent', component: A2bSharedComponent },
  {
    path: 'cheque-Payment',
    component: ChequePaymentsComponent,
  },
  // { path: 'table-test', component: TableTestComponent },
  { path: 'sundry-receipt', component: SundryReceiptsComponent },
  { path: 'Item-Swap', component: ItemSwapComponent },
  { path: 'Journal-Voucher', component: JournalVoucherComponent },
  { path: 'DCNote', component: DebitCreditNoteComponent },
  { path: 'master-Ledger', component: MasterLedgerComponent },
  { path: 'dynamic-forms', component: DynamicFormsComponent },
  { path: 'form-Generator', component: FormGeneratorComponent },
  { path: 'AMC-Master', component: AMCMasterComponent },
  { path: 'Numberic-Type', component: NumberingTypeComponent },
  { path: 'Opening-Balance', component: OpeningBalanceComponent },
  { path: 'debtor-ledger', component: DebtorLedgerComponent },
  { path: 'IP-Config', component: IpConfigComponent },
  { path: 'factory-Prod', component: FactoryProductionComponent },
  { path: 'Prod-Barcode', component: ProductionBarcodeComponent },
  { path: 'Store-Issue', component: StoreissueComponent },
  { path: 'Tare-Weight', component: TareWeightComponent },
  { path: 'Intent-Item', component: IntentItemsComponent },
  { path: 'set-issue', component: SetIssuesComponent },
  { path: 'ClientServerCommon/RequestTracker1', component: NewTrackerComponent },
  { path: 'ClientServerCommon/RequestTracker', component: TrackarComponent },
  { path: 'ClientServerCommon/CreateTicket', component: CreateTicketComponent },
  { path: 'ClientServerCommon/tickets', component: MyticketsComponent },
  { path: 'ClientServerCommon/filter-tickets', component: FilterTicketsComponent },
  { path: 'ClientServerCommon/filter2-tickets', component: BrticketReportsComponent },
  { path: 'ClientServerCommon/ticket-details', component: TicketDetailsComponent },
  { path: 'DcInOut', component: DcinoutmappingbranchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
// eslint-disable-next-line import/prefer-default-export
export class AppRoutingModule { }

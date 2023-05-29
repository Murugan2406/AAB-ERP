import { PdfReader } from 'pdfreader';
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { NgModule, Optional } from '@angular/core';
import {
  BrowserModule, EVENT_MANAGER_PLUGINS, HAMMER_GESTURE_CONFIG, HAMMER_LOADER, HammerGestureConfig,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT, DatePipe } from '@angular/common';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { WebcamModule } from 'ngx-webcam';
import { gCurrencyPipe } from 'src/app/services/gCurrency.pipe';
import { TreeModule } from '@circlon/angular-tree-component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPrintModule } from 'ngx-print';
import { NgPrintModule } from 'ng-print';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
// import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {
  DateAdapter, MatNativeDateModule, MatRippleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { ChartsModule } from 'ng2-charts';
import { NgxSummernoteModule } from 'ngx-summernote';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
// import { GestureConfig } from '@angular/material/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Globals, MyDateFormat } from './globals';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomerOnAccBalanceComponent } from './customer-on-acc-balance/customer-on-acc-balance.component';
import { TerminalToUserComponent } from './terminal-to-user/terminal-to-user.component';
import { A2bSharedComponent } from './a2b-shared/a2b-shared.component';

import { CheckEntryViewComponent } from './RamaChandran sir/check-entry-view/check-entry-view.component';
import { ChequePaymentsComponent } from './RamaChandran sir/cheque-payments/cheque-payments.component';
import { TableTestComponent } from './table-test/table-test.component';
import { ItemSwapComponent } from './Karupasamy Sir/item-swap/item-swap.component';

import { SundryReceiptsComponent } from './Saranya Mam/SundryReceipts/SundryReceipts.component';
import { JournalVoucherComponent } from './Saranya Mam/journal-voucher/journal-voucher.component';
import { PettyCashComponent } from './Saranya Mam/petty-cash/petty-cash.component';
import { HighlightDirective } from './services/highlight.directive';
import { Highlight2Directive } from './services/highlight2.directive';
import { MasterLedgerComponent } from './master-ledger/master-ledger.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { DebitCreditNoteComponent } from './Saranya Mam/debit-credit-note/debit-credit-note.component';
import { UpdatedDCNoteComponent } from './Saranya Mam/updated-dcnote/updated-dcnote.component';
import { AMCMasterComponent } from './amcmaster/amcmaster.component';
import { NumberingTypeComponent } from './numbering-type/numbering-type.component';
import { OpeningBalanceComponent } from './opening-balance/opening-balance.component';
import { DebtorLedgerComponent } from './debtor-ledger/debtor-ledger.component';
import { IpConfigComponent } from './ip-config/ip-config.component';
import { FactoryProductionComponent } from './factory-production/factory-production.component';
import { TrackItemComponent } from './factory-production/track-item/track-item.component';
import { ProductionViewComponent } from './factory-production/production-view/production-view.component';
import { DcraiseComponent } from './factory-production/dcraise/dcraise.component';
import { ProductionBarcodeComponent } from './production-barcode/production-barcode.component';
import { StoreissueComponent } from './storeissue/storeissue.component';
import { TareWeightComponent } from './tare-weight/tare-weight.component';
import { IntentItemsComponent } from './intent-items/intent-items.component';
import { TrackarComponent } from './trackar/trackar.component';
import { BrticketReportsComponent } from './brticket-reports/brticket-reports.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { FilterTicketsComponent } from './filter-tickets/filter-tickets.component';
import { MyticketsComponent } from './mytickets/mytickets.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { NewTrackerComponent } from './new-tracker/new-tracker.component';
import { DcinoutmappingbranchComponent } from './dcinoutmappingbranch/dcinoutmappingbranch.component';
import { AccountPostingDialogComponent } from './commonComponents/accountPostingDialog/accountPostingDialog.component';
import { HeaderModule } from './commonComponents/header.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomerOnAccBalanceComponent,
    TerminalToUserComponent,
    A2bSharedComponent,
    CheckEntryViewComponent,
    ChequePaymentsComponent,
    TableTestComponent,
    ItemSwapComponent,
    AccountPostingDialogComponent,
    SundryReceiptsComponent,
    JournalVoucherComponent,
    PettyCashComponent,
    HighlightDirective,
    Highlight2Directive,
    MasterLedgerComponent,
    DynamicFormsComponent,
    FormGeneratorComponent,
    DebitCreditNoteComponent,
    UpdatedDCNoteComponent,
    AMCMasterComponent,
    NumberingTypeComponent,
    OpeningBalanceComponent,
    DebtorLedgerComponent,
    IpConfigComponent,
    FactoryProductionComponent,
    TrackItemComponent,
    ProductionViewComponent,
    DcraiseComponent,
    ProductionBarcodeComponent,
    StoreissueComponent,
    TareWeightComponent,
    IntentItemsComponent,
    TrackarComponent,
    CreateTicketComponent,
    MyticketsComponent,
    FilterTicketsComponent,
    BrticketReportsComponent,
    gCurrencyPipe,
    TicketDetailsComponent,
    NewTrackerComponent,
    DcinoutmappingbranchComponent,
  ],

  imports: [
    FormsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    MomentDateModule,
    NgPrintModule, CommonModule,
    BrowserModule, FormsModule,
    WebcamModule, ReactiveFormsModule,
    AppRoutingModule, HttpClientModule,
    BrowserAnimationsModule, NgxPrintModule,
    Ng2SearchPipeModule, NgMultiSelectDropDownModule,
    TreeModule,
    MatPaginatorModule,
    HeaderModule,
    NgxSkeletonLoaderModule,
    MatBottomSheetModule,
    ChartsModule,
    NgxSummernoteModule,PdfViewerModule,
    // ZXingScannerModule

  ],

  providers: [Globals, DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    // eslint-disable-next-line max-len
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MyDateFormat },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

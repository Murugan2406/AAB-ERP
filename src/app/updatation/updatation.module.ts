/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter, MatNativeDateModule, MatRippleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgPrintModule } from 'ng-print';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DepositentryComponent } from './depositentry/depositentry.component';
import { MyDateFormat } from '../globals';

import { UpdatationRoutingModule } from './updatation-routing.module';
import { CommonAuthourityComponent } from './common-authourity/common-authourity.component';
import { DcinComponent } from './dcin/dcin.component';
import { DcoutComponent } from './dcout/dcout.component';
import { GoodsIssuesComponent } from './goods-issues/goods-issues.component';
import { ItemsSelectComponent } from './items-select/items-select.component';
import { FaceapicrossverifyComponent } from './faceapicrossverify/faceapicrossverify.component';
import { UpdateOldComponent } from './update-old/update-old.component';
import { SelectItemsComponent } from './select-items/select-items.component';
import { DebtorLedgerComponent } from './debtor-ledger/debtor-ledger.component';
import { SectionCommonProductIssueComponent } from './section-common-product-issue/section-common-product-issue.component';
import { UpdatedGoodsIssueComponent } from './updated-goods-issue/updated-goods-issue.component';
import { RmsalesportionComponent } from './rmsalesportion/rmsalesportion.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { CustomerSalesReportComponent } from './customer-sales-report/customer-sales-report.component';
import { SetIssuesComponent } from './set-issues/set-issues.component';
import { EmployeeWeekoffComponent } from './employee-weekoff/employee-weekoff.component';
import { OrderInvoiceBillComponent } from './orderInvoice/orderInvoiceBill.component';
import { StockCorrectionComponent } from './stock-correction/stock-correction.component';
import { StockReportComponent } from '../stock-report/stock-report.component';
import { SetReturnRequestComponent } from '../set-return-request/set-return-request.component';
import { HeaderModule } from '../commonComponents/header.module';

@NgModule({
  declarations: [
    GoodsIssuesComponent,
    ItemsSelectComponent,
    DcoutComponent,
    DcinComponent,
    CommonAuthourityComponent,
    FaceapicrossverifyComponent,
    UpdateOldComponent,
    SelectItemsComponent,
    DebtorLedgerComponent,
    SectionCommonProductIssueComponent,
    UpdatedGoodsIssueComponent,
    SalesReportComponent,
    RmsalesportionComponent,
    CustomerSalesReportComponent,
    SetIssuesComponent,
    EmployeeWeekoffComponent,
    OrderInvoiceBillComponent,
    StockCorrectionComponent,
    DepositentryComponent,
    StockReportComponent,
    SetReturnRequestComponent,
  ],
  imports: [
    CommonModule,
    UpdatationRoutingModule,
    CommonModule, MatToolbarModule, MatCardModule,
    MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatIconModule, MatNativeDateModule, ReactiveFormsModule, MatTableModule, FormsModule,
    MatSnackBarModule, NgxSkeletonLoaderModule, MatToolbarModule, Ng2SearchPipeModule,
    MatDialogModule, MatTooltipModule, NgPrintModule, MatRadioModule, MatSelectModule,
    MatRippleModule, MatTabsModule, HeaderModule, MatProgressSpinnerModule, MatCheckboxModule,
    MatChipsModule, MatMenuModule, MatSortModule, MatExpansionModule, MatSlideToggleModule,

  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MyDateFormat },
  ],
})
export class UpdatationModule { }

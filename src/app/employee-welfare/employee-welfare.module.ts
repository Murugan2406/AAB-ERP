/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
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
import { MyDateFormat } from '../globals';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgPrintModule } from 'ng-print';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Form4EEComponent } from './form4-ee/form4-ee.component';
import { EmployeeWelfareRoutingModule } from './employee-welfare-routing.module';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { ESIFormsComponent } from './esiforms/esiforms.component';
import { PFExemptionComponent } from './pfexemption/pfexemption.component';
import { ESIComponent } from './esi/esi.component';
import { PFChallanComponent } from './pfchallan/pfchallan.component';
import { PGChallanDialogComponent } from './pgchallan-dialog/pgchallan-dialog.component';

@NgModule({
  declarations: [
    Form4EEComponent,
    AdvancePaymentComponent,
    ESIFormsComponent,
    PFExemptionComponent,
    ESIComponent,
    PFChallanComponent,
    PGChallanDialogComponent,
  ],
  imports: [
    CommonModule, EmployeeWelfareRoutingModule, MatToolbarModule, MatCardModule,
    MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatNativeDateModule,
    ReactiveFormsModule, MatTableModule, FormsModule, MatSnackBarModule, NgxSkeletonLoaderModule,
    MatToolbarModule, Ng2SearchPipeModule, MatDialogModule, MatTooltipModule,
    NgPrintModule, MatRadioModule, MatSelectModule, MatRippleModule, MatProgressSpinnerModule,
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
export class EmployeeWelfareModule { }

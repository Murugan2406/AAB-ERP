/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE,
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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MyDateFormat } from '../globals';
import { EditCardSettlementComponent } from './edit-card-settlement/edit-card-settlement.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { COABalanceComponent } from './coabalance/coabalance.component';
import { HeaderModule } from '../commonComponents/header.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    EditCardSettlementComponent,
    EditDialogComponent,
    COABalanceComponent,
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule, MatToolbarModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatNativeDateModule, MatAutocompleteModule,
    ReactiveFormsModule, MatTableModule, MatDialogModule, MatTooltipModule, FormsModule, MatSnackBarModule, NgxSkeletonLoaderModule,
    Ng2SearchPipeModule, MatCardModule, MatRadioModule,HeaderModule, MatProgressSpinnerModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MyDateFormat },
  ],
})
export class AccountsModule { }

/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatNativeDateModule, MatRippleModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatSortModule } from '@angular/material/sort';
import { HeaderComponent } from './header.component';
import { TableListComponent } from './table-list/table-list.component';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
import { FieldBuilderComponent } from './field-builder/field-builder.component';
import { TextBoxComponent } from './text-box/text-box.component';
import { DroupdownComponent } from './droupdown/droupdown.component';
import { FileComponent } from './file/file.component';
import { RadioComponent } from './radio/radio.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { MatSelectComponent } from './mat-select/mat-select.component';
import { AccountingInformationComponent } from './accounting-information/accounting-information.component';
import { AccInfoComponent } from './acc-info/acc-info.component';
import { GTableComponent } from './g-table/g-table.component';
import { OrderbyPipe } from '../services/orderby.pipe';
import { AutoSelectComponent } from './auto-select/auto-select.component';

@NgModule({
  declarations: [HeaderComponent, TableListComponent, DynamicFormBuilderComponent, OrderbyPipe,
    FieldBuilderComponent, TextBoxComponent, DroupdownComponent, FileComponent, RadioComponent, CheckboxComponent,
    DateComponent, AutoCompleteComponent, MatSelectComponent, AccountingInformationComponent, AccInfoComponent, GTableComponent,
    AutoSelectComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule, RouterModule, MatTableModule,
    MatProgressSpinnerModule,
    NgxSkeletonLoaderModule, MatMenuModule, MatRadioModule, MatInputModule,
    FormsModule, MatFormFieldModule, ReactiveFormsModule, MatCheckboxModule, MatNativeDateModule, MatRippleModule,
    MatDatepickerModule, MatAutocompleteModule, MatSelectModule, Ng2SearchPipeModule, MatSortModule, CommonModule,
  ],
  exports: [
    HeaderComponent, TableListComponent, DynamicFormBuilderComponent, FieldBuilderComponent, AccountingInformationComponent, AccInfoComponent,
    GTableComponent, OrderbyPipe,
  ],

})
export class HeaderModule {

}

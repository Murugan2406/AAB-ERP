/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { ESIComponent } from './esi/esi.component';
import { ESIFormsComponent } from './esiforms/esiforms.component';
import { Form4EEComponent } from './form4-ee/form4-ee.component';
import { PFChallanComponent } from './pfchallan/pfchallan.component';
import { PFExemptionComponent } from './pfexemption/pfexemption.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Form4EE',
    pathMatch: 'full',
  },
  {
    path: 'Form4EE',
    component: Form4EEComponent,
  },
  {
    path: 'Advance-Payment',
    component: AdvancePaymentComponent,
  },
  {
    path: 'EsiForms',
    component: ESIFormsComponent,
  },
  {
    path: 'PFExemption',
    component: PFExemptionComponent,
  },
  {
    path: 'ESI',
    component: ESIComponent,
  },
  {
    path: 'PF-Challan',
    component: PFChallanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// eslint-disable-next-line import/prefer-default-export
export class EmployeeWelfareRoutingModule { }

/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustOnACCBalanceComponent } from './cust-on-accbalance/cust-on-accbalance.component';
import { FinBookComponent } from './fin-book/fin-book.component';
import { VICGroupComponent } from './vicgroup/vicgroup.component';

const routes: Routes = [
  {
    path: 'fin-book',
    component: FinBookComponent,
  },
  {
    path: 'VIC-Group',
    component: VICGroupComponent,
  },
  {
    path: 'COA-Balance',
    component: CustOnACCBalanceComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinbookGroupRoutingModule { }

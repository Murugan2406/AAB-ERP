/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { COABalanceComponent } from './coabalance/coabalance.component';
import { EditCardSettlementComponent } from './edit-card-settlement/edit-card-settlement.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Edit-Card-Settlement',
    pathMatch: 'full',
  },
  {
    path: 'Edit-Card-Settlement',
    component: EditCardSettlementComponent,
  },
  {
    path: 'COA-Balance',
    component: COABalanceComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule { }

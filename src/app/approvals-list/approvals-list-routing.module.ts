/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { PhysicalstockapprovalComponent } from '../InventoryComponents/physicalstockapproval/physicalstockapproval.component';
// import { StockapprovalpendingComponent } from '../InventoryComponents/stockapprovalpending/stockapprovalpending.component';
import { AsmApprovalComponent } from './asm-approval/asm-approval.component';
import { StockApprovalAuthorityComponent } from './stock-approval-authority/stock-approval-authority.component';

const routes: Routes = [
  // { path: 'Stockapprovalpending', component: StockapprovalpendingComponent },
  // { path: 'Physicalstockapproval', component: PhysicalstockapprovalComponent },
  { path: 'RtlOrderApproval', component: AsmApprovalComponent },

  { path: 'PhyStkAppAuth', component: StockApprovalAuthorityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalsListRoutingModule { }

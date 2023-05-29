/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-update-old',
  templateUrl: './update-old.component.html',
  styleUrls: ['./update-old.component.css'],
})
export class UpdateOldComponent implements OnInit {
  constructor(
private global: Globals,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  gmainRouting(status) {
    this.global.gmainMenuSelected = status;
    // this.router.navigate(['/Updatation/goods-Issues']);
    this.router.navigate(['/Updatation/Updated-goods-Issues']);
  }

  gmainRouting1(status) {
    this.global.gmainMenuSelected = status;
    this.router.navigate(['/Updatation/Updated-goods-Issues']);
  }

  gmailLedgerRoute(status) {
    this.global.gmainMenuSelected = status;
    this.router.navigate(['/Updatation/ledger']);
  }

  dcINOUTRoute(status, route) {
    this.global.gmainMenuSelected = status;
    this.router.navigate([route]);
  }

  backClicked() {
    this.router.navigate(['/dashboard']);
  }
}

/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class ItemserviceService {
  get_URL: any

  getcancelbill:any

  getstockapprove:any

  get_URL_ITEM: any;

  get_sales_URL:any;

  get_salesrep_URL:any = '';

  get_expense_URL:any;

  get_expense_URL1:any;

  get_debtors_URL:any;

  getFuel_API:any

  getFuel_APIjson: any;

  get_terminal:any

  get_RFSF:any

  get_JSON_URL:any

  get_JSON:any

  get_stkdash_URL:any

  get_server:any

  get_ordersDebtor_URL:any

  get_fuel_consumption:any

  get_longleave:any

  getNewitm:any

  getautoindent:any

  apiUrl:any

  getRecipe:any

  get_Stkdiff_URL:any

  constructor(private http: HttpClient, private global: Globals) {
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': this.global.TmpCdeFedG,
  });

  options = { headers: this.headers };

  getItemMovement(post: any): Observable<any> {
    return this.http.post(this.get_URL, post, this.options)?.pipe();
  }

  getStockdiff(post: any): Observable<any> {
    return this.http.post(this.get_Stkdiff_URL, post, this.options)?.pipe();
  }

  getJsonPayloadRjs(post: any): Observable<any> {
    return this.http.post(this.getRecipe, post, this.options)?.pipe();
  }

  getlongleave(post: any): Observable<any> {
    return this.http.post(this.get_longleave, post, this.options)?.pipe();
  }

  getcancelledbill(post: any): Observable<any> {
    return this.http.post(this.getcancelbill, post, this.options)?.pipe();
  }

  getstkaproval(post: any): Observable<any> {
    return this.http.post(this.getstockapprove, post, this.options)?.pipe();
  }

  getNewitmRATE(post: any): Observable<any> {
    return this.http.post(this.getNewitm, post, this.options)?.pipe();
  }

  getFuelReport(post: any): Observable<any> {
    return this.http.post(this.get_fuel_consumption, post, this.options)?.pipe();
  }

  getItemMovementFinalView(post: any): Observable<any> {
    return this.http.post(this.get_URL_ITEM, post, this.options)?.pipe();
  }

  getSalesAPI(post: any): Observable<any> {
    return this.http.post(this.get_sales_URL, post, this.options)?.pipe();
  }

  getSalesReportAPI(post?: any): Observable<any> {
    return this.http?.post(this.get_salesrep_URL, post, this.options)?.pipe();
  }

  getExpenseAPI(post: any): Observable<any> {
    return this.http.post(this.get_expense_URL, post, this.options)?.pipe();
  }

  getAutoIndent(post: any): Observable<any> {
    return this.http.post(this.getautoindent, post, this.options)?.pipe();
  }

  getExpenseAPI1(post: any): Observable<any> {
    return this.http.post(this.get_expense_URL1, post, this.options)?.pipe();
  }

  getDebtorsAPI(post: any): Observable<any> {
    return this.http.post(this.get_debtors_URL, post, this.options)?.pipe();
  }

  getOrdersDebtorsAPI(post: any): Observable<any> {
    return this.http.post(this.get_ordersDebtor_URL, post, this.options)?.pipe();
  }

  getorderreversesAPI(post: any): Observable<any> {
    return this.http.post(this.get_server, post, this.options)?.pipe();
  }

  getFuelAPI(post: any): Observable<any> {
    return this.http.post(this.getFuel_API, post, this.options)?.pipe();
  }

  getFuelAPIjson(post: any): Observable<any> {
    return this.http.post(this.getFuel_APIjson, post, this.options)?.pipe();
  }

  getnewitemjson(post: any): Observable<any> {
    return this.http.post(this.get_JSON, post, this.options)?.pipe();
  }

  getterminal(post: any): Observable<any> {
    return this.http.post(this.get_terminal, post, this.options)?.pipe();
  }

  getrfsfAPI(post: any): Observable<any> {
    return this.http.post(this.get_RFSF, post, this.options)?.pipe();
  }

  getJSONAPI(post: any): Observable<any> {
    return this.http.post(this.get_JSON_URL, post, this.options)?.pipe();
  }

  getSTOCKDASH(post: any): Observable<any> {
    return this.http.post(this.get_stkdash_URL, post, this.options)?.pipe();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class EinvoiceService {

  constructor(private http:HttpClient, private globals:Globals) { }

  apiUrl = '';

  EinvoiceServerApicall(body): Promise<any> {
    this.apiUrl = this.globals.gServerApiUrl;
    return this.http.post(this.apiUrl + '/api/ewaybill', (body),
      {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      }).toPromise();
  }

  EinvoiceLocalApicall(body): Promise<any> {
    this.apiUrl = this.globals.gApiserver;
    return this.http.post(this.apiUrl + '/api/EinvoiceDetail', JSON.stringify(body),
      {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG
        }
      }).toPromise();
  }

  UpdateEinvoiceDetail(body): Promise<any> {
    this.apiUrl = this.globals.gApiserver;
    return this.http.post(this.apiUrl + '/api/UpdateEinvoiceDetail', JSON.stringify(body),
      {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG
        }
      }).toPromise();
  }



}

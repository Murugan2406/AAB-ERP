import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class SecgateserviceService {

  gclicntApi = ''; gServerApi =''; goption = '';

  constructor(private http:HttpClient, private globals:Globals) { }

   getGatereq(body:any): Observable<any> {
    return this.http.post(this.gclicntApi + '/api/datareqsarnThree', body,
      {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG

        }
      });
    }

    datareqsarnThree(body:any): Observable<any> {
      return this.http.post(this.gclicntApi + '/api/datareqsarnThree', body,
        {
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'x-api-key': this.globals.TmpCdeFedG

          }
        });
      }

    datareqsarnFour(body:any): Observable<any> {
      return this.http.post(this.gclicntApi + '/api/datareqsarnFour', body,
        {
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'x-api-key': this.globals.TmpCdeFedG

          }
        });
      }

    getGateServreq(body:any): Observable<any> {
      return this.http.post(this.gServerApi + '/api/datareqsarn', body,
        {
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'x-api-key': this.globals.TmpCdeFedG

          }
        });
      }

      JsonPayloadSaran1(body:any): any {
        return this.http.post(this.gclicntApi + '/api/JsonPayloadSaran1', JSON.stringify(body),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'x-api-key': this.globals.TmpCdeFedG
            }
          });
      }



     getGatePrintReq(body:any): Observable<any> {
        return this.http.post(this.gclicntApi + '/api/ipPrint', body,

          {
            headers: {
              'Content-Type' : 'application/x-www-form-urlencoded',
              // 'x-api-key': this.globals.TmpCdeFedG
            }
          });
        }



        changeDateFormat(startDate:any, format:any): any {
          const locale = 'en-US';
          return formatDate(startDate, format, locale);
        }
}

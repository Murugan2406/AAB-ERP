/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable comma-dangle */

/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-empty-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class FaceapiService {
  constructor(private httpClient: HttpClient, private glopals:Globals) { }

  endpoint = 'https://aabsweetscognitive.cognitiveservices.azure.com';

  id = '051dbdb700734094a8086add1e46831f'

  // endpoint = 'https://aabcognitive.cognitiveservices.azure.com';
  // id = '399c1c69a5fe4dcf8e81af8d6f0f331a'

  scanImage(base64Image: string) {
    const headers = this.getHeaders();
    const params = this.getParams();
    const blob = this.makeblob(base64Image);
    // console.log(blob)
    return this.httpClient.post(
      `${this.endpoint}/face/v1.0/detect`,
      blob,
      {
        params,
        headers
      }
    );
  }

  apiUrl = '';

  pwdVerify(body: { username: any; pwd: string; pwdNew: string; brcode: string; statusmsg: string; }): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/api/uidlogin`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.glopals.TmpCdeFedG
        }
      }
    );
  }

  getFaceVerify(data:any) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': this.id
        }
      )
    };
    return this.httpClient.post(`${this.endpoint}/face/v1.0/verify`, data, httpOptions);
  }

  private makeblob(dataURL: string) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  private getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/octet-stream');
    headers = headers.set('Ocp-Apim-Subscription-Key', '051dbdb700734094a8086add1e46831f');
    // headers = headers.set('Ocp-Apim-Subscription-Key', '399c1c69a5fe4dcf8e81af8d6f0f331a');

    return headers;
  }

  private getParams() {
    const httpParams = new HttpParams()
      .set('returnFaceId', 'true')
      .set('returnFaceLandmarks', 'false')
      .set(
        'returnFaceAttributes',
        'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
      );

    return httpParams;
  }

  getFacedetect(data:any) {
    console.log(data);
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/octet-stream',
          'Ocp-Apim-Subscription-Key': this.id
        }
      )
    };

    return this.httpClient.post('https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&recognitionModel=recognition_04&returnRecognitionModel=true&detectionModel=detection_03&faceIdTimeToLive=86400', data, httpOptions);
  }
}

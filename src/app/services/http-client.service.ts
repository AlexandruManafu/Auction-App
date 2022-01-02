import { HttpClient } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
providedIn:  'root'
})

export class HttpClientService {

//Avoid using localhost and 127.0.0.1, do not specify ports
private serverIP:string = "http://192.168.137.1";

constructor(private http: HttpClient) { }

  get(url:string, textResponse : boolean) {
    if(textResponse)
      return this.http.get(this.serverIP+url,{responseType: 'text'});
    else
      return this.http.get(this.serverIP+url,{responseType: 'json'});
  }

  getArray(url:string)
  {
      return this.http.get<Array<Object>>(this.serverIP+url,{responseType: 'json'});
  }

  post(data: any, url: string) {
    let json_data = JSON.stringify(data);
    //console.log(json_data);
    return this.http.post(this.serverIP+url, json_data, {observe: 'response', responseType: 'text'});
  }
}
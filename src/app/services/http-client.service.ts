import { HttpClient } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
providedIn:  'root'
})

export class HttpClientService {

constructor(private http: HttpClient) { }

getPosts(url:string) {
	return this.http.get(url);
}

post(data: any, url: string) {
  let json_data = JSON.stringify(data);
  console.log(json_data);
  return this.http.post(url, json_data, {observe: 'response', responseType: 'text'});
}
}
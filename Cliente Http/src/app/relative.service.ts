import { Relative } from './relative';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RelativeService {
  private relativesUrl = 'http://localhost:8080/api/relatives';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  getRelatives (): Observable<Relative[]> {
    return this.http.get<Relative[]>(this.relativesUrl)
  }

  getRelative(name: string, age:number): Observable<Relative> {
    const url = `${this.relativesUrl}/${name+age}`;
    return this.http.get<Relative>(url);
  }

  addRelative (relative: Relative): Observable<Relative> {
    return this.http.post<Relative>(this.relativesUrl, relative, httpOptions);
  }

  deleteRelative (relative: Relative | string ): Observable<Relative> {
    const name = typeof relative === 'string' ? relative : relative.name+relative.age;
    const url = `${this.relativesUrl}/${name}`;
    console.log(relative)

    return this.http.post<Relative>(url, relative, httpOptions);
  }

  updateRelative (customer: Array<Relative>): Observable<any> {
    return this.http.put(this.relativesUrl, customer, httpOptions);
  }
}

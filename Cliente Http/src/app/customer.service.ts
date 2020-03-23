import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersUrl = 'http://localhost:8080/api/customers';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  getCustomers (): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
  }

  getCustomer(cpf: string): Observable<Customer> {
    const url = `${this.customersUrl}/${cpf}`;
    return this.http.get<Customer>(url);
  }

  addCustomer (customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, customer, httpOptions);
  }

  deleteCustomer (customer: Customer | string ): Observable<Customer> {
    const cpf = typeof customer === 'string' ? customer : customer.cpf;
    const url = `${this.customersUrl}/${cpf}`;
    console.log(customer)

    return this.http.delete<Customer>(url, httpOptions);
  }

  updateCustomer (customer: Array<Customer>): Observable<any> {
    return this.http.put(this.customersUrl, customer, httpOptions);
  }
}
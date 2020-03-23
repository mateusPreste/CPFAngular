import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})

export class AddCustomerComponent{

  customer = new Customer();
  submitted = false;

  constructor(
    private customerService: CustomerService,
    private location: Location
  ) { }

  newCustomer(): void {
    this.submitted = false;
    this.customer = new Customer();
  }

 addCustomer() {
   this.submitted = true;
   this.save();
 }

  goBack(): void {
    this.location.back();
  }

  cpfValid() {
    const cpfc = this.customer.cpf
       if (cpfc) {
         const cpf = cpfc.split(".").join("").split("-").join("");
         let numbers, digits, sum, i, result, equalDigits;
         equalDigits = 1;
         if (cpf.length < 11) {
          return false;
         }

         for (i = 0; i < cpf.length - 1; i++) {
           if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
             equalDigits = 0;
             break;
           }
         }

         if (!equalDigits) {
           numbers = cpf.substring(0, 9);
           digits = cpf.substring(9);
           sum = 0;
           for (i = 10; i > 1; i--) {
             sum += numbers.charAt(10 - i) * i;
           }

           result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

           if (result !== Number(digits.charAt(0))) {
             return false;
           }
           numbers = cpf.substring(0, 10);
           sum = 0;

           for (i = 11; i > 1; i--) {
             sum += numbers.charAt(11 - i) * i;
           }
           result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

           if (result !== Number(digits.charAt(1))) {
             return false;
           }
           return true;
         } else {
           return false;
         }
        }
  }

  private save(): void {
    console.log(this.customer);
    this.customerService.addCustomer(this.customer)
        .subscribe();
  }
}

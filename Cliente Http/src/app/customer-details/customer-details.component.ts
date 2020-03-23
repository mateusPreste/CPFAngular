import { Customer } from './../customer';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer = new Customer();
  oldcustomer = new Customer();
  submitted = false;
  message: string;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomer(id)
      .subscribe(customer => {
        this.customer = customer; 
        this.oldcustomer = Object.assign({}, this.customer);
      } );
  }

  update(): void {
    this.customerService.updateCustomer([this.oldcustomer, this.customer])
      .subscribe(result => {
        this.message = "Usuário atualizado com sucesso!"
        console.log(result, result["mgs"])
        if(result["mgs"] == "Updated"){
          this.submitted = true;
        }
      } );
  }

  delete(): void {
    this.submitted = true;
    this.customerService.deleteCustomer(this.customer)
        .subscribe(result => this.message = "Usuário Removido com sucesso!");
  }

  goBack(): void {
    this.location.back();
  }
}
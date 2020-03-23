import { Customer } from './../customer';
import { RelativeService } from './../relative.service';
import { Relative } from './../relative';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-relative',
  templateUrl: './add-relative.component.html',
  styleUrls: ['./add-relative.component.css']
})
export class AddRelativeComponent {

  relative = new Relative();
  submitted = false;

  customers: Customer[] = [
    {cpf:"123.234.634-10", name: "fulano"}
  ];

  constructor(
    private relativeService: RelativeService,
    private location: Location) { }

    newCustomer(): void {
      this.submitted = false;
      this.relative = new Relative();
    }
  
   addCustomer() {
     this.submitted = true;
     this.save();
   }
  
    goBack(): void {
      this.location.back();
    }
  
  private save(): void {
    console.log(this.relative);
    this.relativeService.addRelative(this.relative)
        .subscribe();
  }

}

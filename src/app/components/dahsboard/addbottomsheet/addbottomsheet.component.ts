import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../services/api.service';
import { NgIf } from '@angular/common';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-addbottomsheet',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, NgIf],
  templateUrl: './addbottomsheet.component.html',
  styleUrl: './addbottomsheet.component.scss'
})
export class AddbottomsheetComponent implements OnInit {
  constructor(private bottomSheet: MatBottomSheet, private apiservice:ApiService, private sharedservice:SharedService) { }
  
  personName = new FormControl('');
  business_id: string = '';
  @Output() refreshQueulist = new EventEmitter<string>();

  ngOnInit(): void {
    this.business_id = localStorage.getItem('BI') || '';
  }

  addPerson(action:string){
    if(action === 'add' && this.personName.value === '') {
      this.personName.addValidators(Validators.required);
      this.personName.updateValueAndValidity();
      return
    }
    this.apiservice.addToQueue(this.business_id, action === 'add' ? this.personName.value || '' : '').subscribe({
      next: (res) => {
        if(res.status === 'PA'){
          this.bottomSheet.dismiss();
          this.sharedservice.callFunction();
          alert('Person added successfully');
        }
      },
      error: (err) => {
        alert('error adding person');
      } 
    })
  }

  closeSheet(): void {
    this.bottomSheet.dismiss();
  }
}

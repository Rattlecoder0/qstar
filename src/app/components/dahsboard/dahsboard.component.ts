import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddbottomsheetComponent } from "./addbottomsheet/addbottomsheet.component";
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';

interface list_Details {
  waiting_no: number,
  name: string,
  status: string
}

@Component({
  selector: 'app-dahsboard',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FormsModule, MatBottomSheetModule],
  templateUrl: './dahsboard.component.html',
  styleUrl: './dahsboard.component.scss'
})
export class DahsboardComponent implements OnInit {

  list_count: number = 0;
  list_details: list_Details[] = [
  ]
  business_id: string = '';

  constructor(private bottomSheet: MatBottomSheet, private apiservice: ApiService, private sharedservice:SharedService) {
    effect(() => {
      if (this.sharedservice.triggerFunction()) {
        this.getQueueList();
      }
    });
   }

  ngOnInit(): void {
    this.business_id = localStorage.getItem('BI') || '';

    this.getQueueList()
  }

  getQueueList() {
    this.apiservice.getQueue(this.business_id).subscribe({
      next: (response) => {
        // console.log(response);
        this.list_details = response;
        this.list_count = response.length;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openBottomSheet(): void {
    this.bottomSheet.open(AddbottomsheetComponent);
  }

  removePerson() {
    this.apiservice.removeFromQueue(this.business_id).subscribe({
      next: (res) => {
        if (res.status === 'R') {
          alert('Person removed from queue');
          this.getQueueList()

          const closebtn = document.getElementById('close');
          if (closebtn) {
            closebtn.click();
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  // counter(num: number) {
  //   if (this.list_count + num === 6) {  //can only add 5 at a time
  //     return
  //   }
  //   this.list_count += num
  // }
}

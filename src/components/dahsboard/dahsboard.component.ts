import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddbottomsheetComponent } from "./addbottomsheet/addbottomsheet.component";

interface list_Details {
  waiting_no: number,
  customer_name: string,
}

@Component({
  selector: 'app-dahsboard',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FormsModule, MatBottomSheetModule],
  templateUrl: './dahsboard.component.html',
  styleUrl: './dahsboard.component.scss'
})
export class DahsboardComponent {

  list_count: number = 0;
  list_details: list_Details[] = [
    { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
    { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
    { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
    { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
    // { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
    // { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
    // { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
    // { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
    // { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
    // { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
    // { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
    // { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
    // { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
    // { waiting_no: 1, customer_name: 'Ubaid Murudkar' },
  ]

  constructor(private bottomSheet: MatBottomSheet) { }

  // counter(num: number) {
  //   if (this.list_count + num === 6) {  //can only add 5 at a time
  //     return
  //   }
  //   this.list_count += num
  // }

  openBottomSheet(): void {
    this.bottomSheet.open(AddbottomsheetComponent);
  }

}

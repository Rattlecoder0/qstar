import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-addbottomsheet',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './addbottomsheet.component.html',
  styleUrl: './addbottomsheet.component.scss'
})
export class AddbottomsheetComponent {
  constructor(private bottomSheet: MatBottomSheet) { }

  closeSheet(): void {
    this.bottomSheet.dismiss();
  }
}

import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }

  loginForm = new FormGroup({
    ccode: new FormControl('+91', [
      Validators.required
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9]\d{9}$/) // Ensures number starts with 6-9 & is 10 digits
    ]),
    otp: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern(/^\d{4}$/) // Ensures only 4 digits
    ])
  });

  correctOTP: number = 0;
  isOtpSent: boolean = false;
  isProcessing: boolean = false;

  get mobile() {
    return this.loginForm.get('mobile');
  }

  get otp() {
    return this.loginForm.get('otp');
  }

  get ccode() {
    return this.loginForm.get('ccode');
  }

  ngOnInit(): void {
  }

  sendOtp() {
    if (this.mobile?.valid) {

      this.apiService.sendOtp(this.mobile?.value || '').subscribe({
        next: (res) => {
          if (res.status === 'S') {
            this.isOtpSent = true;

            this.mobile?.disable()
            this.ccode?.disable()

            const get_mobnobox = document.getElementById('mobile_no_div')
            if (get_mobnobox) {
              get_mobnobox.style.marginBottom = '15px';
            }
          }
        },
        error: (error) => {
          console.error('Error sending OTP:', error);
        }
      })
    }
  }

  onSubmit() {
    if (this.otp?.valid) {
      this.apiService.verifyOtp(this.mobile?.value || '', this.otp?.value || '').subscribe({
        next: (res) => {
          if (res.status === 'V') {
            this.otp?.setErrors(null);
            this.router.navigate(['/dashboard']);
            localStorage.setItem('BI', res.business_id);
          }
          else if (res.status === 'NR') {
            alert('User not registered');
          }
          else {
            alert('Invalid or Expired OTP');
          }
        },
        error: (error) => {
          console.error('Error verifying OTP:', error);
        }
      })
    }
  }

  resendOtp() {
    if (this.isOtpSent) {
      this.apiService.sendOtp(this.mobile?.value || '').subscribe({
        next: (res) => {
          if (res.status === 'S') {
            this.isProcessing = true;
          }
        },
        error: (error) => {
          console.error('Error resending OTP:', error);
        }
      })

      setTimeout(() => {
        this.isProcessing = false;
      }, 60000);
    }
  }

  editNumber() {
    this.isOtpSent = false;
    this.mobile?.enable();
    this.ccode?.enable();
    this.loginForm.reset();
    this.ccode?.setValue('+91');
    this.otp?.disable();

    const get_mobnobox = document.getElementById('mobile_no_div')
    if (get_mobnobox) {
      get_mobnobox.style.marginBottom = '5px';
    }
  }


}


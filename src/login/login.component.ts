import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  loginForm = new FormGroup({
    ccode: new FormControl('+91',[
      Validators.required
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9]\d{9}$/) // Ensures number starts with 6-9 & is 10 digits
    ]),
    otp: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern(/^\d{4}$/) // Ensures only 4 digits
    ])
  });

  correctOTP: number = 1234;
  isOtpSent : boolean = false;
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
      this.isOtpSent = true;

      const get_mobnobox = document.getElementById('mobile_no_div')
      if(get_mobnobox){
        get_mobnobox.style.marginBottom = '15px';
      }

      this.mobile?.disable()
      this.ccode?.disable()
      this.otp?.enable(); // Enable OTP input
    }
  }

  resendOtp() {
    if (this.isOtpSent) {
      console.log('Resending OTP to:', this.mobile?.value);
      this.isProcessing = true;

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
      if(get_mobnobox){
        get_mobnobox.style.marginBottom = '5px';
      }
  }

  onSubmit() {
    console.log(this.otp?.value);
    
    if (Number(this.otp?.value) !== this.correctOTP) {
      this.otp?.setErrors({ invalidOtp: true });
      this.otp?.markAsTouched();
    } else {
      this.otp?.setErrors(null);
  
      console.log('Login successful:', this.loginForm.value);
      this.router.navigate(['/dashboard']);
    }
  }
}


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-request-page',
  templateUrl: './service-request-page.component.html',
  styleUrl: './service-request-page.component.css'
})
export class ServiceRequestPageComponent {

  services: string[] = [
    'Surface Grinding',
    'Centerless Grinding',
    'Punch & Die Manufacturing',
  ];

  selectedService: string = 'Surface Grinding'; // Default value for selected service
  
  requestForm: FormGroup;
  emailTitle = '';

  constructor(private fb: FormBuilder) {
    this.requestForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      message: ['', Validators.required],
      designFile: [null, Validators.required]
    });
  }

  get titleHeader() {
    return this.selectedService + ' Service Request';
  }

  selectService(service: string) {
    this.selectedService = service;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.requestForm.patchValue({ designFile: file });
    }
  }

  onSubmit() {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    const formData = this.requestForm.value;

    const emailBody = `
      Service: ${this.selectedService}
      Full Name: ${formData.fullName}
      Email: ${formData.email}
      Phone Number: ${formData.phoneNumber}
      Message: ${formData.message}
    `;

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=example@gmail.com&su=${encodeURIComponent(this.selectedService + ' - Service Request')}&body=${encodeURIComponent(emailBody)}`;
window.open(gmailLink, '_blank');
  }

}

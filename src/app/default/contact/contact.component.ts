import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  @ViewChild('contactForm', { static: true }) contactForm: NgForm;
  showloader: boolean = false;
  formData = {
    name: '',
    email: '',
    mobile: '',
    message: '',
  };
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.scrollToTop();
  }

  submitForm() {
    const formPayload = {
      access_key: 'f436eb69-20c1-42c0-b75b-a29ed68ba07c',
      name: this.formData.name,
      email: this.formData.email,
      message: this.formData.message,
    };

    this.showloader = true;
    this.http.post('https://api.web3forms.com/submit', formPayload).subscribe(
      (response: any) => {
        if (response.success) {
          window.alert('Message sent successfully');
          this.showloader = false;
          this.contactForm.resetForm();
        }
      },
      (error) => {
        console.error('Error submitting form:', error);
        this.showloader = false;
        window.console.error('ERROR In Sending message:');
      }
    );
  }
  scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}

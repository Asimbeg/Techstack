import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   signupForm: FormGroup;
   selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dob: ['', [Validators.required]]
    });
   }
  ngOnInit(): void {
  }

   onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
    } else {
      alert('Only image files are allowed');
    }
   }

   onSubmit() {
    const dob = new Date(this.signupForm.value.dob);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age > 18) {
       alert('You must be at least 18 years old');
       return;
    }
   
    if(this.signupForm.valid && this.selectedFile) {
      const formData = new FormData();
      Object.entries(this.signupForm.value).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append('profileImage', this.selectedFile);

    }
    }
  }

  

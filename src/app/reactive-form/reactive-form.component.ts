import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent implements OnInit {
  reactiveForm: FormGroup | undefined;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      name: ['', Validators.required],
      emails: this.formBuilder.array([
        this.formBuilder.control(undefined, [
          Validators.required,
          this.emailValidator,
        ]),
      ]),
      phones: this.formBuilder.array([
        this.formBuilder.control(undefined, [
          Validators.required,
          this.phoneValidator,
        ]),
      ]),
      message: ['', Validators.required],
    });
  }
  get emails() {
    return this.reactiveForm?.get('emails') as FormArray;
  }
  addEmail() {
    this.emails.push(
      this.formBuilder.control('', [Validators.required, this.emailValidator])
    );
  }
  getEmailValidity(i: number) {
    const control = this.reactiveForm?.get(`emails.${i}`);
    if (control !== null && !control?.touched) {
      return null;
    }
    if (control?.errors?.['required']) {
      return 'Email is required';
    }
    if (control?.errors?.['invalidEmail']) {
      return 'Email is invalid';
    }
    return null;
  }
  emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (re.test(value)) {
      return null;
    } else {
      return { invalidEmail: true };
    }
  }
  get phones() {
    return this.reactiveForm?.get('phones') as FormArray;
  }
  addPhone() {
    this.phones.push(
      this.formBuilder.control('', [Validators.required, this.phoneValidator])
    );
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const re = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (re.test(value)) {
      return null;
    } else {
      return { invalidPhone: true };
    }
  }
  getPhoneValidity(i: number) {
    const control = this.reactiveForm?.get(`phones.${i}`);
    if (control !== null && !control?.touched) {
      return null;
    }
    if (control?.errors?.['required']) {
      return 'Phone number is required';
    }
    if (control?.errors?.['invalidPhone']) {
      return 'Phone number is invalid, please enter a valid 10-digit phone number';
    }
    return null;
  }

  onSubmit() {
    if (this.reactiveForm?.valid) {
      console.log(this.reactiveForm.value);
    } else {
      if (this.reactiveForm?.controls) {
        Object.values(this.reactiveForm.controls).forEach((control) => {
          control.markAsTouched();
        });
      }
      this.emails.controls.forEach((control) => {
        control.markAsTouched();
      });
      this.phones.controls.forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}

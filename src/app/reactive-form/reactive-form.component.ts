import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
export class ReactiveFormComponent {
  reactiveForm = this.formBuilder.group({
    name: ['', Validators.required],
    emails: this.formBuilder.array([
      this.formBuilder.control(undefined, [
        Validators.required,
        Validators.email,
      ]),
    ]),
    phones: this.formBuilder.array([
      this.formBuilder.control(undefined, [
        Validators.required,
        Validators.pattern(
          '^((\\+)?(\\d{1,2})?[-.\\s]?)?(\\d{3})?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$'
        ),
      ]),
    ]),
    message: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder) {}
  get emails() {
    return this.reactiveForm.get('emails') as FormArray;
  }
  addEmail() {
    this.emails.push(
      this.formBuilder.control('', [Validators.required, Validators.email])
    );
  }
  getEmailValidity(i: number) {
    const control = this.reactiveForm.get(`emails.${i}`);
    return control?.errors && control?.touched;
  }
  get phones() {
    return this.reactiveForm.get('phones') as FormArray;
  }
  addPhone() {
    this.phones.push(
      this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(
          '^((\\+)?(\\d{1,2})?[-.\\s]?)?(\\d{3})?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$'
        ),
      ])
    );
  }
  getPhoneValidity(i: number) {
    const control = this.reactiveForm.get(`phones.${i}`);
    return control?.errors && control?.touched;
  }
  onSubmit() {
    console.log(this.reactiveForm);
    if (this.reactiveForm.valid) {
      console.log(this.reactiveForm.value);
    } else {
      Object.values(this.reactiveForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.emails.controls.forEach((control) => {
        control.markAsTouched();
      });
      this.phones.controls.forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}

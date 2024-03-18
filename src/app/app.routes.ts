import { Routes } from '@angular/router';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

export const routes: Routes = [
  { path: 'app-template-driven-form', component: TemplateDrivenFormComponent },
  { path: 'app-reactive-form', component: ReactiveFormComponent },
];

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SortablejsModule } from '../../../node_modules/angular-sortablejs/dist';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillEditorModule } from 'ng2-quill-editor';
import { SweetAlert2Module } from '@toverux/ngsweetalert2';

import { stepsRoutes } from './steps.routing';
import { StepsComponent } from './steps.component';
import { StepsAddComponent } from './steps-add.component';
import { StepsService } from '../services/steps.service';

@NgModule({
  providers: [
    StepsService
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(stepsRoutes),
    SortablejsModule,
    ReactiveFormsModule,
    QuillEditorModule,
    SweetAlert2Module.forRoot({
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-lg btn-primary',
        cancelButtonClass: 'btn btn-lg'
    })
  ],
  declarations: [StepsComponent, StepsAddComponent]
})
export class StepsModule { }

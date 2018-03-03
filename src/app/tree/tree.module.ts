import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SortablejsModule } from '../../../node_modules/angular-sortablejs/dist';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuillEditorModule } from 'ng2-quill-editor';
import { SweetAlert2Module } from '@toverux/ngsweetalert2';

import { StepDetailsService } from '../services/stepDetails.service';
import { TreeComponent } from './tree.component';
import { TreeAddComponent } from './tree-add.component';
import { treeRoutes } from './tree.routing';

@NgModule({
  providers: [
    StepDetailsService
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(treeRoutes),
    SortablejsModule,
    ReactiveFormsModule,
    QuillEditorModule,
    SweetAlert2Module.forRoot({
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-lg btn-primary',
        cancelButtonClass: 'btn btn-lg'
    }),
    FormsModule
  ],
  declarations: [TreeComponent, TreeAddComponent]
})
export class TreeModule { }

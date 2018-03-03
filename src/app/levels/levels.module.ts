import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SortablejsModule } from '../../../node_modules/angular-sortablejs/dist';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuillEditorModule } from 'ng2-quill-editor';
import { SweetAlert2Module } from '@toverux/ngsweetalert2';

import { LevelsComponent } from './levels.component';
import { levelsRoutes } from './levels.routing';
import { LevelsAddComponent } from './levels-add.component';
import { LevelsService } from '../services/levels.service';

@NgModule({
  providers: [
    LevelsService
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(levelsRoutes),
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
  declarations: [LevelsComponent, LevelsAddComponent]
})
export class LevelsModule { }

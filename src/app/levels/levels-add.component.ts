import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { LevelsService } from '../services/levels.service';

declare var jQuery: any;
declare var tinymce: any;

@Component({
  templateUrl: './levels-add.component.html'
})
export class LevelsAddComponent implements OnInit {

  createLevelForm: FormGroup;
  editMode = false;
  id: number;
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();
  level: any;

  public editorOptions = {
    placeholder: "insert content..."
  };

  constructor(private route: ActivatedRoute, private levelsService: LevelsService, private router: Router) { }

  ngOnInit() {
    jQuery.sidebarMenu(jQuery('.sidebar-menu'));

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();          
        }
      );

  }

  createLevel() {
    if (this.editMode) {
      console.log('edit');
      return this.levelsService.updateLevel(this.createLevelForm.value).subscribe((res) => {
        this.router.navigateByUrl('/admin/levels');
      });
    } else {
      console.log('add');
      return this.levelsService.createLevel(this.createLevelForm.value).subscribe((res) => {
        this.router.navigateByUrl('/admin/levels');
      });
    }
  }

  private initForm() {
    let title = '';
    let description = '';
    let data = '';
    let videoId = '';

    if (this.editMode) {
      this.levelsService.getLevel(this.id).subscribe((level) => {
        title = level.title;
        description = level.description;
        data = level.data;
        videoId = level.video_id;
        let id = level.id;
        this.createLevelForm = new FormGroup({
          'title':        new FormControl(title, Validators.required),
          'description':  new FormControl(description, Validators.required),
          'data':         new FormControl(data, Validators.required),
          'video_id':     new FormControl(videoId, Validators.required),
          'id':           new FormControl(id, Validators.required),
        });

        console.log(this.createLevelForm);
      });      
    }

    this.createLevelForm = new FormGroup({
      'title':        new FormControl(title, Validators.required),
      'description':  new FormControl(description, Validators.required),
      'data':         new FormControl(data, Validators.required),
      'video_id':     new FormControl(videoId, Validators.required)
    });
  }

}
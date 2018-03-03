import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { StepsService } from '../services/steps.service';

declare var jQuery: any;

@Component({
  templateUrl: './steps-add.component.html'
})
export class StepsAddComponent implements OnInit {

  createStepForm: FormGroup;
  editMode = false;
  id: number;
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private stepsService: StepsService, private router: Router) { }

  public editorOptions = {
    placeholder: "insert content..."
  };

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

  createStep() {
    if (this.editMode) {
      console.log('edit');
      return this.stepsService.updateStep(this.createStepForm.value).subscribe((res) => {
        this.router.navigateByUrl('/admin/steps');
      });
    } else {
      console.log('add');
      return this.stepsService.createStep(this.createStepForm.value).subscribe((res) => {
        this.router.navigateByUrl('/admin/steps');
      });
    }
  }

  private initForm() {
    let title = '';
    let description = '';
    let data = '';
    let videoId = '';
    let levelId = '';
    let eventJson = '';

    if (this.editMode) {
      this.stepsService.getStep(this.id).subscribe((step) => {
        title = step.title;
        description = step.description;
        data = step.data;
        videoId = step.video_id;
        levelId = step.level_id;
        eventJson = step.event_json;
        let id = step.id;
        this.createStepForm = new FormGroup({
          'title':        new FormControl(title, Validators.required),
          'description':  new FormControl(description, Validators.required),
          'data':         new FormControl(data, Validators.required),
          'video_id':     new FormControl(videoId, Validators.required),
          'level_id':     new FormControl(levelId, Validators.required),
          'event_json':   new FormControl(eventJson, Validators.required),
          'id':           new FormControl(id, Validators.required),
        });

        console.log(this.createStepForm);
      });      
    }

    this.createStepForm = new FormGroup({
      'title':        new FormControl(title, Validators.required),
      'description':  new FormControl(description, Validators.required),
      'data':         new FormControl(data, Validators.required),
      'video_id':     new FormControl(videoId, Validators.required),
      'level_id':     new FormControl(levelId, Validators.required),
      'event_json':   new FormControl(eventJson, Validators.required)
    });
  }

}

import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { StepDetailsService } from '../services/stepDetails.service';

declare var jQuery: any;

@Component({
  templateUrl: './tree-add.component.html'
})
export class TreeAddComponent implements OnInit {

  constructor(private route: ActivatedRoute, private stepDetailsService: StepDetailsService, private router: Router) { }

  createStepDetailForm: FormGroup;
  editMode = false;
  id: number;
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  public editorOptions = {
    placeholder: "insert content..."
  };

  public index=1;
   
  ngOnInit() {
    jQuery(function () {
        // Replace the <textarea id="editor1"> with a CKEditor
        // instance, using default configuration.
        jQuery.sidebarMenu(jQuery('.sidebar-menu'));
        // CKEDITOR.replace('editor1');
        jQuery("#seed_range").ionRangeSlider();
    });

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();          
        }
      );
  }

  createStepDetail() {
    console.log(this.createStepDetailForm);
    if (this.editMode) {
      console.log('edit');
      return this.stepDetailsService.updateStepDetail(this.createStepDetailForm.value).subscribe((res) => {
        this.router.navigateByUrl('/admin/steps');
      });
    } else {
      console.log('add');
      return this.stepDetailsService.createStepDetail(this.createStepDetailForm.value).subscribe((res) => {
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
    let type = '';
    let stepId = '';
    let choices = new FormArray([]);

    if (this.editMode) {
      this.stepDetailsService.getStepDetail(this.id).subscribe((stepDetail) => {
        title = stepDetail.title;
        description = stepDetail.description;
        data = stepDetail.data;
        videoId = stepDetail.video_id;
        levelId = stepDetail.level_id;
        type = stepDetail.type;
        eventJson = stepDetail.event_json;
        stepId = stepDetail.step_id;
        let id = stepDetail.id;
        if (stepDetail.Choices) {
          for (let choice of stepDetail.Choices) {
            choices.push(
              new FormGroup({
                'title': new FormControl(choice.title, Validators.required),
                'description': new FormControl(choice.description, Validators.required),
                'data': new FormControl(choice.data, Validators.required),
                'type': new FormControl(choice.type, Validators.required)
              })
            );
          }
        }

        this.createStepDetailForm = new FormGroup({
          'title':        new FormControl(title, Validators.required),
          'description':  new FormControl(description, Validators.required),
          'type':         new FormControl(type, Validators.required),
          'data':         new FormControl(data, Validators.required),
          'video_id':     new FormControl(videoId, Validators.required),
          'level_id':     new FormControl(levelId, Validators.required),
          'event_json':   new FormControl(eventJson, Validators.required),
          'step_id':   new FormControl(stepId, Validators.required),
          'id':           new FormControl(id, Validators.required),
        });

        console.log(this.createStepDetailForm);
      });      
    }

    this.createStepDetailForm = new FormGroup({
      'title':        new FormControl(title, Validators.required),
      'description':  new FormControl(description, Validators.required),
      'type':         new FormControl(type, Validators.required),
      'data':         new FormControl(data, Validators.required),
      'video_id':     new FormControl(videoId, Validators.required),
      'level_id':     new FormControl(levelId, Validators.required),
      'event_json':   new FormControl(eventJson, Validators.required),
      'choices':      choices
    });
  }

  onAddChoice() {
    (<FormArray>this.createStepDetailForm.get('choices')).push(
      new FormGroup({
        'title': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
        'data': new FormControl(null, Validators.required),
        'type': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteChoice(index: number) {
    (<FormArray>this.createStepDetailForm.get('choices')).removeAt(index);
  }

/// 
  public item={
      title:'',
      description:'',
      type:''
  }
  public editFlag:Boolean;
  public list=[];
  
  public addNewType(){
    this.list.push(this.item)
    this.item={
        title:'',
        description:'',
        type:''
    }
  }

  public removeType(i){
    this.list.splice(i, 1);
  }

  public editType(i){
    this.item=this.list[i];
    this.editFlag=true;
  }
  public updateType(){
    this.editFlag=undefined;
    this.item={
        title:'',
        description:'',
        type:''
    }
  }

}

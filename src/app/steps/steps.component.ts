import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SweetAlertType, SweetAlertOptions } from 'sweetalert2';
import { SimpleSweetAlertOptions } from '@toverux/ngsweetalert2';

import { StepsService } from '../services/steps.service';
import { SortablejsOptions } from '../../../node_modules/angular-sortablejs/dist';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  templateUrl: './steps.component.html'
})
export class StepsComponent implements OnInit {

  @Output() public confirm: EventEmitter<any>;
  @Output() public cancel: EventEmitter<any>;

  steps: any;

  sortableOptions: SortablejsOptions = {
     group: 'test'
   };

  order: any[] = [];

  constructor(private stepsService: StepsService, private router: Router) { 
    this.getList();
    this.sortableOptions = {
      onUpdate: (event: any) => {
        // console.log('abcdef');
        for(var i = 0; i < this.steps.length; i++){
          this.order[i] = this.steps[i].id;
        }
        var data = {order: this.order};
        stepsService.order(data).subscribe((res) => {
          this.router.navigateByUrl('/admin/steps');
        });
      }
    };
  }

  ngOnInit() {
    jQuery.sidebarMenu(jQuery('.sidebar-menu'));
  }

  getList(){
    return this.stepsService.getAll().subscribe((steps) => this.steps = steps);
  }

  showAlert(id){
    console.log(id);
    return this.stepsService.deleteStep(id).subscribe((steps) => {
      this.steps = steps;
    });
  }

}

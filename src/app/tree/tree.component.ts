import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SweetAlertType, SweetAlertOptions } from 'sweetalert2';
import { SimpleSweetAlertOptions } from '@toverux/ngsweetalert2';

import { StepDetailsService } from '../services/stepDetails.service';
import { SortablejsOptions } from '../../../node_modules/angular-sortablejs/dist';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  templateUrl: './tree.component.html'
})
export class TreeComponent implements OnInit {

  @Output() public confirm: EventEmitter<any>;
  @Output() public cancel: EventEmitter<any>;

  stepDetails: any;

  sortableOptions: SortablejsOptions = {
     group: 'test'
   };

  order: any[] = [];

  constructor(private stepDetailsService: StepDetailsService, private router: Router) { 
    this.getList();
    this.sortableOptions = {
      onUpdate: (event: any) => {
        // console.log('abcdef');
        for(var i = 0; i < this.stepDetails.length; i++){
          this.order[i] = this.stepDetails[i].id;
        }
        var data = {order: this.order};
        stepDetailsService.order(data).subscribe((res) => {
          this.router.navigateByUrl('/admin/tree');
        });
      }
    };
  }

  ngOnInit() {
    jQuery.sidebarMenu(jQuery('.sidebar-menu'));
  }

  getList(){
    return this.stepDetailsService.getAll().subscribe((stepDetails) => this.stepDetails = stepDetails);
  }

  showAlert(id){
    console.log(id);
    return this.stepDetailsService.deleteStepDetail(id).subscribe((stepDetails) => {
      this.stepDetails = stepDetails;
    });
  }

}

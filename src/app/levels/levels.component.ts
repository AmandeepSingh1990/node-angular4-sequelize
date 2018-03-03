import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SweetAlertType, SweetAlertOptions } from 'sweetalert2';
import { SimpleSweetAlertOptions } from '@toverux/ngsweetalert2';

import { LevelsService } from '../services/levels.service';
import { SortablejsOptions } from '../../../node_modules/angular-sortablejs/dist';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  templateUrl: './levels.component.html'
})
export class LevelsComponent implements OnInit {

  // @Input() public set swal(options: SweetAlertOptions|SimpleSweetAlertOptions);
 
  @Output() public confirm: EventEmitter<any>;
  @Output() public cancel: EventEmitter<any>;

  levels: any;

  sortableOptions: SortablejsOptions = {
     group: 'test'
   };

   order: any[] = [];

  constructor(private levelsService: LevelsService, private router: Router) { 
    this.getList();
    this.sortableOptions = {
      onUpdate: (event: any) => {
        // console.log('abcdef');
        for(var i = 0; i < this.levels.length; i++){
          this.order[i] = this.levels[i].id;
        }
        var data = {order: this.order};
        levelsService.order(data).subscribe((res) => {
          this.router.navigateByUrl('/admin/levels');
        });
      }
    };
  }

  ngOnInit() {
    jQuery.sidebarMenu(jQuery('.sidebar-menu'));
    
  }

  getList(){
    return this.levelsService.getAll().subscribe((levels) => this.levels = levels);
  }

  showAlert(id){
    console.log(id);
    return this.levelsService.deleteLevel(id).subscribe((levels) => {
      this.levels = levels;
      // this.router.navigateByUrl('/admin/levels');
    });
  }
}

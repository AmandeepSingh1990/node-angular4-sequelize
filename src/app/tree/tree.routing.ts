import { Routes } from '@angular/router';

import { TreeComponent } from './tree.component';

import { TreeAddComponent } from './tree-add.component';

export const treeRoutes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: 'tree',
                children: [
                    {
                        path: '',
                        component: TreeComponent
                    },
                    {
                        path: 'create',
                        component: TreeAddComponent
                    },
                    {
                        path: 'edit/:id',
                        component: TreeAddComponent
                    }
                ]
            }
        ]
    }
];
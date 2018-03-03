import { Routes } from '@angular/router';

import { LevelsComponent } from './levels.component';

import { LevelsAddComponent } from './levels-add.component';

export const levelsRoutes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: 'levels',
                children: [
                    {
                        path: '',
                        component: LevelsComponent
                    },
                    {
                        path: 'create',
                        component: LevelsAddComponent
                    },
                    {
                        path: 'edit/:id',
                        component: LevelsAddComponent
                    }
                ]
            }
        ]
    }
];
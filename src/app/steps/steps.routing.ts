import { Routes } from '@angular/router';

import { StepsComponent } from './steps.component';
import { StepsAddComponent } from './steps-add.component';

export const stepsRoutes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: 'steps',
                children: [
                    {
                        path: '',
                        component: StepsComponent
                    },
                    {
                        path: 'create',
                        component: StepsAddComponent
                    },
                    {
                        path: 'edit/:id',
                        component: StepsAddComponent
                    }
                ]
            }
        ]
    }
];
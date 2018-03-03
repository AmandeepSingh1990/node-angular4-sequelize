import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

export const dashboardRoutes: Routes = [
    {
        path: 'admin',
        component: DashboardComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    }
];
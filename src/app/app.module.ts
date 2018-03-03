import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LevelsModule } from './levels/levels.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { StepsModule } from './steps/steps.module';
import { TreeModule } from './tree/tree.module';

const appRoutes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    DashboardModule,
    LevelsModule,
    StepsModule,
    TreeModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

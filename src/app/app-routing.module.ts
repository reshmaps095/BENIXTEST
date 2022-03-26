import { BankDetailsComponent } from './feature/bank-details/bank-details.component';
import { BankListComponent } from './feature/bank-list/bank-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path: '', redirectTo: 'bank-list', pathMatch: 'full' },
  {
    path: 'bank-list',
    component: BankListComponent,

  },
  {
    path: 'bank-detail/:ifsc',
    component: BankDetailsComponent,

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



 }

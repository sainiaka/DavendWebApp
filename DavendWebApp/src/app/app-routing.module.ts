import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageInventoryComponent } from './pages/manage-inventory/manage-inventory.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'manage-inventory', component: ManageInventoryComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

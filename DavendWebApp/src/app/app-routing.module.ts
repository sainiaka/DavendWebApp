import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageInventoryComponent } from './pages/manage-inventory/manage-inventory.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'manage-inventory', component: ManageInventoryComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AdminLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageInventoryComponent } from './pages/manage-inventory/manage-inventory.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: "about", component: AboutPageComponent},
  { path: "products", component: ProductsPageComponent},
  { path: "services", component: ServicesPageComponent},
  { path: "contact", component: ContactPageComponent},
  { path: 'manage-inventory', component: ManageInventoryComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AdminLoginComponent },
  { path: 'register', component: AdminLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

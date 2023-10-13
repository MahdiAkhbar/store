import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProductFormComponent } from './components/add-product-form/add-product-form.component'
import { ProductsComponent } from './components/products/products.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { LoginComponent } from './components/login/login.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProfileComponent } from './components/profile/profile.component';
import { adminAuthGuard } from './shared/admin-auth.guard';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'form', component: AddProductFormComponent, canActivate: [adminAuthGuard] },
  { path: '', component: ProductsComponent },
  { path: 'whishlist', component: WhishlistComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

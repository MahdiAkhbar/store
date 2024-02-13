import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProductFormComponent } from './components/add-product-form/add-product-form.component'
import { ProductsComponent } from './components/products/products.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { LoginComponent } from './components/login/login.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProfileComponent } from './components/profile/profile.component';
import { adminGuard } from './shared/guards/admin.guard';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './shared/guards/auth.guard';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ChangeinfoComponent } from './components/changeinfo/changeinfo.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'whishlist', component: WhishlistComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'addproduct', component: AddProductFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'edituser', component: EditUserComponent, canActivate: [authGuard, adminGuard] },
  { path: 'changeinfo', component: ChangeinfoComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

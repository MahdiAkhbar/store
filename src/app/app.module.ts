import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { AddProductFormComponent } from './components/add-product-form/add-product-form.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { LoginComponent } from './components/login/login.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { BasketComponent } from './components/basket/basket.component';
import { SortPipe } from './shared/pipes/sort.pipe';
import { AlphabeticallyPipe } from './shared/pipes/alphabetically.pipe';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { SearchPipe } from './shared/pipes/search.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ChangeinfoComponent } from './components/changeinfo/changeinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductsHeaderComponent,
    AddProductFormComponent,
    ProductItemComponent,
    LoginComponent,
    WhishlistComponent,
    BasketComponent,
    SortPipe,
    AlphabeticallyPipe,
    DropdownDirective,
    SearchPipe,
    ProfileComponent,
    SignupComponent,
    EditUserComponent,
    ChangeinfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'API_URL', useValue: 'https://store-shop-2bb1e-default-rtdb.firebaseio.com' },
    { provide: 'LOCAL_URL', useValue: 'http://localhost:3000' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { SortPipe } from './shared/sort.pipe';
import { AlphabeticallyPipe } from './shared/alphabetically.pipe';
import { DropdownDirective } from './shared/dropdown.directive';
import { SearchPipe } from './shared/search.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';

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
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

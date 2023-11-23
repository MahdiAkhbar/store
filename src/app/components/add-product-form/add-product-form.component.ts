import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent {
  constructor(
    private r2: Renderer2,
    private productService: ProductService
  ) {}

  productInfo!: Product;
  @ViewChild('success', { static: true }) success!: ElementRef<HTMLDivElement>;
  
  onSend(form: NgForm) {
    this.productInfo = {...form.value, count: 1};
    this.productService.storeProduct(this.productInfo).subscribe(() => {
      this.r2.addClass(this.success.nativeElement, 'on-success');
      setTimeout(() => {
        this.r2.removeClass(this.success.nativeElement, 'on-success');
      }, 4000);
      form.reset();
    })
  }

}

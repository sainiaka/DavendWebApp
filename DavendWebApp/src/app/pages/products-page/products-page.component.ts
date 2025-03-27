import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {
  products: any[] = []; // Original product list
  filteredProducts: any[] = []; // Filtered product list
  searchTerm: string = ''; // Search term

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    this.products = await this.productService.getProducts();
    this.filteredProducts = this.products; // Initialize with all products
  }

  // Filter products in real-time as the user types
  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Add productrs to cart
  addProduct(id: any) {
    let product = this.productService.getProductByID(id);
    console.log(product);
  }
}

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
  productQty: number = 1; // Product quantity

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
  async addProduct(id: string, qty: number) {
    try {
      const productArray = await this.productService.getProductByID(id);

      if (!productArray || productArray.length === 0) {
        console.warn('Product not found with id:', id);
        return;
      }

      // Grab existing cart
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');

      // Check if product is already in cart
      const existingProductIndex = cart.findIndex((item: { id: string }) => item.id === id);

      if (existingProductIndex > -1) {
        // If found, increase qty
        cart[existingProductIndex].qty += qty;
      } else {
        // If not found, add new entry with qty 1
        cart.push({ id, qty: qty });
      }

      // Save updated cart
      localStorage.setItem('cart', JSON.stringify(cart));

      alert('Product added to cart!');

      console.log('Cart updated:', cart);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      console.warn('Product could not be added to cart');
    }
  }

}

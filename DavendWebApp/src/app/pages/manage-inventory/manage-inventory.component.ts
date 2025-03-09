import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.component.html',
  styleUrls: ['./manage-inventory.component.css']
})
export class ManageInventoryComponent implements OnInit {
  products: any[] = [];
  newProduct = { name: '', description: '', qty: 0, imageURL: '' };
  editingProduct: any = null;

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    this.products = await this.productService.getProducts();
  }

  async addProduct() {
    await this.productService.addProduct(
      this.newProduct.name,
      this.newProduct.description,
      this.newProduct.qty,
      this.newProduct.imageURL
    );
    this.newProduct = { name: '', description: '', qty: 0, imageURL: '' }; // Reset form
    await this.loadProducts();
  }

  async editProduct(product: any) {
    this.editingProduct = { ...product }; // Clone product for editing
  }

  async saveEdit() {
    await this.productService.updateProduct(
      this.editingProduct.id,
      this.editingProduct.name,
      this.editingProduct.description,
      this.editingProduct.qty,
      this.editingProduct.imageURL
    );
    this.editingProduct = null;
    await this.loadProducts();
  }

  async deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      await this.productService.deleteProduct(id);
      await this.loadProducts();
    }
  }
}

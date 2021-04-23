import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

   searchText = '' ;
   editForm = false ;
   showForm = false ;
   myProduct: Product = {
    nom : '',
    prixunitaire: 0,
    quantite: 0
   }
  products:       Product[]= [];
  resultproducts: Product[]= [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }
   getProducts(){
     this.productService.findAll()
     .subscribe(products => {
       this.resultproducts = this.products= products
     })
   }
   deleteProduct(id) {
     this.productService.delete(id)
     .subscribe(() => {
       this.products = this.products.filter(product => product.id != id)
     })
   }
   persistProduct(){
     this.productService.persist(this.myProduct)
     .subscribe((product) => {
       this.products = [product, ...this.products];
       this.resetProduct();
       this.showForm= false ;
     })

   }
   resetProduct(){
     this.myProduct = {
       nom: '',
       prixunitaire: 0,
       quantite: 0
     }
   }
   editProduct(product){
     this.myProduct= product 
     this.editForm = true ;
   }
   updateProduct(){
     this.productService.update(this.myProduct)
     .subscribe(product => {
       this.resetProduct();
       this.editForm= false
     })
   }
   searchProducts(){
     this.resultproducts = this.products.filter((product) => product.nom.toLowerCase().includes(this.searchText.toLowerCase()))
   }
  
}

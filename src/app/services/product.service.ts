import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

   apiUrl = "http://localhost:5000/products";

  findAll(){
   return  this.http.get<Product[]>(this.apiUrl);
  }
  delete(id) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  persist(product) {
    return this.http.post<Product>(this.apiUrl, product);
  }
  update(product){
    return this.http.put(`${this.apiUrl}/${product.id}`, product);
  }


}

import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  public dataSource: MatTableDataSource<Product>;
  private dataArray: any;
  displayedColumns = ['id','name','price','description','action']

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    
    this.loadProducts()

  }

  private loadProducts():void {

    this.productService.read().subscribe((obj: any) => {
      const { products } = obj;
      this.dataArray = products
      this.dataSource = new MatTableDataSource<Product>(this.dataArray)
    },
    (err: HttpErrorResponse)=>{
      console.log(err)
    });
  }


}

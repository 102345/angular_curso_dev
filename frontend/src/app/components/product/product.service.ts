import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { Observable, EMPTY } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // public headers:HttpHeaders= new HttpHeaders({
    // 'Content-Type':'application/json',
    // 'Accept':"application/json",
    // 'Access-Control-Allow-Origin':'*',
    // 'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE',
    // 'Access-Control-Allow-Headers':'*',
    // 'Authorization':'*'
  // });

  baseUrl = "http://localhost:3000/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg,'X',{
      duration: 3000,
      horizontalPosition:"right",
      verticalPosition:"top",
      panelClass: isError? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl,product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  } 

  read(): Observable<Product[]>{
    const url = `${this.baseUrl}?page=1&itemsPerPage=10&sort=name&descending=true&search=`
    return this.http.get<Product[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  // read3(): Observable<any[]>{
    // const url = `${this.baseUrl}?page=1&itemsPerPage=10&sort=name&descending=true&search=`
    // return this.http.get<any[]>(url)

  // }

  readById(id: string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(product: Product): Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url,product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }


  errorHandler(e: any ): Observable<any>{
    this.showMessage("Ocorreu um erro",true)
    return EMPTY
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }
  
  getAllCategories(data:any):Observable<any>{
    return this._HttpClient.get('Category',{params:data})
  }

  addCategory(categoryName:string):Observable<any>{
  return this._HttpClient.post('Category',{name:categoryName})
  }

  editCategory(categoryName:string,id:number):Observable<any>{
    return this._HttpClient.put(`Category/${id}`,{name:categoryName})
    }

  deleteCategory(id:number):Observable<any>{
    return this._HttpClient.delete(`Category/${id}`)
    }


}

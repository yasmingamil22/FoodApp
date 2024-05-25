import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private _HttpClient:HttpClient) { }
  
  getAllRecipes(data:any):Observable<any>{
    return this._HttpClient.get('Recipe',{params:data})
  }

  getRecipeById(id:number):Observable<any>{
    return this._HttpClient.get(`Recipe/${id}`)
  }

  addRecipes(data :FormData):Observable<any>{
    return this._HttpClient.post('Recipe',data)
  }

  editRecipes(data :FormData,id:number):Observable<any>{
    return this._HttpClient.put(`Recipe/${id}`,data)
  }

  deleteRecipe(id :number):Observable<any>{
    return this._HttpClient.delete(`Recipe/${id})`)
  }


  getAllTags():Observable<any>{
    return this._HttpClient.get('tag')
    }


  addToFav(id :number):Observable<any>{
      return this._HttpClient.post(`userRecipe`,{recipeId:id})
    }

    removeFromFav(id :number):Observable<any>{
      return this._HttpClient.delete(`userRecipe/${id}`)
    }


    getAllFav():Observable<any>{
      return this._HttpClient.get('userRecipe')
    }
  


}


import { ICategory } from "../../categories/interfaces/ICategoryData"

export interface IRecipes {
    pageNumber: number
    pageSize: number
    data: RecipesData[]
    totalNumberOfRecords: number
    totalNumberOfPages: number
}
  
  export interface RecipesData {
    id: number
    name: string
    imagePath: string
    description: string
    price: number
    creationDate: string
    modificationDate: string
    category: ICategory[]
    tag: Tag
  }
  

  
  export interface Tag {
    id: number
    name: string
    creationDate: string
    modificationDate: string
  }
  
  export interface SearchInRecipes{
    name?: string
    tagId?:number
    categoryId?:number
    pageSize:number
    pageNumber: number

  }



  export interface IAllFav {
    pageNumber: number
    pageSize: number
    data: Fav[]
    totalNumberOfRecords: number
    totalNumberOfPages: number
  }
  
  export interface Fav {
    id: number
    creationDate: string
    modificationDate: string
    recipe: RecipesData
  }
  
 
  
  export interface Category {
    id: number
    name: string
    creationDate: string
    modificationDate: string
  }
  
  export interface Tag {
    id: number
    name: string
    creationDate: string
    modificationDate: string
  }
  
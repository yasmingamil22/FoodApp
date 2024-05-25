export interface ICategoryData {

        pageNumber: number
        pageSize: number
        data: ICategory[]
        totalNumberOfRecords: number
        totalNumberOfPages: number
      
    
      
}

  
export interface ICategory {
    id: number
    name: string
    creationDate: string
    modificationDate: string
  }
  

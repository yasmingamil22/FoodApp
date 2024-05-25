export interface IUser {

        pageNumber: number
        pageSize: number
        data: UserData[]
        totalNumberOfRecords: number
        totalNumberOfPages: number
      }
      
      export interface UserData {
        id: number
        userName: string
        email: string
        country: string
        phoneNumber: string
        imagePath: string
        group: Group
        creationDate: string
        modificationDate: string
      }
      
      export interface Group {
        id: number
        name: string
        creationDate: string
        modificationDate: string
      }
      


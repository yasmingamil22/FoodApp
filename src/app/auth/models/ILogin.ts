export interface ILogin {
    email:string;
    password:string;
}
export interface IRegister {
    userName:string;
    email:string;
    password:string;
    confirmPassword:string;
    country:string;
    phoneNumber:string;
    profileImage:string;
}

export interface ProfileData {
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




export interface IVerifyAccount{
    email:string,
    code:string
}
  export interface IForgetPassword{
  email: string,
  password: string,
  confirmPassword: string,
  otp: string
}

export interface IChangePassword{
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string,
  }
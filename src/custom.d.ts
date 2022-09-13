declare module "*.css";
declare module "*.png";
declare module "*.jpg";

type userData = {
    fullName?:string,
    email?:string,
    id?:number,
    token?:string
}

type authData = {
    password:string
}

type petData = {
    id:number,
    name:string,
    image_URL:string,
    found:boolean,
    lat:number,
    lng:number,
    zone:string
}


type MapBoxSearchProps = {
    onChange?: (any) => any;
    register?: any
    name?:string
    error?:{}
  };

  type DropzoneProps = {
    upload?: (any)=>void;
    id?:string;
    register?: any;
    className:string;

  }
  type FormInputProps = {
    id?:string
    register?:any
    error?:any
    label?:string
    [x:string]:any
  }
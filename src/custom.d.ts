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
    imageURL:string,
    found:boolean,
    lat:number,
    lng:number,
    locationName:string
}


type MapBoxSearchProps = {
    onChange?: (any) => any;
    register?: any
    name?:string
    error?:{}
    [x:string]:any
  };

  type DropzoneProps = {
    upload?: (any)=>void;
    id?:string;
    register?: any;
    className:string;

  }

type prevPathState = {
    prevPath:string
}

type petListProps = {
    from?: "user" | "all"
    caseNotFound:string
}

type inputProps = {
    id?:string
    register?:any
    large?:string
    error?:any
    label?:string
    [x:string]:any
}
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
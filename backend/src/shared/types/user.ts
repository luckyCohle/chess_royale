export type createUserParams ={
    username:string;
    email: string;
    password:string;
    rating:number;
    profile_img:string;
}
export type createUserRes={
    success:boolean;
    msg?:string;
    userId?:string;
}
export type logisUserRes={
    success:boolean;
    userId?:string;
    msg?:"user already exists"|"incorrect password"|"error"
}
export type userDataType={
    username: string,
    email:string,
    rating:number,
    profile_url:string
}
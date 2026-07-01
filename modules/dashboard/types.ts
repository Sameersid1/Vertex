export interface User{
    id:string
    name:string
    email:string
    image:string
    role:string
    createdAt:Date
    updatedAt:Date
}
export interface Project{
    id:string
    title:string
    description:string
    template:string
    createdAt:Date
    updatedAt:Date
    user:User
    // Starmark:{isMarked:boolean}[]
}
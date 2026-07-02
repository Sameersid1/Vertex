"use server"
import { db } from "@/lib/db"
import { currentUser } from "../../auth/actions"
import { revalidatePath } from "next/cache"

export const toggleStarMarked=async(playgroundId:string,isChecked:boolean)=>{
    const user=await currentUser()
    const userId=user?.id
    if(!userId){
        throw new Error("User is required")
    }
    try {
        if(isChecked){
            await db.starMark.create({
                data:{
                    userId:userId,
                    playgroundId,
                    isMarked:isChecked
                }
            })
        }else{
            await db.starMark.delete({
                where:{
                    userId_playgroundId:{
                        userId,
                        playgroundId:playgroundId
                    }
                }
            })
        }
        revalidatePath("/dashboard")
        return {success:true,isMarked:isChecked}
    } catch (error) {
        console.log(error)
         return {
            success: false,
            isMarked: false,
            error: "Failed to update favourite",
        };
    }
}
export const getAllPlaygroundForUser=async()=>{
    const user=await currentUser()
    try {
        const playground=await db.playground.findMany({
            where:{
                userId:user?.id
            },
            include:{
                user:true,
                starmark:{
                    where:{
                        userId:user?.id!
                    },
                    select:{
                        isMarked:true
                    }
                }
            }
        })
        return playground
    } catch (error) {
        console.log("Cannot return playgrounds")
    }
}

export const createPlayground=async(data:{
    title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
    description?:string
})=>{
    const user=await currentUser()

    const {template,title,description}=data
    try {
        const playground=await db.playground.create({
            data:{
                title:title,
                template:template,
                description:description,
                userId:user?.id!
            }
        })
        return playground
    } catch (error) {
        console.log(error)
    }
}

export const deleteProjectById=async(id:string)=>{
    try {
        await db.playground.delete({
            where:{
                id
            }
        })
        revalidatePath("/dashboard")
    } catch (error) {
        console.log(error)
    }
} 
export const editPlaygroundtById=async(id:string,data:{title:string,description:string})=>{
    try {
        await db.playground.update({
            where:{
                id
            },
            data:data
        })
        revalidatePath("/dashboard")
    } catch (error) {
        console.log(error)
    }
}

export const duplicatePlaygroundtById=async(id:string)=>{
    try {
        const originalPlayground=await db.playground.findUnique({
            where:{id},
            //todo:add template files
        })
        if(!originalPlayground){
            throw new Error("Original playground not found")
        }
        const duplicatedPlayground=await db.playground.create({
            data:{
                title:`${originalPlayground.title} (copy)`,
                description:originalPlayground.description,
                template:originalPlayground.template,
                userId:originalPlayground.userId
            }
        })
        revalidatePath("/dashboard")
        return duplicatedPlayground
    } catch (error) {
        
    }
}
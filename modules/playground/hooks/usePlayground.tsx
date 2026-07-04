import {useState,useEffect,useCallback} from "react"
import {toast} from "sonner"

import type {TemplateFolder} from "../lib/path-to-json"
import { getPlaygroundById, SaveUpdatedCode } from "../actions";

interface PlaygroundData{
    id:string;
    title?:string;
    [key:string]:any;
}

interface UsePlaygroundReturn{
    playgroundData:PlaygroundData | null;
    templateData:TemplateFolder | null;
    isLoading:boolean;
    error: string | null;
    loadPlayground:()=>Promise<void>;
    saveTemplateData:(data:TemplateFolder)=>Promise<void>;
}

export const usePlayground=(id:string):UsePlaygroundReturn=>{
    const [playgroundData,setPlaygroundData]=useState<PlaygroundData | null>(null);
    const [templateData,setTemplateData]=useState<TemplateFolder | null>(null)
    const [isLoading,setIsLoading]=useState(true)
    const [error,setError]=useState<string | null>(null)

    const loadPlayground=useCallback(async ()=>{
        if(!id) return;

        try {
            setIsLoading(true)
            setError(null)

            const data=await getPlaygroundById(id) 
            
            //@ts-ignore
            setPlaygroundData(data)

            const rawContent=data?.templateFiles?.[0]?.content;

            if(typeof rawContent==="string"){
                const parseContent=JSON.parse(rawContent)
                setTemplateData(parseContent)
                toast.success("playground loaded successfully")
                return;
            }
            //load template from api if not in saved content

            const res=await fetch(`/api/template/${id}`)

            if(!res.ok) throw new Error(`Failed to load template: ${res.status}`)

                //after api hit
                const templateRes=await res.json()
            if( Array.isArray(templateRes.templateJson)){        //because sometime api may only send only files
                setTemplateData({                                //folder hai hi nhi
                    folderName: "Root",                           //kbhi nhi chalega mere  proj me
                    items:templateRes.templateJson,
                });
            }else{
                setTemplateData(templateRes.templateJson || {   //    || used to prevent from crash if nothing comes after success
                    folderName:"Root",
                    items:[],
                })
            }  
            toast.success("Template loaded successfully")  
        } catch (error) {
            console.log("Error loading playground: ",error)
            setError("Failed to load playground data")
            toast.error("Failed to load playground data")
        }finally{
            setIsLoading(false)
        }
    },[id])

    const saveTemplateData=useCallback(async(data:TemplateFolder)=>{
        try {
            await SaveUpdatedCode(id,data)
            setTemplateData(data)
            toast.success("Changes saved successfully")
        } catch (error) {
            console.log("Error saving template data: ",error)
            toast.error("Failed to save changes")
            throw error;
        }
    },[id])

    useEffect(()=>{
        loadPlayground()
    },[loadPlayground])

    return{
        playgroundData,
        templateData,
        isLoading,
        error,
        loadPlayground,
        saveTemplateData
    }
}
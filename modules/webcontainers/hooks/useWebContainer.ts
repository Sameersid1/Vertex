import { useState,useCallback,useEffect } from "react";
import {WebContainer} from "@webcontainer/api"
import { TemplateFolder } from "../../playground/lib/path-to-json";

interface UseWebContainerProps{
    templateData:TemplateFolder
}

interface UseWebContainerReturn{
    serverUrl:string | null;
    isLoading:boolean;
    error:string | null;
    instance:WebContainer | null;
    writeFileSync:(path:string,content:string)=>Promise<void>;
    destroy:()=>void;
}

export const useWebContainer=({templateData}:UseWebContainerProps):UseWebContainerReturn=>{
    const [serverUrl,setServerUrl]=useState<string | null>(null)
    const [isLoading,setIsLoading]=useState<boolean>(true)
    const [error,setError]=useState<string | null>(null)
    const [instance,setInstance]=useState<WebContainer | null>(null)


    useEffect(() => {
    let mounted = true;
    let webContainerInstance: WebContainer | null = null;

    async function initialize() {
        try {
            console.log("Before boot");
            console.log("crossOriginIsolated:", window.crossOriginIsolated);
            console.log("SharedArrayBuffer:", typeof SharedArrayBuffer);
            console.log("Worker:", typeof Worker);
            console.log("navigator.userAgent:", navigator.userAgent);
            webContainerInstance = await WebContainer.boot();
            console.log("BOOT SUCCESS");
            if (!mounted) {
                webContainerInstance.teardown();
                return;
            }

            setInstance(webContainerInstance);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    initialize();

    return () => {
        mounted = false;

        if (webContainerInstance) {
            webContainerInstance.teardown();
        }
    };
}, []);
    //without this we type in editor but webcontainer will not know
    const writeFileSync=useCallback(
            async(path:string,content:string):Promise<void>=>{
        if(!instance){
            throw new Error("Welcome instance is not available")
        }
        try {
        const pathParts=path.split("/")
        const folderPath=pathParts.slice(0,-1).join("/")

        if(folderPath){
            await instance.fs.mkdir(folderPath,{recursive:true})  //create folder structure recursively
        }
        await instance.fs.writeFile(path,content)
    } catch (error) {
        const errorMessage=error instanceof Error? error.message : "Failed to write file"
        console.error(`Failed to write file at ${path}: `,error)
        throw new Error(`Failed to write file at ${path}: ${errorMessage}`)
    }
    }
  ,[instance])

    const destroy=useCallback(()=>{
        if(instance){
            instance.teardown()
            setInstance(null)
            setServerUrl(null)
        }
    },[instance])
    return {serverUrl,isLoading,error,instance,writeFileSync,destroy}
}
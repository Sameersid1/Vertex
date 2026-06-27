import NextAuth from "next-auth";

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    publicRoutes,
    authRoutes
} from "./routes"
import authConfig from "./src/auth.config"

const {auth}=NextAuth(authConfig)

export default auth((req)=>{
    console.log("PATH:", req.nextUrl.pathname);
    console.log("AUTH:", req.auth);
    const {nextUrl}=req;
    const isLoggedIn=!!req.auth

    const isApiAuthRoute=nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute=publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute=authRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoute){
        return null;  //middleware ko warning bikul chup
    }
    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        }
    }
    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/sign-in",nextUrl))
    }    
    return null;
})
export const config={
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
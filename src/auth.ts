import NextAuth from "next-auth"
import {db} from "./lib/db"
import { JWT } from "next-auth/jwt"
import {PrismaAdapter} from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { getUserById } from "../modules/auth/actions"
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks:{
    async signIn({user,account,profile}){
      if(!user || !account) return false;

      const existingUser=await db.user.findUnique({
        where:{email:user.email!}
      })
      if(!existingUser){
        const newUser=await db.user.create({
          data:{
            email:user.email!,
            name:user.name,
            image:user.image,

            accounts:{
                create:{
                type:account.type,
                provider:account.provider,
                providerAccountId:account.providerAccountId,
                refresh_token:account.refresh_token,
                access_token:account.access_token,
                expires_at:account.expires_at,
                token_type:account.token_type,
                scope:account.scope,
                id_token:account.id_token,
                session_state:
                  typeof account.session_state === "string"
                    ? account.session_state
                    : null,
              }
            }
        }
        })
        if(!newUser)  return false
      }
      else{
        const existingAccount=await db.account.findUnique({
          where:{
            provider_providerAccountId:{
              provider:account.provider,
              providerAccountId:account.providerAccountId
            }
          }
        })

        if(!existingAccount){
          await db.account.create({
            data:{
              userId:existingUser.id,
              type:account.type,
              provider:account.provider,
              providerAccountId:account.providerAccountId,
              refresh_token:account.refresh_token,
              access_token:account.access_token,
              expires_at:account.expires_at,
              token_type:account.token_type,
              scope:account.scope,
              id_token:account.id_token,
              session_state:
              typeof account.session_state === "string"
                ? account.session_state
                : null,
            }
          })
        }
      }
      return true
    },
    async jwt({token}){
      console.log("JWT TOKEN BEFORE:", token);
      if(!token.sub)  return token;
      const existingUser=await getUserById(token.sub)
      if(!existingUser) return token;  //user deleted return old token
      console.log("DB USER:", existingUser);
      token.name=existingUser.name
      token.email=existingUser.email
      token.role=existingUser.role

      return token
    },
    async session({session,token}){
      if(token.sub && session.user){
        session.user.id=token.sub
      }
      if(token.sub && session.user){
        session.user.role=token.role
      }
      return session
    }
  },
  secret:process.env.AUTH_SECRET,
  adapter:PrismaAdapter(db),
  ...authConfig
})
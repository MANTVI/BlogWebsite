import Config from "../Config/Config.js";

import { Client, Account, ID } from "appwrite";
// why we usee AuthService/ 

export class AuthService{
     client = new Client()
    Acount;
    constructor(){  
        this.client
            .setEndpoint(Config.appWriteUrl)
            .setProject(Config.appWriteProjecttId);

        this.Acount= new Account(this.client)    
    }

    async signUp({email,password,name}){  //done
        try {
            const  userAcount = await this.Acount.create(ID.unique(),email, password,name);
            if(userAcount){ 
                // call signin method if Acount created
                return this.signIn({email,password});
            }
            else{
                return userAcount;
            }
        } catch (error) {
            throw error;
            
        }
    }

    async signIn({email,password}){   //done
        try {
            return await this.Acount.createEmailPasswordSession(email, password);
            
        } catch (error) {
            throw error;
            
        }
    }
    async currentUser(){
        try {
            return await this.Acount.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
            
            
        }
        return null;
    }
    async logOut(){   // done
        try {
            return await this.Acount.deleteSessions()
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }

    }

}

const authService= new AuthService()
export default authService; //
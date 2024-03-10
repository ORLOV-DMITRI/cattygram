import {INewUser} from "@/types";
import {account} from "@/lib/appwrite/config.ts";
import {ID} from "appwrite";

export async function createUserAccount(user: INewUser) {
    console.log(user)
    try {
        return account.create(
            ID.unique(),
            user.email,
            user.cattyName,
            user.password
        )
    } catch (error) {
        console.log(error)
        return error;
    }
}
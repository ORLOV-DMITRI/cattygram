import {INewUser} from "@/types";
import {account, appwriteConfig, avatars, databases} from "@/lib/appwrite/config.ts";
import {ID} from "appwrite";
import {log} from "util";

export async function createUserAccount(user: INewUser) {
    console.log(user)
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            imageUrl: avatarUrl,
            username: user.username
        })

        return newUser

    } catch (error) {
        console.error(error)
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string,
    email: string,
    name: string,
    imageUrl: URL,
    username?: string,

}) {
    try {
        console.log(appwriteConfig.userCollectionID)
        console.log(appwriteConfig)
        console.log(appwriteConfig)
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionID,
            ID.unique(),
            user,
        )
        return newUser;

    } catch (error) {
        console.error(error)
        return error
    }
}

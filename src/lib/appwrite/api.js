import { ID } from "appwrite"
import { account, appwriteConfig } from "./config";
import { databases } from "./config";
import { Query } from "appwrite";

export async function createUserAccount(user) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if(!newAccount) throw Error;

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export async function saveUserToDB(user) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        );

        return newUser
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(user) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);

        return session;
    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];

    } catch (error) {
        console.log(error);
    }
}


export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        console.log(error)
    }
}



// =============== Groups functions =================================

export async function createGroup(group) {
    try {
        const newGroup = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.groupCollectionId,
            ID.unique(),
            {
                creator: group.userId,
                title: group.title
            }
        )

        if (!newGroup) throw Error;

        return newGroup;

    } catch {error} {
        console.log(error);
    }
}


export async function fetchGroups(userId) {
    try {
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.groupCollectionId,
            [Query.equal('creator', userId)]
        );

        if (!response) throw Error;

        return response.documents

    } catch (error) {
        console.log(error);
        return [];
    }
}



// ==================== Status Functions ============================

export async function createStatus(status) {
    try {
        const newStatus = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.statusCollectionId,
            ID.unique(),
            {
                groups: status.groupId,
                title: status.title,
                color: status.color
            }
        )

        if (!newStatus) throw Error;

        return newStatus;

    } catch (error) {
        console.log(error)
    }
}
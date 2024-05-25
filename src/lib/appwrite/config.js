import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    groupCollectionId: import.meta.env.VITE_APPWRITE_GROUPS_COLLECTION_ID,
    statusCollectionId: import.meta.env.VITE_APPWRITE_STATUSES_COLLECTION_ID,
    taskCollectionId: import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID,
    subtaskCollectionId: import.meta.env.VITE_APPWRITE_SUBTASKS_COLLECTION_ID,
}


export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
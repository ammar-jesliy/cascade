import { ID } from "appwrite";
import { account, appwriteConfig } from "./config";
import { databases } from "./config";
import { Query } from "appwrite";

// Function to check if the email already exists
async function emailExists(email) {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("email", email)]
    );

    return result.documents.length > 0;
  } catch (error) {
    console.log("Error checking email existence:", error);
    return false;
  }
}

export async function createUserAccount(user) {
  try {
    const emailAlreadyExists = await emailExists(user.email);

    if (emailAlreadyExists) {
      throw new Error("Email already in use");
    }

    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function saveUserToDB(user) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    localStorage.clear();

    return session;
  } catch (error) {
    console.log(error);
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
        title: group.title,
      }
    );

    if (!newGroup) throw Error;

    return newGroup;
  } catch {
    error;
  }
  {
    console.log(error);
  }
}

export async function fetchGroups(userId) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.groupCollectionId,
      [Query.equal("creator", userId)]
    );

    if (!response) throw Error;

    return response.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteGroup(groupId) {
  try {
    // List all statuses related to the group
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.statusCollectionId,
      [Query.equal("groups", groupId)]
    );

    if (!response) throw new Error("Failed to fetch statuses");

    const statuses = response.documents;

    // Delete each status (and its tasks and subtasks)
    const deleteStatusPromises = statuses.map((status) =>
      deleteStatus(status.$id)
    );

    await Promise.all(deleteStatusPromises);

    // Finally, delete the group
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.groupCollectionId,
      groupId
    );
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
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
        color: status.color,
      }
    );

    if (!newStatus) throw Error;

    return newStatus;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchStatuses(groupId) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.statusCollectionId,
      [Query.equal("groups", groupId)]
    );

    if (!response) throw Error;

    return response.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Function to delete a status and its tasks and subtasks
export async function deleteStatus(statusId) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.taskCollectionId,
      [Query.equal("statuses", statusId)]
    );

    if (!response) throw new Error("Failed to fetch tasks");

    const tasks = response.documents;

    const deleteTaskPromises = tasks.map((task) => deleteTask(task.$id));

    await Promise.all(deleteTaskPromises);

    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.statusCollectionId,
      statusId
    );
  } catch (error) {
    console.log(error);
  }
}

export async function deleteOnlyStatus(statusId) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.statusCollectionId,
      statusId
    );
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
}

// ========================= Task Functions ===================================

export async function createTask(task) {
  try {
    const newTask = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.taskCollectionId,
      ID.unique(),
      {
        statuses: task.statusId,
        title: task.title,
        description: task.description,
      }
    );

    if (!newTask) throw Error;

    return newTask;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTasks(statusId) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.taskCollectionId,
      [Query.equal("statuses", statusId)]
    );

    if (!response) throw Error;

    return response.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateStatus(taskId, statusId) {
  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.taskCollectionId,
      taskId,
      {
        statuses: statusId,
      }
    );
  } catch (error) {
    console.log("Failed to update", error);
  }
}

export async function deleteTask(taskId) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.subtaskCollectionId,
      [Query.equal("tasks", taskId)]
    );

    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.taskCollectionId,
      taskId
    );

    if (!response) throw Error;

    const deleteSubtasks = response.documents;

    const deleteSubtaskPromises = deleteSubtasks.map((subtask) => {
      databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.subtaskCollectionId,
        subtask.$id
      );
    });

    await Promise.all(deleteSubtaskPromises);
  } catch (error) {
    console.log(error);
  }
}

// ====================== Subtask Functions ===================================

export async function createSubtask(subtask) {
  try {
    const newSubtask = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.subtaskCollectionId,
      ID.unique(),
      {
        tasks: subtask.taskId,
        title: subtask.title,
      }
    );

    if (!newSubtask) throw Error;

    return newSubtask;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchSubtasks(taskId) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.subtaskCollectionId,
      [Query.equal("tasks", taskId)]
    );

    if (!response) throw Error;

    return response.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function setComplete(subtaskId, completed) {
  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.subtaskCollectionId,
      subtaskId,
      {
        completed: completed,
      }
    );
  } catch (error) {
    console.log("Failed to update", error);
  }
}

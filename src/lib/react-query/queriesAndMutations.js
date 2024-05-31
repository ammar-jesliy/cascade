import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { createUserAccount, signInAccount, signOutAccount, createGroup, createStatus, createTask, createSubtask } from '../appwrite/api'
 

export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user) => createUserAccount(user)
    })
}

export const useSignInAccountMutation = () => {
    return useMutation({
        mutationFn: (user) => signInAccount(user)
    })
}

export const useSignOutAccountMutation = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}


export const useCreateGroupMutation = () => {
    return useMutation({
        mutationFn: (group) => createGroup(group)
    })
}


export const useCreateStatusMutation = () => {
    return useMutation({
        mutationFn: (status) => createStatus(status)
    })
}


export const useCreateTaskMutation = () => {
    return useMutation({
        mutationFn: (task) => createTask(task)
    })
}


export const useCreateSubtaskMutation = () => {
    return useMutation({
        mutationFn: (subtask) => createSubtask(subtask)
    })
}
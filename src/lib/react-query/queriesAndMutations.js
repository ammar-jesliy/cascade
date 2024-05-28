import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { createUserAccount, signInAccount, signOutAccount, createGroup } from '../appwrite/api'
 

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
import client from './index'

export async function login({username,password}){
    const {data}=await client.post('/api/login',{username,password})
    return data
}

export async function signUp({username,password}){
    const {data}=await client.post('/api/signup',{username,password})
    return data
}

export async function update({userId,points}){
    const {data}=await client.put(`/users/${userId}`,{points})
    return data
}

export async function logOut(){
    const {data}=await client.post('/logout')
    return data
}
import {atom } from 'recoil'


export const isAdmin = atom({
    key : "admin",
    default : false
})
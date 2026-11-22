import { nanoid } from "nanoid"

export const generateCode = (length=6)=>{
    return nanoid(length)
}


import {z} from "zod";


export const SignUpValidation = z.object({
    username: z.string().min(2, {message: 'Не короче 2-х символов'}).max(50),
    name: z.string().min(2, {message: 'Не короче 2-х символов'}).max(50),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Не короче 8-ми символов'}).max(50),
})

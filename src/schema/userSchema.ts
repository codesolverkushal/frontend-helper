import {z} from "zod";


export const userSignUpSchema = z.object({
    fullname: z.string().min(1,"FullName is required!"),
    email: z.string().email("Please enter a valid email!"),
    password: z.string().min(6,"Password must be atleast six character!"),
    contact: z.string().min(10,"Enter a valid mobile no.")
});
export const userLoginSchema = z.object({
    email: z.string().email("Please enter a valid email!"),
    password: z.string().min(6,"Password must be atleast six character!"),
});


export type SignupInputState = z.infer<typeof userSignUpSchema>;
export type LoginInputState = z.infer<typeof userLoginSchema>;
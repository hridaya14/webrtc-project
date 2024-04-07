import { z } from "zod"

export const registerSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
    avatar: z.string().optional(),
    isVerified: z.boolean().optional()
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
        code: "custom",
        message: "The passwords did not match"
        });
    }
});
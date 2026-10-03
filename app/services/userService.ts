import { fetcher } from "../lib/fetcher";

export interface User {
    username: string;
    email: string;
    password: string;
}

export async function createUser(user: User): Promise<User> {
    return fetcher<User>("/users", {
        method: "POST",
        body: JSON.stringify(user),
    });
}
export async function getUser(id: number): Promise<User> {
    return fetcher<User>(`/users/${id}`, { cache: "no-cache" });
}
export async function loginUser(email: string, password: string): Promise<User> {
    return fetcher<User>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}
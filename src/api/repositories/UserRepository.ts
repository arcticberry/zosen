import { env } from '../../env'

export default class UserRepository implements UserRepositoryInterface {
    constructor() {}

    public compareCredentials (username, password) {
        if (username != env.app.username || password != env.app.password) return undefined;

        return { username, password };
    }
}

export interface UserRepositoryInterface {
    compareCredentials(username: string, password: string): {username: string, password: string} | undefined
}
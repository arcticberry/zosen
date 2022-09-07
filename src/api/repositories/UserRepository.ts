import { env } from '../../env'

export default class UserRepository implements UserRepositoryInterface {
    constructor() {}

    public compareCredentials (username, password) {
        const credentialsValid = username === env.app.username && password === env.app.password

        return credentialsValid ? { username, password }: undefined;
    }
}

export interface UserRepositoryInterface {
    compareCredentials(username: string, password: string): {username: string, password: string} | undefined
}
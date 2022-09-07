import * as express from 'express';
import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../decorators/Logger';
import { UserRepositoryDecorator, UserRepositoryInterface } from '../decorators/UserRepository';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        @UserRepositoryDecorator() private userRepository: UserRepositoryInterface
    ) { }

    public parseBasicAuthFromRequest(req: express.Request): { username: string, password: string } {
        const authorization = req.header('authorization');

        if (authorization && authorization.split(' ')[0] === 'Basic') {
            this.log.info('Credentials provided by the client');
            const decodedBase64 = Buffer.from(authorization.split(' ')[1], 'base64').toString('ascii');
            const username = decodedBase64.split(':')[0];
            const password = decodedBase64.split(':')[1];
            if (username && password) {
                return { username, password };
            }
        }

        this.log.info('No credentials provided by the client');
        return undefined;
    }

    public validateUser(username: string, password: string): { username: string, password: string } | undefined {
        const user = this.userRepository.compareCredentials(username, password)

        return user
    }

}

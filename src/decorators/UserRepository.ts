import { Container } from 'typedi';

import UserRepository from '../api/repositories/UserRepository';

export function UserRepositoryDecorator(): ParameterDecorator {
    return (object, propertyKey, index): any => {
        const userRepository = new UserRepository();
        const propertyName = propertyKey ? propertyKey.toString() : '';
        Container.registerHandler({ object, propertyName, index, value: () => userRepository });
    };
}

export { UserRepositoryInterface } from '../api/repositories/UserRepository';

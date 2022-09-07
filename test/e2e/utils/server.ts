import { bootstrapApp } from './bootstrap';

export const prepareServer = async () => {
    const settings = await bootstrapApp();
    return settings;
};

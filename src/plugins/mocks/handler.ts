import authHandler from '@/plugins/mocks/modules/auth';
import userHandler from '@/plugins/mocks/modules/user';

export const handlers = [...authHandler, ...userHandler];

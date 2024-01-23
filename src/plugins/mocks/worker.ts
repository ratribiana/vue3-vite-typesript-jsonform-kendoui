import { setupWorker } from 'msw/browser';
import { handlers } from '@/plugins/mocks/handler';

export const worker = setupWorker(...handlers);

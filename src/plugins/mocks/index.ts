import { worker } from '@/plugins/mocks/worker';

const loadFakeAPI = async () => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    const workerUrl = `${import.meta.env.VITE_API_URL ?? '/'}mockServiceWorker.js`;

    return worker.start({
      serviceWorker: {
        url: workerUrl,
      },
      onUnhandledRequest: 'bypass',
    });
  }

  return Promise.resolve();
};

export default loadFakeAPI;

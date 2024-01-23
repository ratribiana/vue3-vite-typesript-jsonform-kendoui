import { HttpResponse, http } from 'msw';
import { db } from '@/plugins/mocks/db';
import type { IUser } from '@/types/user.types';
import { dataTimeToNumber } from '@/utils/functions';

interface AuthResponse {
  data?: {
    expiredIn: string;
    token: string;
  };
  message: string;
}

const authHandler = [
  http.post('/api/login', async ({ request, params }) => {
    const { email, password } = await request.json();

    let errors: { success: boolean; message: string } = {
      success: false,
      message: '',
    };

    const user: IUser | undefined = db.users.find((u) => u.email === email && u.password === password);

    if (user) {
      try {
        const token: string | undefined = db.userTokens[user.id];

        if (token) {
          const response: AuthResponse = {
            data: {
              expiredIn: dataTimeToNumber(new Date()),
              token,
            },
            message: 'User successfully login',
          };

          return HttpResponse.json(response);
        } else {
          errors = { success: false, message: 'Access token not found' };
        }
      } catch (e) {
        errors = { success: false, message: e };
      }
    } else {
      errors = { success: false, message: 'User not found' };
    }

    return HttpResponse.json(errors, { status: 400 });
  }),
];

export default authHandler;

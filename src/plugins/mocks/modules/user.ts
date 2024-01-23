import { HttpResponse, http } from 'msw';
import { db } from '@/plugins/mocks/db';
import type { IUser } from '@/types/user.types';

interface UserResponse {
  data?: {
    expiredIn: string;
    token: string;
  };
  message: string;
}

const userHandler = [
  http.get('/api/user', async ({ request }) => {
    const token: string = request.headers.get('Authorization')?.split(' ')[1];

    let errors: { success: boolean; message: string } = {
      success: false,
      message: '',
    };

    const userIndex: IUser | undefined = db.userTokens.indexOf(token);

    if (userIndex) {
      try {
        const user: string | undefined = db.users[userIndex - 1];

        if (user) {
          const userData: IUser = { ...user };
          const userOutData: Partial<IUser> = Object.fromEntries(
            Object.entries(userData).filter(([key, _]) => !(key === 'password' || key === 'abilityRules')),
          );

          const response: UserResponse = {
            data: { ...userOutData },
            message: 'User successfully fetched',
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

export default userHandler;

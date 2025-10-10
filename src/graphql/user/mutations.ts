import {prismaClient} from '../../lib/db.js';

export const mutations = {
  createUser: async (
    _: any,
    { firstName, lastName, email, password }: 
    { firstName: string; lastName: string; email: string; password: string }
  ) => {
    await prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        salt: 'random_salt',
      },
    });
    return true;
  },
};

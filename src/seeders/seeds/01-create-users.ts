import User from '../../models/User';
import { Role } from '../../utils/roles';

export default (async () => {
  try {
    await User.create({
      name: 'Damien White',
      email: 'damien.white@visoftinc.com',
      password: 'password',
      provider: 'local',
      role: Role.Admin,
    });
  } catch {
    // eslint-disable-next-line no-console
    console.error('User already exists');
  }
  try {
    await User.create({
      name: 'Mark Dickson',
      email: 'mark.w.dickson@gmail.com',
      password: 'password',
      provider: 'local',
      role: Role.Admin,
    });
  } catch {
    // eslint-disable-next-line no-console
    console.error('User already exists');
  }
})();

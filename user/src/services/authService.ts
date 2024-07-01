import { User } from '../models/user';

class AuthService {
  
  static async register(username: string, email: string, password: string) {
    return await User.create({ username, email, password });
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    
    return user
  }
}

export default AuthService;
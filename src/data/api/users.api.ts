import { request } from './request';

// TODO: Type output
export class UsersApi {
  public static userLogin(body: { email: string; password: string; name: string }): Promise<any | null> {
    return request('/user/login', { method: 'POST', body });
  }

  public static checkSession(): Promise<any | null> {
    return request('/user/check-session', { method: 'GET' });
  }
}

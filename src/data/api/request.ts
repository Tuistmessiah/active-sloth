import { ToastAction } from 'src/components/ui/toast';
import { toast } from 'src/components/ui/use-toast';
import { MiscUtils } from 'src/utils/misc.utils';
import { dispatch } from '../redux/store';
import { setTrigger } from '../redux/reducers/session.reducer';

/**
 * @param token Bearer token. Defaults to local storage "token" when not defined.
 * @param errorMessage custom error message. Defaults to response error message.
 * @param suppressToast boolean to surpress error toast display. If true, on catch, rethrows error. Need to catch it
 */
type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  token?: string;
  headers?: Record<string, string>;
  params?: string | Record<string, string> | URLSearchParams | string[][] | undefined;
  errorMessage?: string;
  suppressToast?: boolean;
};

// TODO: Do not authenticated catch to change to login page
export async function request<T>(url: string, options: RequestOptions): Promise<T> {
  try {
    const headers: HeadersInit = { 'Content-Type': 'application/json', ...options.headers };

    // TODO: Move token away from local storage
    if (options.token) headers['Authorization'] = `Bearer ${options.token}`;
    else headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    let queryParams = '';
    if (options.params) {
      const searchParams = options.params instanceof URLSearchParams ? options.params : new URLSearchParams(options.params);
      queryParams = `?${searchParams.toString()}`;
    }

    const response = await fetch(`${MiscUtils.env('REACT_APP_API_URL')}${url}${queryParams}`, {
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : null,
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    return response.json();
  } catch (error) {
    if (!options.suppressToast) {
      displayErrorToast(options.errorMessage || 'Something went wrong. Please try again.');
      return Promise.reject(error);
    }
    throw error;
  }
}

function displayErrorToast(message: string) {
  dispatch(setTrigger({ name: 'trigger-notification', message }));
}

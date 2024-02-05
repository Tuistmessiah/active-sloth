/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
  /**
   * Signup
   * @param requestBody
   * @returns any Successful response
   * @throws ApiError
   */
  public static postApiV1UserSignup(requestBody?: any): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/user/signup',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Login
   * @param requestBody
   * @returns any Successful response
   * @throws ApiError
   */
  public static postApiV1UserLogin(requestBody?: Record<string, any>): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/user/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Update Me
   * @param a
   * @param requestBody
   * @returns any Successful response
   * @throws ApiError
   */
  public static patchApiV1UserUpdateMe(a?: string, requestBody?: Record<string, any>): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/user/updateMe',
      headers: {
        a: a,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Update Me Copy
   * @param a
   * @returns any Successful response
   * @throws ApiError
   */
  public static deleteApiV1UserDeleteMe(a?: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/user/deleteMe',
      headers: {
        a: a,
      },
    });
  }
}

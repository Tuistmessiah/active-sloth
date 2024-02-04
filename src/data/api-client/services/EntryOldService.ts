/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EntryOldService {
    /**
     * Create Entry
     * @param requestBody
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiV1Entry(
        requestBody?: Record<string, any>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/entry',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Query Entries
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiV1Entry(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/entry',
        });
    }
    /**
     * Get All
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiV1EntryAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/entry/all',
        });
    }
    /**
     * Get Entry
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiV1EntryAsdasd(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/entry/asdasd',
        });
    }
    /**
     * Update Entry
     * @param requestBody
     * @returns any Successful response
     * @throws ApiError
     */
    public static patchApiV1Entry65Ba0B238D9D94C80128A81C(
        requestBody?: Record<string, any>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/entry/65ba0b238d9d94c80128a81c',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete Entry
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteApiV1Entry65Ba0Ad4Bd75F85F5498C491(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/entry/65ba0ad4bd75f85f5498c491',
        });
    }
    /**
     * Entries Current Month
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiV1EntryCurrent(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/entry/current',
        });
    }
}

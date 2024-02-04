/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DaysService {
    /**
     * Current Month
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiV1DayCurrentMonth(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/day/currentMonth',
        });
    }
    /**
     * Range Month
     * @param start
     * @param end
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiV1DayRange(
        start?: string,
        end?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/day/range',
            query: {
                'start': start,
                'end': end,
            },
        });
    }
    /**
     * Create Day
     * @param requestBody
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiV1Day(
        requestBody?: Record<string, any>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/day',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Day
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiV1Day65Bdf29823C3Cdff49C1C4Af(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/day/65bdf29823c3cdff49c1c4af',
        });
    }
    /**
     * Update Day
     * @param requestBody
     * @returns any Successful response
     * @throws ApiError
     */
    public static patchApiV1Day65Bdf29823C3Cdff49C1C4Af(
        requestBody?: Record<string, any>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/day/65bdf29823c3cdff49c1c4af',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update Entries
     * @param requestBody
     * @returns any Successful response
     * @throws ApiError
     */
    public static putApiV1Day65Bdf29823C3Cdff49C1C4AfEntries(
        requestBody?: Record<string, any>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/day/65bdf29823c3cdff49c1c4af/entries',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete Day
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteApiV1Day65Bde93F6B10Bda5791Fb6C4(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/day/65bde93f6b10bda5791fb6c4',
        });
    }
}

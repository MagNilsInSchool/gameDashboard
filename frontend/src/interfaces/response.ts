export interface ApiSuccess<T = unknown> {
    success: true;
    message: string;
    count: number;
    data: T;
}
export interface ApiError {
    success: false;
    message: string;
}
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface Result<T> {
    success: boolean;
    message: string | null;
    validationErrors?: { [key: string]: string; };
    data?:T
}
/**
 * Assert that a value is not undefined. If it is, throw an error with the provided message.
 * @param v - Value to assert
 * @param errorMessage - Error message to throw if value is undefined
 */
export declare function assertValue<T extends string | undefined>(v: T | undefined, errorMessage: string): T;

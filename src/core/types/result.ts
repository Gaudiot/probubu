export class Result<T, E = Error> {
    private constructor(
        private readonly _success: boolean,
        private readonly _data?: T,
        private readonly _error?: E
    ) { }

    static ok<T, E = Error>(data: T): Result<T, E> {
        return new Result<T, E>(true, data, undefined);
    }

    static error<T, E = Error>(error: E): Result<T, E> {
        return new Result<T, E>(false, undefined, error);
    }

    isOk(): this is Result<T, never> {
        return this._success;
    }

    isError(): this is Result<never, E> {
        return !this._success;
    }

    get data(): T {
        if (!this._success) {
            throw new Error('Cannot get data from error result');
        }
        return this._data!;
    }

    get error(): E {
        if (this._success) {
            throw new Error('Cannot get error from success result');
        }
        return this._error!;
    }

    map<U>(fn: (data: T) => U): Result<U, E> {
        if (this._success) {
            return Result.ok(fn(this._data!));
        }
        return Result.error(this._error!);
    }

    mapError<F>(fn: (error: E) => F): Result<T, F> {
        if (!this._success) {
            return Result.error(fn(this._error!));
        }
        return Result.ok(this._data!);
    }

    match<U>(onOk: (data: T) => U, onError: (error: E) => U): U {
        return this._success ? onOk(this._data!) : onError(this._error!);
    }
}
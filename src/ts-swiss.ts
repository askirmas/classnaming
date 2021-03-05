export type Ever<T, V, D = EmptyObject> = [T] extends [never] ? D : V
export type EmptyObject = Record<never, never>
export type AnyObject = {[k: string]: any}
export type Falsy = undefined|null|false|0|""
// export type Part<T> = {[K in keyof T]: T[K] | undefined}
// type get<T, K> = K extends keyof T ? T[K] : never

/** @see https://stackoverflow.com/a/49579497/9412937 */
export type RequiredKeys<T> = { [K in keyof T]-?:
  ({} extends { [P in K]: T[K] } ? never : K)
}[keyof T]

export type BoolDict = Record<string, boolean>

/** @see https://github.com/microsoft/TypeScript/issues/31153#issuecomment-487872268 */
export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends {[_ in keyof T]: infer U} ? U : never;
export type OmitIndexed<T> = Pick<T, KnownKeys<T> & keyof T>
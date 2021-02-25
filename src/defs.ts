import type { JSXElementConstructor } from "react"

/** Multipurpose generic
 * @example ClassNames<true> === {className: string}
 * @example ClassNames<"class1"|"class2"> === {classnames: {class1: undefined|string, class2: undefined|string}}
 * @example ClassNames<Props1, Props2> === {classnames: Props1["classnames"] & Props2["classnames"]}
 * @example ClassNames<true, "class1", Props, typeof Component1, typeof FunctionalComponent>
 */
//TODO Consider string | ClassNamesMap
export type ClassNames<
  C0 extends true | ReactRelated,
  C1 extends ReactRelated = never,
  C2 extends ReactRelated = never,
  C3 extends ReactRelated = never,
  C4 extends ReactRelated = never,
  C5 extends ReactRelated = never,
  C6 extends ReactRelated = never,
  C7 extends ReactRelated = never,
  C8 extends ReactRelated = never,
  C9 extends ReactRelated = never,
  C10 extends ReactRelated = never
>
= Ever<Extract<C0, true>, {className: string}>
& ClassNamesProp<
  Extract<C0, string>
  | GetClassKeys<Extract<C0, ReactRelated>>
  | GetClassKeys<C1>
  | GetClassKeys<C2>
  | GetClassKeys<C3>
  | GetClassKeys<C4>
  | GetClassKeys<C5>
  | GetClassKeys<C6>
  | GetClassKeys<C7>
  | GetClassKeys<C8>
  | GetClassKeys<C9>
  | GetClassKeys<C10>  
>

export type ClassNamed = {
  className: string
}

export type ClassNamer<ClassKeys extends string> = {
  className?: undefined|string
  classnames: ClassNamesMap<ClassKeys>
}

export type ReactRelated = Record<string, any> | JSXElementConstructor<any>

export type ClassNamesProperty<C extends ClassNamesMap<string>> = Ever<keyof C, {classnames: C}>

export type ClassNamesProp<C extends string> = Ever<C, {classnames: ClassNamesMap<C>}>

export type ClassValue = undefined|string

export type ClassNamesMap<C extends string> = Record<C, ClassValue>

export type GetProps<C> = C extends JSXElementConstructor<infer P> ? P : C
//TODO Consider not empty object
export type GetClassNames<T, D = EmptyObject> = [T] extends [never] ? D : "classnames" extends keyof T ? T["classnames"] : never
export type GetClassKeys<C> = [GetClassNames<GetProps<C>, never>] extends [never] ? never : keyof GetClassNames<GetProps<C>>

type Ever<T, V> = [T] extends [never] ? EmptyObject : V
export type EmptyObject = Record<never, never>

export type Falsy = undefined|null|false|0|""

export type ToggleMap<K extends string> = Partial<Record<K, true|Falsy>>

// type get<T, K> = K extends keyof T ? T[K] : never

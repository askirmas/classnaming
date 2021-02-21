import { EMPTY_ARRAY } from "./consts"

const stringifyProperty: SymbolConstructor["toPrimitive"] | "valueOf" | "toString"  = Symbol.toPrimitive

const {
  keys: $keys,
  defineProperty: $defineProperty
} = Object

export {
  truthyKeys, stringifyClassNamed, emptize
}

//TODO Better type notation
function truthyKeys<T>(source: T) {
  if (source === null || typeof source !== "object")
    return source
    ? [source]
    : EMPTY_ARRAY
    
  return ($keys(source) as (keyof T)[])
  .filter(key => source[key])
}

function stringifyClassNamed<T extends {className: string}>(source: T) :T {
  if (!source.hasOwnProperty(stringifyProperty))
    $defineProperty(source, stringifyProperty, {value: classNamedToString})
  
  return source
}

function classNamedToString(this: {className: string}) {
  return this.className
}

function emptize(source: Record<string, any>) {
  if (!source.hasOwnProperty(stringifyProperty))
    $defineProperty(source, stringifyProperty, {value: emptyLambda})
  return source
}

function emptyLambda() {
  return "" as const
}


import type { CssModule } from "./definitions.types"
import type {
  Subest,
  Strip,
  PartDeep,
  Extends,
  Ever0
} from "./ts-swiss.types"
import type { ClassNamed } from "./main.types"
import type {ReactClassNaming} from "."

export type ClassBeming<
  ClassNames extends CssModule,
> = 
/**
 * Makes `string`-className from conditioned BEM query based on supplied CSS classes. 
 * Destructed to singleton `{className: string}`, stringifyable object
 * @returns
 * @example
 * ```typescript
 *    bem(true) // `${props.className}`
 *    bem({button: true}) // "button"
 *    bem({button: "raised"}) // "button button--raised"
 *    bem({button: false && "raised"}) // "button"
 *    bem({button: {type: "raised"}}) // "button button--type--raised"
 * 
 *    bem(true, {
 *      "material-icons": true,
 *      ripple: "background-focused",
 *      button__icon: {size: "big"}
 *    }) // `${props.className} material-icons ripple ripple--background-focused button__icon button__icon--size--big`
 * ```
 * @example
 * ```typescript
 *   <div {...bem(...)} />;
 *   <div data-block={`${bem(...)}`} />
 * ```
*/
<
  Q1 extends undefined | boolean | BemQuery<keyof ClassNames>,
  // Q2 extends BemQuery<keyof ClassNames> will be needed for #31
>(
  arg0?: Q1 extends undefined | boolean ? Q1 : Subest<BemQuery<keyof ClassNames>, Q1> , 
  arg1?: Q1 extends undefined | boolean ? BemQuery<keyof ClassNames> : never
) => ClassNamed

export type BemQuery<
  classes extends string,
  delM extends string = "modDelimiter" extends keyof ReactClassNaming.BemOptions
  ? ReactClassNaming.BemOptions["modDelimiter"]
  : ReactClassNaming.BemOptions["$default"]["modDelimiter"],
> = string extends classes ? BemInGeneral : PartDeep<{
  [base in Strip<classes, delM>]: true
  | (
    Extends<classes, `${base}${delM}${string}`, 
      false
      | Exclude<MVs<classes, base>, `${string}${delM}${string}`>
      | (
        {[m in Strip<MVs<classes, base>, delM>]: 
          false | (
            Ever0<
              classes extends `${base}${delM}${m}${delM}${infer V}`
              ? V : never,
              true
            >
          )
        }
      )
    >
  )
}>

type MVs<
  classes extends string,
  b extends string,
  delM extends string = "modDelimiter" extends keyof ReactClassNaming.BemOptions
  ? ReactClassNaming.BemOptions["modDelimiter"]
  : ReactClassNaming.BemOptions["$default"]["modDelimiter"],
> = classes extends `${b}${delM}${infer MV}` ? MV : never

export type BemInGeneral = {
  [base: string]: undefined | boolean | string
  // TODO #40 | (false|string)[]
  | {
    [mod: string]: undefined | boolean | string
  }
}
import type { ToggleMap, ClassNamer, ClassNamed, ClassNamesMap, EmptyObject } from "./defs"
import {joinWithLead, resolver, wrapper} from "./core"
import { emptize } from "./utils"
import { EMPTY_OBJECT } from "./consts"

emptize(classNamer)

//TODO no `className` - no first `true`
interface tClassNaming<
  ClassKeys extends string,
  withClassNames extends boolean | undefined
> {
  /**
   * @example classes(true) === props.className
   * @example classes({class1: true, class2: false}) === "class1"
   * @example classes(true, {class1: true, class2: false})
  */
 // Using overloads will make error not in certain argument but on all call - 'No overload found'
  (
    propagate_or_map_or_expression?: true | ToggleMap<ClassKeys>,
    map_or_expression?: [Extract<typeof propagate_or_map_or_expression, true>] extends [never]
    ? never
    : ToggleMap<ClassKeys>
  ) : ClassNamed & (
    withClassNames extends true
    ? {classnames: ClassNamesMap<ClassKeys>}
    : EmptyObject
  ) 
}

export default classNamingCtx

/**
 * @example const classes = classNamingCtx(this.props)
 * @example const classes = classNamingCtx({className, classnames})
 * @example const classes = classNamingCtx({classnames})
 */
function classNamingCtx<
  ClassKeys extends string,
  withClassNames extends boolean|undefined
>(
  {classnames, className}: ClassNamer<ClassKeys>,
  options: Readonly<ClassNamerOptions<withClassNames>> = EMPTY_OBJECT
) {
  return classNamer.bind({classnames, className, options, stacked: undefined}) as tClassNaming<ClassKeys, withClassNames>
}

type ClassNamerOptions<
  withClassNames extends undefined|boolean
> = Partial<{
  withClassNames: withClassNames
  // withSelf: boolean
}>

function classNamer<
  ClassKeys extends string,
  withClassNames extends boolean|undefined
>(
  this: ClassNamer<ClassKeys> & {
    options: Readonly<ClassNamerOptions<withClassNames>>
    stacked: string|undefined
  },
  arg0?: true | ToggleMap<ClassKeys>,
  arg1?: typeof arg0 extends true ? ToggleMap<ClassKeys> : never,
): ClassNamed & Partial<Pick<typeof this, "classnames">> {
  const {
    className: propagated,
    classnames,
    stacked: preStacked,
    options
  } = this
  , {
    withClassNames,
    // withSelf
  } = options
  , withPropagation = arg0 === true
  
  , source = typeof arg0 === "object" ? arg0 : arg1
  , allowed = source && resolver(classnames, source)
  , stacked = joinWithLead(preStacked, allowed)
  , className = joinWithLead(withPropagation && propagated, stacked)
  , host = classNamer.bind({classnames, className, options, stacked})

  emptize(classnames)

  withClassNames && (
    //@ts-expect-error
    host["classnames"] = classnames
  )
  return wrapper(
    host,
    className,
  )
}   
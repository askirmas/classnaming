import { classBeming, setOptions } from "./bem";
import type { ClassHash } from "./definitions.types";
import type { ClassNamed, ClassNamesProperty } from "./main.types";

describe("contexting", () => {
  describe("empty", () => {
    const bem = classBeming()

    it("1", () => expect(bem({
      block1: true,
      block2__el: true
    })).toStrictEqual({
      className: "block1 block2__el"
    }))
  })

  describe("full", () => {
    const bem = classBeming({
      className: "propagated",
      classnames: {
        block1: "hash1",
        block2__el: "hash2"
      }
    })

    it("1", () => expect(bem(true, {
      block1: true,
      block2__el: true
    })).toStrictEqual({
      className: "propagated hash1 hash2"
    }))
  })
})

it("TS UX", () => {
  type ClassProps = ClassNamed & ClassNamesProperty<Record<
    |"block1--m1"
    |"block1--m2--v1"
    |"block1--m2--v2"
    |"block1__el1--m1"
    |"block1__el1--m2--v1"
    |"block1__el1--m2--v2"
    |"block2"
  , ClassHash>>

    const bem = classBeming<ClassProps>()
    , check = {
      1: bem(true, {
        block1: {m2: "v1"},
        block1__el1: [false && "m1"],
      })
    }

    expect(check).toBeInstanceOf(Object)
})

it("cover reexported", () => expect(setOptions).toThrow())

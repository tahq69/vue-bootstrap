import Utils from "@/Utils"

export type ColType = "control" | "lablel"
export type ColSize = "lg" | "md" | "sm" | "xs"
export type ColSizes = { [size in ColSize]: number }

export default class ColCalculator {
  public static getClasses(
    type: ColType,
    sizes: ColSizes,
    initial: string[] = [],
    withOffset = false
  ): string[] {
    Object.keys(sizes).forEach(size => {
      const media = size as ColSize
      const value = sizes[size as ColSize]
      if (value > 0) {
        const classes =
          type === "control"
            ? ColCalculator.controlClass(value, media, withOffset)
            : ColCalculator.labelClass(value, media)
        initial.push(classes)
      }
    })

    return initial
  }

  private static controlClass(size: number, media: ColSize, withOffset: boolean): string {
    const control = ColCalculator.colClass(size, media)

    if (withOffset) {
      const offset = ColCalculator.colClass(ColCalculator.offset(size), media, true)
      return `${control} ${offset}`
    }

    return control
  }

  private static labelClass(size: number, media: ColSize): string {
    return ColCalculator.colClass(ColCalculator.offset(size), media)
  }

  private static colClass(size: number, media: ColSize, offset = false) {
    const template = offset ? "col-{media}-offset-{size}" : "col-{media}-{size}"

    return Utils.supplant(template, { media, size })
  }

  private static offset(size: number) {
    const availableSpace = 12 - size

    if (availableSpace === 0) return 0

    return availableSpace
  }
}

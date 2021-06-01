/**
 * Recursive Partial taken from here: https://stackoverflow.com/a/51365037
 */
export declare type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends Record<string, unknown>
    ? RecursivePartial<T[P]>
    : T[P];
};

export type ResponsiveProp<PropType> =
  | PropType
  | [PropType]
  | [PropType, PropType]
  | [PropType, PropType, PropType];

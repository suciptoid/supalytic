export type ArrayElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

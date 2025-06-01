export type TVoidCallback = () => void;

export type TOneParamCallback<T> = (val: T) => void;

export type TTwoParamCallback<T, K> = (paramOne: T, paramTwo: K) => void;

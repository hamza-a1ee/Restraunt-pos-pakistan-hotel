export function throwError(key: string = "React query") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (error: any) => {
    console.log(`${key} error`, error);

    // toast.error(parseError(error));
  };
}

const delay = (ms: number) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(ms);
    }, ms),
  );
};

const mapSyncWithDelay = async <T, U>(
  targets: Array<T>,
  callbackFn: (target: T) => Promise<U>,
  ms: number,
): Promise<U[]> => {
  return targets.reduce(
    async (promise: Promise<U[]>, target: T): Promise<U[]> => {
      const collection = await promise;
      await delay(ms);

      const result = await callbackFn(target);

      return [...collection, result];
    },
    Promise.resolve([]),
  );
};

export { delay, mapSyncWithDelay };

export default (from: string, rates: string, converteBack: boolean) => {
  if (converteBack) {
    const convertTo = (+from * +rates).toFixed(2);
    return convertTo;
  }
  const convertTo = (+from / +rates).toFixed(2);
  return convertTo;
};

export const mapResult = (value: unknown): Result => {
  const type = typeof value;
  switch (type) {
    case 'object':
      return {
        type,
        value: value as object,
      }
    default:
      return {
        type: 'unknown',
        value: `${value}`,
      }
  }
}
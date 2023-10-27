export const mapResult = (value: unknown): Result => {
  const type = typeof value;
  switch (type) {
    case 'object':
      return {
        type,
        value: JSON.stringify(value, null, 2),
      }
    default:
      return {
        type: 'unknown',
        value: `${value}`,
      }
  }
}
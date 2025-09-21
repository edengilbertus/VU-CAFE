export function formatUGX(value: number): string {
  try {
    if (typeof value !== 'number' || Number.isNaN(value)) return 'UGX 0';
    const formatter = new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  } catch (e) {
    console.log('formatUGX error', e);
    return `UGX ${Math.round(value).toLocaleString('en-UG')}`;
  }
}

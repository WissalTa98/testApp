export interface TableTokens {
  colorPrimary?: string;
  colorPrimaryHover?: string;
  colorAccent?: string;
  colorBackground?: string;
  colorSurface?: string;
  colorBorder?: string;
  colorBorderLight?: string;
  colorText?: string;
  colorTextSecondary?: string;
  colorTextPlaceholder?: string;
  colorRowHover?: string;
  colorSpinnerTrack?: string;
  colorStatusInStock?: string;
  colorStatusInStockBg?: string;
  colorStatusLowStock?: string;
  colorStatusLowStockBg?: string;
  colorStatusOutOfStock?: string;
  colorStatusOutOfStockBg?: string;
  borderRadius?: string;
  cellPaddingX?: string;
  cellPaddingY?: string;
  headerPaddingY?: string;
  toolbarPadding?: string;
  gap?: string;
  fontFamily?: string;
}

const TOKEN_TO_CSS: ReadonlyArray<[keyof TableTokens, string]> = [
  ['colorPrimary',          '--dt-color-primary'],
  ['colorPrimaryHover',     '--dt-color-primary-hover'],
  ['colorAccent',           '--dt-color-accent'],
  ['colorBackground',       '--dt-color-background'],
  ['colorSurface',          '--dt-color-surface'],
  ['colorBorder',           '--dt-color-border'],
  ['colorBorderLight',      '--dt-color-border-light'],
  ['colorText',             '--dt-color-text'],
  ['colorTextSecondary',    '--dt-color-text-secondary'],
  ['colorTextPlaceholder',  '--dt-color-text-placeholder'],
  ['colorRowHover',         '--dt-color-row-hover'],
  ['colorSpinnerTrack',     '--dt-color-spinner-track'],
  ['colorStatusInStock',    '--dt-color-in-stock'],
  ['colorStatusInStockBg',  '--dt-color-in-stock-bg'],
  ['colorStatusLowStock',   '--dt-color-low-stock'],
  ['colorStatusLowStockBg', '--dt-color-low-stock-bg'],
  ['colorStatusOutOfStock',   '--dt-color-out-of-stock'],
  ['colorStatusOutOfStockBg', '--dt-color-out-of-stock-bg'],
  ['borderRadius',          '--dt-radius'],
  ['cellPaddingX',          '--dt-cell-px'],
  ['cellPaddingY',          '--dt-cell-py'],
  ['headerPaddingY',        '--dt-header-py'],
  ['toolbarPadding',        '--dt-toolbar-padding'],
  ['gap',                   '--dt-gap'],
  ['fontFamily',            '--dt-font-family'],
];

export function tokensToCssVars(tokens: TableTokens): Record<string, string> {
  const styles: Record<string, string> = {};
  for (const [prop, cssVar] of TOKEN_TO_CSS) {
    const value = tokens[prop];
    if (value !== undefined) {
      styles[cssVar] = value;
    }
  }
  return styles;
}
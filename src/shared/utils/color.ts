type DecomposedColor = { type: string; values: number[]; colorSpace?: string };

/**
 * Converts a color object with type and values to a string.
 * @returns {string} A CSS color string
 */
export function recomposeColor(color: DecomposedColor) {
  const { type, colorSpace } = color;
  let { values } = color;

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    values = values.map((n, i) => (i < 3 ? parseInt(n, 10) : n));
  } else if (type.indexOf('hsl') !== -1) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    values[1] = `${values[1]}%`;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    values[2] = `${values[2]}%`;
  }
  if (type.indexOf('color') !== -1) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    values = `${colorSpace} ${values.join(' ')}`;
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    values = `${values.join(', ')}`;
  }

  return `${type}(${values})`;
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 *  @returns A CSS rgb color string
 */
export function hexToRgb(
  /** Hex color, i.e. #nnn or #nnnnnn */
  color: string
): string {
  color = color.slice(1);

  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');
  let colors = color.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }

  return colors
    ? `rgb${colors.length === 4 ? 'a' : ''}(${colors
        .map((n, index) => {
          return index < 3
            ? parseInt(n, 16)
            : Math.round((parseInt(n, 16) / 255) * 1000) / 1000;
        })
        .join(', ')})`
    : '';
}

/**
 * Returns an object with the type and values of a color.
 * Note: Does not support rgb % values.
 */
export function decomposeColor<T>(
  /** CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color() */
  color: string
): DecomposedColor {
  // Idempotent
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (color.type) {
    return color as unknown as DecomposedColor;
  }

  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf('(');
  const type = color.substring(0, marker);

  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(type) === -1) {
    throw new Error(
      `Unsupported ${color} color
      The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
    );
  }

  let values = color.substring(marker + 1, color.length - 1);
  let colorSpace;

  if (type === 'color') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    values = values.split(' ');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    colorSpace = values.shift();
    if (values.length === 4 && values[3].charAt(0) === '/') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      values[3] = values[3].slice(1);
    }
    if (
      ['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(
        colorSpace
      ) === -1
    ) {
      throw new Error(
        `unsupported ${colorSpace} color space.
        The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`
      );
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    values = values.split(',');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  values = values.map((value) => parseFloat(value));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return { type, values, colorSpace };
}

/**
 * Converts a color from hsl format to rgb format.
 * @returns rgb color values
 */
export function hslToRgb(
  /** HSL color values */
  color: string
): string {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const dColor = decomposeColor(dColor);
  const { values } = dColor;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const f = (n, k = (n + h / 30) % 12) =>
    l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  let type = 'rgb';
  const rgb = [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255),
  ];

  if (dColor.type === 'hsla') {
    type += 'a';
    rgb.push(values[3]);
  }

  return recomposeColor({ type, values: rgb });
}

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @returns The relative brightness of the color in the range 0 - 1
 */
export function getLuminance(
  /** CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color() */
  color: string
): number {
  const dColor = decomposeColor(color);

  let rgb =
    dColor.type === 'hsl' || dColor.type === 'hsla'
      ? decomposeColor(hslToRgb(dColor as any)).values
      : dColor.values;
  rgb = rgb.map((val) => {
    if (dColor.type !== 'color') {
      val /= 255; // normalized
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });

  // Truncate at 3 digits
  return Number(
    (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3)
  );
}

/**
 * Calculates the contrast ratio between two colors.
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @returns A contrast ratio value in the range 0 - 21.
 */
export function getContrastRatio(
  /**CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla() */
  foreground: string,
  /**CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla() */
  background: string
): number {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

// Use similar logicgetContrastText as
// Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
// and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
export function getContrastText(background: string, contrastThreshold = 7) {
  const colorLight = '#ffffff';
  const colorDark = '#000000';

  const contrastRatio = getContrastRatio(background, 'rgb(0,0,0)');
  const contrastText =
    contrastRatio >= contrastThreshold ? colorDark : colorLight;

  if (process.env.NODE_ENV !== 'production') {
    const contrast = getContrastRatio(background, contrastText);
    if (contrast < 3) {
      console.error(
        [
          `MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`,
          'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
          'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
        ].join('\n')
      );
    }
  }

  return contrastText;
}

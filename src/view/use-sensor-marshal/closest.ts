const supportedMatchesName: string = ((): string => {
  const base = 'matches';

  // Server side rendering
  if (typeof document === 'undefined') {
    return base;
  }

  // See https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  const candidates: string[] = [
    base,
    'msMatchesSelector',
    'webkitMatchesSelector',
  ];

  const value = candidates.find((name): boolean => name in Element.prototype);

  return value || base;
})();

function closestPonyfill(el: Element | null, selector: string) {
  if (el == null) {
    return null;
  }

  // Element.prototype.matches is supported in ie11 with a different name
  // https://caniuse.com/#feat=matchesselector
  if (el[supportedMatchesName](selector)) {
    return el;
  }

  // recursively look up the tree
  return closestPonyfill(el.parentElement, selector);
}

export default function closest(el: Element, selector: string): Element | null {
  // Using native closest for maximum speed where we can
  if (el.closest) {
    return el.closest(selector);
  }
  // ie11: damn you!
  return closestPonyfill(el, selector);
}

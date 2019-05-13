// @flow
import invariant from 'tiny-invariant';
import type { Position } from 'css-box-model';

export function isDragging(el: HTMLElement): boolean {
  return el.getAttribute('data-is-dragging') === 'true';
}

export function isDropAnimating(el: HTMLElement): boolean {
  return el.getAttribute('data-is-drop-animating') === 'true';
}

export function getOffset(el: HTMLElement): Position {
  const style: CSSStyleDeclaration = el.style;

  const transform: string = style.transform;
  if (!transform) {
    return { x: 0, y: 0 };
  }

  const regex: RegExp = /translate\((\d+)px, (\d+)px\)/;

  const result = transform.match(regex);
  invariant(result, 'Unable to formate translate');

  return {
    x: Number(result[1]),
    y: Number(result[2]),
  };
}
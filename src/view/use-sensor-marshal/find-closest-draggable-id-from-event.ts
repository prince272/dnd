import type { ContextId, DraggableId } from '../../types';
import * as attributes from '../data-attributes';
import isElement from '../is-type-of-element/is-element';
import isHtmlElement from '../is-type-of-element/is-html-element';
import closest from './closest';
import { warning } from '../../dev-warning';

function getSelector(contextId: ContextId): string {
  return `[${attributes.dragHandle.contextId}="${contextId}"]`;
}

function findClosestDragHandleFromEvent(
  contextId: ContextId,
  event: Event,
): HTMLElement | null {
  const target: EventTarget | null = event.target;

  if (!isElement(target)) {
    warning('event.target must be a Element');
    return null;
  }

  const selector: string = getSelector(contextId);
  const handle: Element | null = closest(target, selector);

  if (!handle) {
    return null;
  }

  if (!isHtmlElement(handle)) {
    warning('drag handle must be a HTMLElement');
    return null;
  }

  return handle;
}

export default function tryGetClosestDraggableIdFromEvent(
  contextId: ContextId,
  event: Event,
): DraggableId | null {
  const handle: HTMLElement | null = findClosestDragHandleFromEvent(
    contextId,
    event,
  );

  if (!handle) {
    return null;
  }

  return handle.getAttribute(attributes.dragHandle.draggableId);
}

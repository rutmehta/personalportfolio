import type { TimelineNode } from '@/data/timeline';

/** Convert year/month to a comparable number */
export function toMonths(year: number, month: number): number {
  return year * 12 + month;
}

/** Position (0–100) on the timeline for a given year/month */
export function getPosition(
  year: number,
  month: number,
  startMonths: number,
  totalMonths: number
): number {
  const months = toMonths(year, month);
  return ((months - startMonths) / totalMonths) * 100;
}

/** True if the node has no end date (point-in-time event) */
export function isPointEvent(node: TimelineNode): boolean {
  return node.endYear == null && node.endMonth == null;
}

/** Effective end for layout: point events get 1 month span for lane packing */
export function getEffectiveEnd(node: TimelineNode): { year: number; month: number } {
  if (node.endYear != null && node.endMonth != null) {
    return { year: node.endYear, month: node.endMonth };
  }
  const nextMonth = node.month === 12 ? 1 : node.month + 1;
  const nextYear = node.month === 12 ? node.year + 1 : node.year;
  return { year: nextYear, month: nextMonth };
}

export interface TimelineBounds {
  startMonths: number;
  totalMonths: number;
  years: number[];
}

export function getTimelineBounds(startYear: number, endYear: number): TimelineBounds {
  const startMonths = toMonths(startYear, 1);
  const endMonths = toMonths(endYear, 12);
  const totalMonths = endMonths - startMonths;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  return { startMonths, totalMonths, years };
}

export type NodeWithLane = TimelineNode & { lane: number };

/** Assign lanes using effective end so point events don't overlap */
export function assignLanes(nodes: TimelineNode[]): NodeWithLane[] {
  const sorted = [...nodes].sort(
    (a, b) => toMonths(a.year, a.month) - toMonths(b.year, b.month)
  );
  const lanes: { endMonth: number }[] = [];

  return sorted.map((node) => {
    const nodeStart = toMonths(node.year, node.month);
    const effective = getEffectiveEnd(node);
    const nodeEnd = toMonths(effective.year, effective.month);

    let laneIndex = lanes.findIndex((lane) => lane.endMonth < nodeStart - 1);
    if (laneIndex === -1) {
      laneIndex = lanes.length;
      lanes.push({ endMonth: nodeEnd });
    } else {
      lanes[laneIndex].endMonth = nodeEnd;
    }
    return { ...node, lane: laneIndex };
  });
}

const POINT_EVENT_MIN_WIDTH_PCT = 2;
const MIN_SPAN_WIDTH_PCT = 1;

export interface BarLayout {
  left: number;
  width: number;
}

/** Left % and width % for a bar; point events get a small fixed minimum width */
export function getBarLayout(
  node: TimelineNode,
  startMonths: number,
  totalMonths: number
): BarLayout {
  const left = getPosition(node.year, node.month, startMonths, totalMonths);
  const effective = getEffectiveEnd(node);
  const right = getPosition(effective.year, effective.month, startMonths, totalMonths);
  const rawWidth = right - left;
  const minWidth = isPointEvent(node) ? POINT_EVENT_MIN_WIDTH_PCT : MIN_SPAN_WIDTH_PCT;
  const width = Math.max(rawWidth, minWidth);
  return { left, width };
}

export interface ConnectionCoord {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** Connection line coordinates relative to container */
export function getConnectionCoords(
  hoveredId: string,
  relatedIds: string[],
  nodePositions: Record<string, DOMRect>,
  containerRect: DOMRect
): ConnectionCoord[] {
  const fromRect = nodePositions[hoveredId];
  if (!fromRect) return [];

  return relatedIds
    .filter((id) => nodePositions[id])
    .map((id) => {
      const toRect = nodePositions[id]!;
      return {
        id,
        x1: fromRect.left + fromRect.width / 2 - containerRect.left,
        y1: fromRect.top + fromRect.height / 2 - containerRect.top,
        x2: toRect.left + toRect.width / 2 - containerRect.left,
        y2: toRect.top + toRect.height / 2 - containerRect.top,
      };
    });
}

/** Quadratic bezier path for a curved connection (bows upward between points) */
export function getCurvedPathD(x1: number, y1: number, x2: number, y2: number): string {
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - 28;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

/** Filter nodes that overlap the given year range (inclusive) */
export function filterNodesInRange(
  nodes: TimelineNode[],
  startYear: number,
  endYear: number
): TimelineNode[] {
  const rangeStartMonths = toMonths(startYear, 1);
  const rangeEndMonths = toMonths(endYear, 12);
  return nodes.filter((node) => {
    const nodeStart = toMonths(node.year, node.month);
    const effective = getEffectiveEnd(node);
    const nodeEnd = toMonths(effective.year, effective.month);
    return nodeStart <= rangeEndMonths && nodeEnd >= rangeStartMonths;
  });
}

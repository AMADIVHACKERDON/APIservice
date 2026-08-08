"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Layers, Sparkles, Tag, ZoomIn, ZoomOut, Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GraphData, GraphNode } from "@/lib/graph-types";

interface Positioned extends GraphNode {
  x: number;
  y: number;
  ring: number;
}

const RING_X = 300;
const RING_Y = 190;

function layout(data: GraphData, focusId: string | null): Positioned[] {
  const adjacency = new Map<string, string[]>();
  for (const n of data.nodes) adjacency.set(n.id, []);
  for (const e of data.edges) {
    adjacency.get(e.source)?.push(e.target);
    adjacency.get(e.target)?.push(e.source);
  }

  const sorted = [...data.nodes].sort((a, b) => b.degree - a.degree);
  const root = focusId && adjacency.has(focusId) ? focusId : sorted[0]?.id;
  if (!root) return [];

  // BFS rings from the focus node
  const ring = new Map<string, number>([[root, 0]]);
  const queue = [root];
  while (queue.length) {
    const current = queue.shift()!;
    for (const next of adjacency.get(current) ?? []) {
      if (!ring.has(next)) {
        ring.set(next, (ring.get(current) ?? 0) + 1);
        queue.push(next);
      }
    }
  }
  let orphanRing = Math.max(0, ...ring.values()) + 1;
  for (const n of data.nodes) {
    if (!ring.has(n.id)) ring.set(n.id, orphanRing);
  }
  orphanRing = 0;

  const byRing = new Map<number, GraphNode[]>();
  for (const n of data.nodes) {
    const r = ring.get(n.id) ?? 0;
    byRing.set(r, [...(byRing.get(r) ?? []), n]);
  }

  const positioned: Positioned[] = [];

  for (const [r, nodes] of [...byRing.entries()].sort((a, b) => a[0] - b[0])) {
    if (r === 0) {
      positioned.push({ ...nodes[0], x: 0, y: 0, ring: 0 });
      continue;
    }
    // Distribute nodes along the perimeter of a diamond (rhombus) of radius r
    const count = nodes.length;
    const a = RING_X * r;
    const b = RING_Y * r;
    nodes
      .slice()
      .sort((n1, n2) => n1.kind.localeCompare(n2.kind) || n1.label.localeCompare(n2.label))
      .forEach((n, i) => {
        const t = (i + 0.5) / count; // 0..1 around the rhombus
        const angle = t * Math.PI * 2 - Math.PI / 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const norm = Math.abs(cos) + Math.abs(sin); // rhombus (L1) instead of ellipse
        positioned.push({
          ...n,
          ring: r,
          x: (a * cos) / norm,
          y: (b * sin) / norm,
        });
      });
  }

  return positioned;
}

const KIND_STYLE: Record<
  GraphNode["kind"],
  { fill: string; stroke: string; text: string; icon: typeof Layers }
> = {
  solution: {
    fill: "fill-primary/15",
    stroke: "stroke-primary",
    text: "fill-foreground",
    icon: Sparkles,
  },
  category: {
    fill: "fill-secondary",
    stroke: "stroke-foreground/50",
    text: "fill-foreground",
    icon: Layers,
  },
  field: {
    fill: "fill-muted",
    stroke: "stroke-muted-foreground/60",
    text: "fill-muted-foreground",
    icon: Tag,
  },
};

export interface DiamondGraphProps {
  data: GraphData;
  focusId?: string | null;
  className?: string;
  height?: number;
}

export default function DiamondGraph({
  data,
  focusId = null,
  className,
  height = 560,
}: DiamondGraphProps) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<string | null>(null);
  const drag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(
    null,
  );

  const nodes = useMemo(() => layout(data, focusId), [data, focusId]);
  const positions = useMemo(
    () => new Map(nodes.map((n) => [n.id, n])),
    [nodes],
  );

  const maxRing = Math.max(1, ...nodes.map((n) => n.ring));
  const width = RING_X * maxRing * 2 + 320;
  const viewHeight = RING_Y * maxRing * 2 + 220;

  const navigate = useCallback(
    (node: GraphNode) => {
      router.push(
        node.kind === "solution"
          ? `/solutions/${node.slug}`
          : `/categories/${node.slug}`,
      );
    },
    [router],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setPan({
      x: drag.current.panX + (e.clientX - drag.current.x),
      y: drag.current.panY + (e.clientY - drag.current.y),
    });
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  if (!nodes.length) {
    return (
      <div
        className={cn(
          "grid place-items-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground",
          className,
        )}
        style={{ height }}
      >
        Nothing connected yet — add a solution in the admin portal.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card",
        className,
      )}
      style={{ height }}
    >
      <svg
        ref={svgRef}
        className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
        viewBox={`${-width / 2} ${-viewHeight / 2} ${width} ${viewHeight}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <g
          transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}
          style={{ transition: drag.current ? undefined : "transform 200ms ease" }}
        >
          {data.edges.map((e, i) => {
            const a = positions.get(e.source);
            const b = positions.get(e.target);
            if (!a || !b) return null;
            const active =
              hovered === e.source ||
              hovered === e.target ||
              focusId === e.source ||
              focusId === e.target;
            return (
              <line
                key={`${e.source}-${e.target}-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={cn(
                  "transition-all",
                  active ? "stroke-primary" : "stroke-border",
                )}
                strokeWidth={active ? 2.4 : 1.2}
                strokeOpacity={active ? 0.95 : 0.6}
              />
            );
          })}

          {nodes.map((n) => {
            const style = KIND_STYLE[n.kind];
            const isFocus = n.id === focusId || (!focusId && n.ring === 0);
            const size = n.kind === "solution" ? 34 : 26;
            const label =
              n.label.length > 26 ? `${n.label.slice(0, 24)}…` : n.label;
            return (
              <g
                key={n.id}
                transform={`translate(${n.x} ${n.y})`}
                className="cursor-pointer"
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(n)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate(n);
                }}
              >
                {isFocus && (
                  <rect
                    x={-(size + 12)}
                    y={-(size + 12)}
                    width={(size + 12) * 2}
                    height={(size + 12) * 2}
                    transform="rotate(45)"
                    rx={10}
                    className="fill-primary/10 stroke-primary/60"
                    strokeWidth={1.5}
                  />
                )}
                <rect
                  x={-size}
                  y={-size}
                  width={size * 2}
                  height={size * 2}
                  transform="rotate(45)"
                  rx={8}
                  className={cn(
                    style.fill,
                    style.stroke,
                    "transition-all",
                    hovered === n.id && "fill-primary/30",
                  )}
                  strokeWidth={hovered === n.id ? 2.5 : 1.5}
                />
                <text
                  y={size + 34}
                  textAnchor="middle"
                  className={cn(
                    "pointer-events-none select-none text-[15px] font-medium",
                    style.text,
                  )}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div className="absolute right-3 top-3 flex flex-col gap-1.5">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
          className="grid size-8 place-items-center rounded-md border border-border bg-background/90 text-muted-foreground transition hover:text-foreground"
        >
          <ZoomIn className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => setZoom((z) => Math.max(0.4, z - 0.2))}
          className="grid size-8 place-items-center rounded-md border border-border bg-background/90 text-muted-foreground transition hover:text-foreground"
        >
          <ZoomOut className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Recenter"
          onClick={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
          className="grid size-8 place-items-center rounded-md border border-border bg-background/90 text-muted-foreground transition hover:text-foreground"
        >
          <Crosshair className="size-4" />
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-lg border border-border bg-background/85 px-3 py-2 text-xs text-muted-foreground backdrop-blur">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rotate-45 rounded-[2px] border border-primary bg-primary/20" />
          Solution
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rotate-45 rounded-[2px] border border-foreground/50 bg-secondary" />
          Category
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rotate-45 rounded-[2px] border border-muted-foreground/60 bg-muted" />
          Field
        </span>
      </div>
    </div>
  );
}

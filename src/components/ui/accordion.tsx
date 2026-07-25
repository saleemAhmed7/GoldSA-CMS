"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/cn";

// Accordion
export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultExpandedIds?: string[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  defaultExpandedIds = [],
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpandedIds);

  function toggleItem(id: string) {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds(allowMultiple ? [...expandedIds, id] : [id]);
    }
  }

  return (
    <div className={cn("flex flex-col border-y border-border divide-y divide-border w-full", className)}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);
        return (
          <div key={item.id} className="flex flex-col">
            <button
              type="button"
              aria-expanded={isExpanded}
              disabled={item.disabled}
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between py-4 text-left font-interface text-body-default font-medium text-foreground hover:text-brand-gold-polished transition-colors disabled:opacity-40"
            >
              <span>{item.title}</span>
              <svg
                className={cn("size-4 text-muted transition-transform duration-standard", isExpanded && "rotate-180")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isExpanded && (
              <div className="pb-4 text-body-small text-muted animate-in fade-in duration-standard">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// TreeView
export interface TreeNode {
  id: string;
  label: ReactNode;
  children?: TreeNode[];
}

export interface TreeViewProps {
  data: TreeNode[];
  onSelect?: (node: TreeNode) => void;
  className?: string;
}

export function TreeView({ data, onSelect, className }: TreeViewProps) {
  return (
    <div className={cn("flex flex-col gap-1 w-full text-body-small", className)}>
      {data.map((node) => (
        <TreeNodeItem key={node.id} node={node} onSelect={onSelect} level={0} />
      ))}
    </div>
  );
}

function TreeNodeItem({
  node,
  onSelect,
  level,
}: {
  node: TreeNode;
  onSelect?: (node: TreeNode) => void;
  level: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = Boolean(node.children && node.children.length > 0);

  return (
    <div className="flex flex-col">
      <div
        onClick={() => {
          if (hasChildren) setIsOpen(!isOpen);
          onSelect?.(node);
        }}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        className="flex items-center gap-2 rounded-sm py-1.5 pr-2 cursor-pointer hover:bg-accent-subtle hover:text-brand-gold-polished"
      >
        {hasChildren ? (
          <svg className={cn("size-3.5 text-muted transition-transform", isOpen && "rotate-90")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        ) : (
          <span className="size-3.5 inline-block" />
        )}
        <span className="font-medium text-foreground">{node.label}</span>
      </div>
      {isOpen && hasChildren && (
        <div className="flex flex-col">
          {node.children!.map((child) => (
            <TreeNodeItem key={child.id} node={child} onSelect={onSelect} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

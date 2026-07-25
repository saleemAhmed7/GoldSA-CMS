"use client";

import type { ChangeEvent, DragEvent } from "react";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxSizeMB?: number;
  onFilesSelected?: (files: File[]) => void;
  className?: string;
  label?: string;
}

export function FileUpload({
  accept,
  multiple = false,
  disabled = false,
  maxSizeMB = 10,
  onFilesSelected,
  className,
  label = "Choose files to upload",
}: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    const files = Array.from(e.target.files);
    validateAndEmit(files);
  }

  function validateAndEmit(files: File[]) {
    setError(null);
    const valid: File[] = [];
    for (const f of files) {
      if (f.size > maxSizeMB * 1024 * 1024) {
        setError(`File ${f.name} exceeds maximum size of ${maxSizeMB}MB`);
        return;
      }
      valid.push(f);
    }
    setSelectedFiles(valid);
    onFilesSelected?.(valid);
  }

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <label className="inline-flex items-center gap-2 cursor-pointer w-fit">
        <span className="rounded-sm border border-brand-gold-muted bg-transparent px-4 py-2 text-action-button text-brand-gold-muted hover:border-brand-gold-polished hover:text-brand-gold-polished hover:bg-accent-subtle transition-colors">
          {label}
        </span>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {error && <span className="text-body-small text-semantic-error">{error}</span>}

      {selectedFiles.length > 0 && (
        <ul className="flex flex-col gap-1 mt-1">
          {selectedFiles.map((file, idx) => (
            <li key={`${file.name}-${idx}`} className="flex items-center justify-between text-body-small text-muted border-b border-border py-1">
              <span className="truncate max-w-xs">{file.name}</span>
              <span className="text-label-meta">{(file.size / 1024).toFixed(1)} KB</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function DragDropUpload({
  accept,
  multiple = false,
  disabled = false,
  onFilesSelected,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    if (disabled || !e.dataTransfer.files?.length) return;
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected?.(files);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col items-center justify-center p-8 rounded-sm border-2 border-dashed border-border bg-surface text-center transition-colors duration-standard",
        isDragging && "border-brand-gold-polished bg-accent-subtle",
        disabled && "opacity-40 cursor-not-allowed",
        className,
      )}
    >
      <svg className="size-10 text-brand-gold-muted mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <p className="text-body-default font-medium text-foreground">Drag and drop files here</p>
      <p className="text-body-small text-muted mt-1">Or browse files from your computer</p>
      <FileUpload accept={accept} multiple={multiple} disabled={disabled} onFilesSelected={onFilesSelected} className="mt-4" />
    </div>
  );
}

export type { FileUploadProps };

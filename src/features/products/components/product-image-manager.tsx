"use client";

import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { PlusIcon, Progress, Typography } from "@/components/ui";
import { deleteStorageFile, uploadProductImage } from "../api/products-storage";

export interface ProductImageManagerProps {
  images: string[];
  onChange: (newImages: string[]) => void;
  productId?: string;
}

interface UploadTask {
  id: string;
  file: File;
  progress: number;
  status: "compressing" | "uploading" | "completed" | "error";
  error?: string;
}

export function ProductImageManager({
  images,
  onChange,
  productId = "temp",
}: ProductImageManagerProps) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadTasks, setUploadTasks] = useState<UploadTask[]>([]);

  // Folder path in bucket: products/{productId}/
  const folderId = productId || `temp-${Date.now()}`;

  async function processAndUploadFiles(files: FileList | File[]) {
    const fileArray = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (fileArray.length === 0) return;

    // Prevent duplicates by checking file names against existing upload task IDs
    const newTasks: UploadTask[] = fileArray.map((file, idx) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${idx}`,
      file,
      progress: 10,
      status: "compressing",
    }));

    setUploadTasks((prev) => [...prev, ...newTasks]);

    const uploadedUrls: string[] = [];

    for (const task of newTasks) {
      // 1. Compression phase
      setUploadTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, progress: 30, status: "uploading" } : t))
      );

      // 2. Direct Supabase Storage Upload
      const result = await uploadProductImage(folderId, task.file, images.length + uploadedUrls.length);

      if (result.success && result.publicUrl) {
        uploadedUrls.push(result.publicUrl);
        setUploadTasks((prev) =>
          prev.map((t) =>
            t.id === task.id ? { ...t, progress: 100, status: "completed" } : t
          )
        );
      } else {
        setUploadTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? { ...t, status: "error", error: result.error || "Upload failed" }
              : t
          )
        );
      }
    }

    if (uploadedUrls.length > 0) {
      onChange([...images, ...uploadedUrls]);
    }

    // Clean completed tasks after delay
    setTimeout(() => {
      setUploadTasks((prev) => prev.filter((t) => t.status !== "completed"));
    }, 2000);
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      processAndUploadFiles(e.target.files);
    }
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      processAndUploadFiles(e.dataTransfer.files);
    }
  }

  async function handleRemoveImage(index: number) {
    const targetUrl = images[index];
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);

    // If storage URL, clean up from Supabase Storage bucket
    if (targetUrl && targetUrl.includes("/storage/v1/object/public/products/")) {
      const pathParts = targetUrl.split("/storage/v1/object/public/products/");
      if (pathParts[1]) {
        await deleteStorageFile(pathParts[1]);
      }
    }
  }

  function handleSetPrimary(index: number) {
    if (index === 0) return;
    const target = images[index];
    const remaining = images.filter((_, i) => i !== index);
    onChange([target, ...remaining]);
  }

  function handleMoveLeft(index: number) {
    if (index === 0) return;
    const newImages = [...images];
    const temp = newImages[index - 1];
    newImages[index - 1] = newImages[index];
    newImages[index] = temp;
    onChange(newImages);
  }

  function handleMoveRight(index: number) {
    if (index === images.length - 1) return;
    const newImages = [...images];
    const temp = newImages[index + 1];
    newImages[index + 1] = newImages[index];
    newImages[index] = temp;
    onChange(newImages);
  }

  function handleRetryTask(task: UploadTask) {
    setUploadTasks((prev) => prev.filter((t) => t.id !== task.id));
    processAndUploadFiles([task.file]);
  }

  function handleCancelTask(taskId: string) {
    setUploadTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Upload Tasks Progress Section */}
      {uploadTasks.length > 0 && (
        <div className="flex flex-col gap-2 p-4 border border-brand-gold-muted/40 rounded-sm bg-accent-subtle/50">
          <Typography variant="labelMeta" tone="accent" className="font-semibold uppercase tracking-wider">
            {t("uploadingImagesTitle")}
          </Typography>
          {uploadTasks.map((task) => (
            <div key={task.id} className="flex flex-col gap-1.5 p-2 bg-surface rounded-xs border border-border text-body-small">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground truncate max-w-[240px]">
                  {task.file.name}
                </span>
                <span className="text-xs font-mono text-muted capitalize">
                  {task.status === "compressing" ? t("optimizingWebp") : `${task.progress}%`}
                </span>
              </div>
              <Progress value={task.progress} size="sm" variant="linear" />
              {task.status === "error" && (
                <div className="flex items-center justify-between text-semantic-error text-xs mt-1">
                  <span>{task.error}</span>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => handleRetryTask(task)} className="underline hover:text-foreground font-semibold">
                      {t("retryUpload")}
                    </button>
                    <button type="button" onClick={() => handleCancelTask(task.id)} className="underline opacity-80">
                      {t("cancelUpload")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-sm cursor-pointer transition-colors ${
          isDragOver
            ? "border-brand-gold-polished bg-accent-subtle/80 scale-[1.01]"
            : "border-border hover:border-brand-gold-muted/60 bg-surface"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="size-10 rounded-full bg-accent-subtle flex items-center justify-center text-brand-gold-polished mb-2">
          <PlusIcon className="size-5" />
        </div>
        <Typography variant="body" className="font-medium text-foreground text-center">
          {t("dragDropImages")}
        </Typography>
        <Typography variant="bodySmall" tone="muted" className="mt-1 text-center">
          {t("autoCompressNote")}
        </Typography>
      </div>

      {/* Uploaded Images Gallery Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {images.map((imgUrl, idx) => (
            <div
              key={`${imgUrl}-${idx}`}
              className="relative group aspect-square rounded-sm overflow-hidden border border-border bg-accent-subtle flex flex-col justify-between"
            >
              {/* Image element with lazy loading */}
              <img
                src={imgUrl}
                alt={`Product image ${idx + 1}`}
                loading="lazy"
                className="size-full object-cover"
              />

              {/* Primary Badge */}
              {idx === 0 ? (
                <span className="absolute top-2 left-2 bg-brand-gold-polished text-brand-obsidian text-[10px] font-semibold px-2 py-0.5 rounded-xs shadow-flat">
                  {t("primaryImage")}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSetPrimary(idx)}
                  className="absolute top-2 left-2 bg-black/70 hover:bg-brand-gold-polished hover:text-brand-obsidian text-white text-[10px] font-medium px-2 py-0.5 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {t("setPrimaryImage")}
                </button>
              )}

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-2 right-2 bg-semantic-error/90 hover:bg-semantic-error text-white rounded-full size-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold shadow-flat"
                title={t("deleteImage")}
              >
                ×
              </button>

              {/* Reorder Buttons Controls Overlay */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 p-1 rounded-xs backdrop-blur-xs">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMoveLeft(idx)}
                  className="text-white hover:text-brand-gold-polished disabled:opacity-30 text-xs font-bold px-1.5"
                  title={t("moveLeft")}
                >
                  ←
                </button>
                <span className="text-[10px] text-muted font-mono">#{idx + 1}</span>
                <button
                  type="button"
                  disabled={idx === images.length - 1}
                  onClick={() => handleMoveRight(idx)}
                  className="text-white hover:text-brand-gold-polished disabled:opacity-30 text-xs font-bold px-1.5"
                  title={t("moveRight")}
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

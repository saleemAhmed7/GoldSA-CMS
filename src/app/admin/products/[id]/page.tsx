"use client";

import { use } from "react";
import { ProductDetailsView } from "@/features/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  return <ProductDetailsView productId={resolvedParams.id} />;
}

"use client";

import { useRouter } from "next/navigation";

export function goBack() {
  const router = useRouter();

  router.back();
}
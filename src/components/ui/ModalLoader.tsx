import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

export const dynamicModalImport = (path: string) => dynamic(
  () => import(path),
  {
    // @ts-ignore - Next.js dynamic import types are incorrect
    suspense: true,
    loading: () => <Skeleton className="w-full h-96" />
  }
);
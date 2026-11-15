import HomepageSkeleton from '@/components/home/HomepageSkeleton';

/** Root loading boundary. Uses same skeleton as homepage Suspense fallback
 *  to prevent double-skeleton flash during client-side navigation. */
export default function Loading() {
  return <HomepageSkeleton />;
}

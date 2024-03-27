import { BSMapReview } from "@/interfaces/beatmap-review";
import { jsonWithCredentialFetcher } from "@/lib/fetcher";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20
const fetcher = (input: RequestInfo,init?: RequestInit) => jsonWithCredentialFetcher(input,init).then((res)=>res.docs)
export const usePagingBSUserReview = (userId:string) => {
    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
      } = useSWRInfinite(
        (index) => {
          return `/api/review/user/${userId}/${index}`
        },
        fetcher,
        
      );
      
    const reviews:BSMapReview[] = data ? [].concat(...data) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
    const isEmpty = data?.[0]?.length === 0;
    const loadMore = () => setSize(size + 1);
    const hasMore = data?.[data.length - 1]?.length === PAGE_SIZE;
    return {
        reviews,
        isLoadingMore,
        loadMore,
        isEmpty,
        isRefreshing,
        size,
        hasMore,
    }
}
import { BSPlaylist } from '@/interfaces/bs-playlist';
import { jsonFetcher, jsonWithCredentialFetcher } from '@/lib/fetcher';
import { use, useCallback, useEffect, useMemo, useState } from "react";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20
const fetcher = (input: RequestInfo,init?: RequestInit) => jsonFetcher(input,init).then((res)=>res.docs)

export interface PlaylistQueryParam {
    queryKey:string,
    curated?:boolean,
    verifiedMapper?: boolean,
    sortKey: string,
    minNps?:number,
    maxNps?:number,
    from?: string,
    to?: string,
}
const buildURL = (index:number,param:PlaylistQueryParam) => {
    const baseURL = `/api/playlists/search/${index}`
    let paramMap:any = {}
    if (param.verifiedMapper) {
        paramMap["verifiedMapper"] = true
    }
    if (param.curated) {
        paramMap["curated"] = true
    }
    if (param.queryKey!="") {
        paramMap["q"] = param.queryKey
    }
    if (param.sortKey=="") {
        paramMap["sortOrder"] = "Relevance"
    }else {
        paramMap["sortOrder"] = param.sortKey
    }
    if (param.minNps) {
        paramMap["minNps"] = param.minNps
    }
    if (param.maxNps) {
        paramMap["maxNps"] = param.maxNps
    }
    if (param.from) {
        paramMap["from"] = param.from
    }
    if (param.to) {
        paramMap["to"] = param.to
    }
    let keys = Object.keys(paramMap)
    let queryParam = "?"
    for (const k in keys) {
        queryParam += `${keys[k]}=${paramMap[keys[k]]}&`
    }
    return (baseURL + queryParam)
}

const defaultParam:PlaylistQueryParam = {
    sortKey:"Relevance",
    queryKey:""
}

export const usePagingBSPlaylist = () => {
    const [state,setState] = useState<PlaylistQueryParam>(defaultParam)
    const [storedState,setStoredState] = useState<PlaylistQueryParam>(defaultParam)
    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
      } = useSWRInfinite(
        (index) => buildURL(index, state),
        fetcher,
      );
    
    const playlists:BSPlaylist[] = data ? [].concat(...data) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
    const isEmpty = data?.[0]?.length === 0;
    const loadMore = () => setSize(size + 1);
    const hasMore = data?.[data.length - 1]?.length === PAGE_SIZE;
    const refresh = ()=> {
        setState(storedState)
    }
    const updateQuery = useCallback((param:PlaylistQueryParam)=> {
        setStoredState(param)
    },[setStoredState])
    return {
        playlists,
        "queryParam":storedState,
        isLoadingMore,
        refresh,
        loadMore,
        isEmpty,
        isRefreshing,
        size,
        hasMore,
        updateQuery
    }
}
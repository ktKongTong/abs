import { motion} from "framer-motion"
import React from 'react'
import {cn} from "@/lib/utils";
import SearchBar from "@/components/filter/base/SearchBar";
import SortOrder from "@/components/filter/base/order";
import FeatureFilter from "@/components/filter/map-filter/feature-filter";
import DateFilter from "@/components/filter/base/date-filter";
import RangeFilter from "@/components/filter/map-filter/range-filter";
import {MapQueryParam} from "@/interfaces/bsmap-query-param";
import {useLocaleFormat} from "@/hooks/useFormat";

interface MapFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  queryParam: MapQueryParam,
  onUpdateQueryParam: (searchParam:MapQueryParam) => void,
  onQuery: ()=>void,
  isQuerying: boolean
}
const MapFilter = React.forwardRef<HTMLDivElement, MapFilterProps>(
(
{
  queryParam,
  onUpdateQueryParam,
  onQuery,
  isQuerying,
  ...rest
} : MapFilterProps,
ref,
)=> {
  const {formatDate} = useLocaleFormat()
  return (
    <div
      ref={ref}
      {...rest}
      className={cn(
        rest.className,
        "md:flex items-center justify-between flex-wrap gap-1 grid grid-rows-2 grid-cols-10 align-middle justify-items-center",
      )}
    >
        <FeatureFilter
          className={"row-start-2 justify-self-start col-span-3"}
          queryParam={queryParam}
          onUpdateQueryParam={onUpdateQueryParam}
        />
        <RangeFilter
          queryParam={queryParam}
          updateQuery={onUpdateQueryParam}
          className={"row-start-1 col-span-4 justify-self-start"}
        />
        <DateFilter
          value={{
            from: queryParam.from? new Date(queryParam.from): undefined,
            to: queryParam.to? new Date(queryParam.to):undefined
          }}
          className={"row-start-1 col-span-6 justify-self-end"}
          onUpdateValue={
            (v)=>{
              onUpdateQueryParam({
                ...queryParam,
                from: formatDate(v?.from),
                to:formatDate(v?.to)
              })
            }
          }
        />
        <SortOrder
          order={queryParam.sortOrder}
          className={"row-start-2 justify-self-start col-span-3 col-start-4"}
          onUpdateOrder={(order)=>{
            onUpdateQueryParam({...queryParam,sortOrder:order})
          }}
        />
        <SearchBar
          className={'h-6  row-start-2 col-start-7 col-span-4 justify-self-end'}
          queryKey={queryParam.queryKey}
          onQueryKeyChange={(k) => {
            onUpdateQueryParam({
              ...queryParam,
              queryKey: k
            })
          }}
          onQuery={onQuery}
        />
    </div>
  )
})

MapFilter.displayName = 'MapFilter'

export default motion(MapFilter)
// 'use client'
import RankedIcon from "@/components/icons/RankedIcon";
import { BSUserWithStats } from "@/interfaces/beatsaver-user";
import { FaMapMarkedAlt } from "react-icons/fa";
import * as Progress from '@radix-ui/react-progress';
import  {Avatar} from "@/components/ui/avatar";
import {Tooltip} from "@/components/ui/tooltip";
import dayjs from "dayjs";
import { useCallback } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import {cn} from "@/lib/utils";
import {escapeHtml} from "@/lib/ContentEscape";

import {motion} from 'framer-motion'
import {ThumbDownCountLabel, ThumbUpCountLabel} from "@/components/shared/labels/BSMapMetaLabels";
import Link from "next/link";
import {useLocaleFormat} from "@/hooks/useFormat";
dayjs.extend(relativeTime);
const LabelWithIcon = ({children, label,tooltip}:{children:React.ReactNode,label:string, tooltip?:string}) => {
    return (
        <Tooltip content={tooltip?tooltip:""}>
            <span className="flex items-center text-xs space-x-1 cursor-default">
                {children}
              <span className="">{label}</span>
            </span>
        </Tooltip>
    )

}

const getDescription = (description:string) => {
    if (description.length == 0) {
        return "mapper didn't write anything";
    }
    return description;
}

export default function BSMapper(
    {
      bsUserWithStats,
      className
    }:{
      bsUserWithStats:BSUserWithStats,
      className?:string
    }
) {
  const computeRating = useCallback((like:number,dislike:number) => {
    if(like == 0 && dislike == 0){return 50}
    return (like/(like+dislike))*100.0;
  },[])
  const rating = computeRating(
    bsUserWithStats.stats.totalUpvotes? bsUserWithStats.stats.totalUpvotes : 0,
    bsUserWithStats.stats.totalDownvotes? bsUserWithStats.stats.totalDownvotes : 0
  );
  const {formatNumber} = useLocaleFormat()
    return (
      <>
        <motion.div className={cn("min-w-64 max-w-[300px] p-2", className)}>
          <motion.div className="flex">
            <Avatar
              src={bsUserWithStats.avatar}
              className="m-2 w-12 h-12"
              fallback={bsUserWithStats.name[0]}/>
            <div className="overflow-hidden">
              <Link href={`/mapper/${bsUserWithStats.id}`} className="overflow-hidden">
                <span className="text-lg text-ellipsis font-medium  animate-underline">
                  {bsUserWithStats.name}
                </span>
              </Link>
              <p
                className="overflow-ellipsis line-clamp-2 pr-2 text-xs text-gray-400"
                dangerouslySetInnerHTML={{__html: escapeHtml(getDescription(bsUserWithStats.description))}}
              />
            </div>
          </motion.div>
          <motion.div>
            <div className="flex justify-between">

              <LabelWithIcon tooltip="ranked map amount"
                             label={formatNumber(bsUserWithStats.stats?.rankedMaps ?? 0)}>
                <RankedIcon/>
              </LabelWithIcon>
              <LabelWithIcon tooltip="total map amount" label={formatNumber(bsUserWithStats.stats.totalMaps)}>
                <FaMapMarkedAlt/>
              </LabelWithIcon>
            </div>
            <div className="flex justify-between">
              <ThumbUpCountLabel count={bsUserWithStats.stats.totalUpvotes} tooltip="total up vote"/>
              <ThumbDownCountLabel count={bsUserWithStats.stats.totalDownvotes} tooltip="total down vote"/>
            </div>
            <div className="flex items-center justify-between">
              <Progress.Root className="relative overflow-hidden rounded-full w-full h-2 bg-gray-100"
                             value={rating}>
                <Progress.Indicator
                  className=" h-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500"
                  style={{transform: `translateX(-${100 - rating}%)`}}
                />
              </Progress.Root>
              <div className="pl-4 font-medium text-xs">{rating.toFixed(1)}%</div>
            </div>
          </motion.div>
          <motion.div className="flex justify-between">

            {
              bsUserWithStats.stats.firstUpload &&
                <Tooltip content="First Map Uploaded At">
                    <div
                        className="flex space-x-2  cursor-default text-gray-400 text-xs"
                    >Since: {dayjs(bsUserWithStats.stats.firstUpload).format('YYYY-MM-DD')}
                    </div>
                </Tooltip>
            }
            {
              bsUserWithStats.stats.lastUpload &&
                <Tooltip content="Last Map Uploaded At" asChild>
                    <div
                        className="flex space-x-2  cursor-default text-gray-400 text-xs"
                    >Last: {dayjs(bsUserWithStats.stats.lastUpload).fromNow()}
                    </div>
                </Tooltip>
            }
          </motion.div>
        </motion.div>
      </>
    )
}
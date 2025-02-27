import {motion} from 'framer-motion'
import {Avatar} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import React from "react";
import {BeatLeaderScore} from "@/interfaces/beatmap-rank";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {BLReplayPreviewIFrame} from "@/components/shared/MapPreviewIFrame";
import {IconButton} from "@/components/ui/button";
import {CiPlay1} from "react-icons/ci";
import Link from "@/components/ui/link";

const MotionTableRow= motion(TableRow)

interface LeaderBoardItemProps {
  score : BeatLeaderScore
}
const getPlayerURL = (id:string)=>{
  return `https://beatleader.xyz/u/${id}`
}
const LeaderBoardItem = React.forwardRef<HTMLTableRowElement, LeaderBoardItemProps>((
{
  score
}:LeaderBoardItemProps,
ref
) => {

  return (
      <MotionTableRow
        ref={ref} key={score.id}>
        <TableCell>
          <span>{score.rank}</span>
        </TableCell>
        <TableCell>
          <Link href={getPlayerURL(score.player.id)}>
            <div className={"flex space-x-1 items-center max-w-24 md:max-w-full"}>
                <Avatar src={score.player.avatar} className={"h-4 w-4"}/>
                <span className={'text-ellipsis line-clamp-1 break-all'}>{score.player.name}</span>
            </div>
          </Link>

        </TableCell>
        <TableCell>{score.modifiedScore}</TableCell>
        <TableCell className="hidden sm:table-cell">{score.modifiers}</TableCell>
        <TableCell>{(score.accuracy * 100).toFixed(2)} %</TableCell>
        <TableCell  className="hidden sm:table-cell">{score.pp}</TableCell>
        <TableCell  className="">
          <BLReplayPreviewIFrame id={score.id.toString()}>
            <IconButton
              className={cn("w-6 h-6 bg-transparent hover:text-red-400 rounded-full cursor-pointer")}
              variant="ghost">
              <CiPlay1/>
            </IconButton>
          </BLReplayPreviewIFrame>
        </TableCell>
      </MotionTableRow>
  )
})
LeaderBoardItem.displayName = "LeaderBoardItem"
export default motion(LeaderBoardItem)
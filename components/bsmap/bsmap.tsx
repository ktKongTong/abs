import {BSBeatMap, getBSMapCoverURL, getMaxNPS} from "@/interfaces/beatmap";
import React, {useMemo, useState} from "react";
import {Card} from "@/components/ui/card";
import BSUserLabel from "@/components/labels/BSUserLabel";
import * as MapMetaLabel from "@/components/labels/BSMapMetaLabels";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

import Link from "@/components/ui/link";
import * as MapDiffLabel from "@/components/labels/BSMapDiffLabels";
import {BSMapTagType, getMapTag} from "@/interfaces/mapTags";
import BSMapTag from "@/components/BSMapTag";
import {Progress} from "@/components/Progress";
import DiffCard from "@/components/bsmap/diffcard";
import {AnimatePresence, motion} from "framer-motion";
import {cn} from "@/lib/utils";
import BSMapOverviewHiddenInfo from "@/components/bsmap/hoverInfo";
import BSOpts from "@/components/bsmap/bsopts";
import ReviewList from "@/components/bsmap/reviewList";
import LeaderBoardList from "@/components/bsmap/leaderboardList";




const BSMap = (
  {
    bsMap,
    onContentUpdate,
    onSelect,
    mode = 'overview'
  }: {
    bsMap: BSBeatMap,
    onContentUpdate?: ()=>void,
    onSelect: ()=>void,
    mode?: 'overview' | 'detail'
  }) => {
  const bg = useMemo(()=>getBSMapCoverURL(bsMap),[bsMap])
  const score = useMemo(()=>bsMap.stats.score * 100,[bsMap.stats.score])
  const isDetailMode = useMemo(() => {
    return mode == 'detail'
  }, [mode])
  const imageVariant = {
    init: {
      opacity: 0,
    },
    loaded: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };
  return (
    <Card
      className={
        cn(
          ' min-w-[360px] max-w-[960px] relative mx-auto border-none shadow-none',
          isDetailMode ? `h-auto sm:h-auto p-4` : `h-[160px] sm:h-[200px]`,
          // "bg-transparent backdrop-blur"
        )
      }
    >
      <motion.div
        layout
        className={
          cn(
            'flex h-[160px] sm:h-[200px]',
            isDetailMode && `h-auto sm:h-auto flex-col justify-center sm:justify-start sm:flex sm:flex-row`
          )
        }
      >
      <motion.div
        layout
        className={
          cn(
            'aspect-square relative',
            'w-[160px] sm:w-[200px] group rounded-lg',
            isDetailMode && 'w-full aspect-square sm:w-[300px] rounded-lg basis-full max-w-[300px]'
          )
        }
      >
        <motion.img
          layout
          onLoad={imageLoaded}
          animate={{
            height: imageLoading ? "16rem" : "auto",
            opacity: imageLoading ? 0 : 1
          }}
          transition={{
            duration: 0.5
          }}
          loading="lazy" src={bg} className={cn(
          'object-cover',
                'w-[160px] sm:w-[200px] group rounded-lg absolute shadow-none border-none bg-transparent',
              isDetailMode && 'w-full aspect-square sm:w-[300px] rounded-lg basis-full max-w-[300px] relative'
        )}/>
        <BSMapOverviewHiddenInfo
          layout
          bsMap={bsMap}
          className={"absolute w-full"}
          isDetailMode={isDetailMode}
        />
      </motion.div>

        <motion.div
          layout
          className={
            cn('h-full ml-2 flex flex-col', isDetailMode && 'ml-0 sm:ml-2')
          }>
          <div className="overflow-ellipsis line-clamp-1 text-xl font-medium pr-2">
            <motion.div layout className="overflow-ellipsis break-all line-clamp-1 text-xl font-medium pr-2 cursor-pointer" onClick={onSelect}>
              {bsMap.name}
            </motion.div>
          </div>
          <motion.div layout className='flex items-center'>
            <BSUserLabel user={bsMap.uploader}/>
          </motion.div>
          <motion.div layout className='flex space-x-2'>

            <MapMetaLabel.BSIDLabel id={bsMap.id} className="cursor-pointer" tooltip="copy map id"/>

            {
              isDetailMode &&
                <MapMetaLabel.BSBPMLabel
                    bpm={bsMap.metadata.bpm}
                />
            }
            <MapMetaLabel.DurationLabel duration={bsMap.metadata.duration} tooltip={"duration of this map"}/>
            {
              !isDetailMode && <MapDiffLabel.BSNPSLabel nps={getMaxNPS(bsMap)} tooltip='max nps of this map'/>
            }
            {
              isDetailMode &&
                <MapMetaLabel.DateLabel
                    date={bsMap.createdAt}
                    tooltip={"create time of this map"}
                />
            }
          </motion.div>
          <ScrollArea>
            <div className='flex gap-1 p-1'>
              {
                bsMap.tags?.map((tag) => getMapTag(tag))
                  .filter((tag) => tag != undefined && (isDetailMode || tag.type == BSMapTagType.Style))
                  .map((tag) => {
                    return (
                      <BSMapTag className='text-nowrap font-medium text-xs' key={tag!.slug} tag={tag!}/>
                    )
                  })
              }
            </div>
            <ScrollBar orientation="horizontal" className={"translate-y-1"}/>
          </ScrollArea>
          <AnimatePresence key={bsMap.id + 'diff'}>
            {
              isDetailMode &&
                <motion.div layout className='grid w-fit grid-cols-3 items-center justify-center justify-items-center'>
                {
                  bsMap.versions[0]
                    .diffs
                    .map((diff) =>
                      <DiffCard
                        diff={diff}
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                          transition:{
                            duration: 1
                          }
                        }}
                        key={diff.characteristic + diff.difficulty + bsMap.id}
                        className={"text-zinc-200 shadow-md py-0.5 px-2"}
                      />
                  )
                }
                </motion.div>
            }
            {
              isDetailMode &&
                <motion.div
                    layout
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition:{
                        duration: 1
                      }
                    }}
                >
                    <BSOpts bsMap={bsMap} itemClassName={cn('text-black')} className={"justify-start mx-0 flex"}/>
                </motion.div>
            }
          </AnimatePresence>
          <motion.div layout className={cn("mt-auto mb-2", isDetailMode && 'space-x-2 flex')}>
            <motion.div layout className='flex items-center'>
              <Progress score={score}/>
              <motion.div layout className="pl-2 font-medium text-xs">{score.toFixed(1)}%</motion.div>
            </motion.div>
            <motion.div layout className='flex items-center space-x-2'>
              <div className='flex items-center space-x-2'>
                <MapMetaLabel.ThumbUpCountLabel count={bsMap.stats.upvotes} tooltip="up vote count"/>
                <MapMetaLabel.ThumbDownCountLabel count={bsMap.stats.downvotes}/>
              </div>
              {
                !isDetailMode && <MapMetaLabel.DateLabel date={bsMap.lastPublishedAt}/>
              }
            </motion.div>
          </motion.div>
          <AnimatePresence key={bsMap.id+'description'}>

            {
              isDetailMode &&
                <motion.div layout className={""}>
                    <span className={"font-medium"}>Description</span>
                    <div className={"text-xs p-2"}>
                        <p className={cn("text-ellipsis line-clamp-3 break-all")}>
                          {bsMap.description}
                        </p>
                    </div>
                </motion.div>
            }
          </AnimatePresence>
        </motion.div>
      </motion.div>
      {
        isDetailMode &&
          <motion.div
              layout
          >
              <motion.div>
                  <motion.div className={"flex space-x-2 items-center"}>
                      <span className={"font-medium"}>Reviews</span>
                      <span className={"opacity-30  text-xs"}>({bsMap.stats.reviews ?? 0})</span>
                  </motion.div>
                  <motion.div className={cn("text-xs")}>
                    {
                      bsMap.stats.reviews && <ReviewList mapId={bsMap.id} onContentUpdate={onContentUpdate}/>
                    }
                    {
                      !bsMap.stats.reviews && <p>still no review now 😲</p>
                    }
                  </motion.div>
              </motion.div>
              <motion.div>
                  <motion.div className={"flex space-x-2 items-center"}>
                      <span className={"font-medium"}>Leaderboard</span>
                      <span className={"opacity-30  text-xs"}>({bsMap.stats.reviews ?? 0})</span>
                  </motion.div>
                  <motion.div>
                    {
                      <LeaderBoardList
                        onContentUpdate={onContentUpdate}
                        hash={bsMap.versions[0].hash}
                        mode={bsMap.versions[0].diffs[0].characteristic}
                        difficulty={bsMap.versions[0].diffs[0].difficulty}
                      />
                    }
                  </motion.div>
              </motion.div>
          </motion.div>
      }
    </Card>
  )
}

export default React.memo(BSMap)
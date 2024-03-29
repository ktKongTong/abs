import BSLabel, {LabelProps} from "@/components/shared/labels/BSLabel";
import {CiCalendarDate, CiStar, CiTimer} from "react-icons/ci";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import {PiHeartbeat} from "react-icons/pi";
import {IoKeyOutline} from "react-icons/io5";
import {useLocaleFormat} from "@/hooks/useFormat";

export const DateLabel = (
  {date,className,tooltip}:{date:string}& LabelProps
)=> {
  const {formatTime} = useLocaleFormat()
  return (
    <>
      <BSLabel label={formatTime(date)} className={className}  tooltip={tooltip}>
        <CiCalendarDate/>
      </BSLabel>
    </>
  )
}

export const DurationLabel = (
  {duration,className,tooltip}:{duration:number}& LabelProps
)=> {
  const {formatDuration} = useLocaleFormat()
  return (
    <>
      <BSLabel label={formatDuration(duration)} className={className}  tooltip={tooltip}>
        <CiTimer/>
      </BSLabel>
    </>
  )
}

export const BSRatingLabel = (
  {rate,className,tooltip="rate"}:{rate:number}& LabelProps
) => {
  return (
    <>
      <BSLabel label={`${(100*rate).toFixed(1)} %`} className={className} tooltip={tooltip}>
        <CiStar/>
      </BSLabel>
    </>
  )
}

export const ThumbUpCountLabel = (
  {count,className,tooltip= "thumb up count"}:{count:number}& LabelProps
) => {
  const {formatNumber} = useLocaleFormat()
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tooltip}>
        <AiOutlineLike/>
      </BSLabel>
    </>
  )
}

export const ThumbDownCountLabel = (
  {count,className,tooltip = "thumb up count"}:{count:number}& LabelProps
) => {
  const {formatNumber} = useLocaleFormat()
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tooltip}>
        <AiOutlineDislike/>
      </BSLabel>
    </>
  )
}


export const BSBPMLabel =(
  {bpm,className, tooltip = "beats per minute"}:{bpm:number} & LabelProps
)=>{
  return (
    <>
      <BSLabel label={bpm.toFixed(0)}  className={className} tooltip={tooltip}>
        <PiHeartbeat/>
      </BSLabel>
    </>
  )
}

export const BSIDLabel = ({
  id,
  className,
  tooltip = "beatmap id"
}:{
  id:string
} & LabelProps) => {
  return (
    <>
      <BSLabel label={id}  className={className} tooltip={tooltip}>
        <IoKeyOutline/>
      </BSLabel>
    </>
  )
}
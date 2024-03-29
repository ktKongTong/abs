import { formatDuration } from "@/lib/format";
import { Slider } from "@/components/ui/slider"

import { useMemo } from "react";
import {useTranslation} from "@/hooks/useTranslation";

export default function DurationRangePicker({
    range,
    setRange
}:{
    range:[number|undefined, number|undefined],
    setRange:(range:[number|undefined, number|undefined])=>void   
}) {
    const {t} = useTranslation('components.filter')
    const handle = (value: number[]) => {
        let [min, max]:[number|undefined, number|undefined] = value as [number, number];
        if (value[0] === 0) {
            min = undefined;
        }
        if (value[1] === 330) {
            max = undefined;
        }
        setRange([min, max]);
    }
    const coveredRange = useMemo(()=>{
        return [
            range[0] === undefined ? 0 : range[0],
            range[1] === undefined ? 330 : range[1]
        ]
    },[range])
    const text = useMemo(()=>{
        let min = range[0]?range[0]:0;
        let max = range[1]?range[1]:undefined;
        if (range[1] === undefined || range[1] === 330) {
            return `${formatDuration(min)} - ∞`
        }
        return `${formatDuration(min)} - ${formatDuration(max!)}`
    },[range])
    return (
      <div className="relative">
          <div className="flex justify-between mb-1.5">
              <span>{t('range.duration')}</span>
              <span>{text}</span>
          </div>
          <Slider
            defaultValue={coveredRange}
            min={0}
            max={330}
            onValueChange={handle}
            onValueCommit={handle}
            step={30}
          />
      </div>
    )
}
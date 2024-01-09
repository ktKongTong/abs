import { formatDuration } from "@/lib/format";
import { Slider } from "@radix-ui/themes";
import { useMemo, useState } from "react";

export default function DurationRangePicker({
    range,
    setRange
}:{
    range:[number|undefined, number|undefined],
    setRange:(range:[number|undefined, number|undefined])=>void   
}) {

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
    const covertedRange = useMemo(()=>{
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
            <Slider
            defaultValue={covertedRange}
            min={0}
            max={330}
            onValueChange={handle}
            onValueCommit={handle}
            step={30}
            />
            <div className="flex justify-between">
                <div>Duration</div>
                <div>{text}</div>
            </div>
        </div>
    )
}
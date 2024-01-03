
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { IoSpeedometerOutline } from "react-icons/io5";
export default function NPSLabel(
    {nps,size, tooltip = "note per second"}:{nps:number,size?:TextSize, tooltip?:string}
){
    return (
        <>
            <BSLabel label={nps.toFixed(2)}  size={size} tooltip={tooltip}>
                <IoSpeedometerOutline/>
            </BSLabel>
        </>
    )
}
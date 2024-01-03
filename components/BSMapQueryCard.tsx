import { Button, Card, DropdownMenu, Slider, Switch,Text, Tooltip } from "@radix-ui/themes";
import SearchBar from "./SearchBar";
import NPSRangePicker from "./NPSRangePicker";
import Calendar from "./Calendar";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { MapQueryParam, options } from "@/hooks/usePagingBSMap";
import DurationRangePicker from "./DurationRangePicker";
import RatingRangePicker from "./RatingRangePicker";
interface SortMenuProps {
    options: string[];
    current: string;
    onUpdateCurrent: (current: string) => void;
}
const playlistOptions = [
    "Relevance",
    "Latest",
    "Curated",
    "Rating",
]
const SortMenu = (
    {options,current,onUpdateCurrent}:SortMenuProps) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button variant="soft">
                {current}
                <CaretDownIcon />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                {
                    options.map((option:string)=>{
                        return (
                            <DropdownMenu.CheckboxItem key={option} onClick={()=>{onUpdateCurrent(option)}}>{option}</DropdownMenu.CheckboxItem>
                        )
                    })
                }
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default function BSMapQueryCard(
    {queryParam,className, updateQuery, query}:{
        className?:string, 
        queryParam:MapQueryParam, 
        updateQuery:(query:MapQueryParam)=>void, 
        query:()=>void
    }
) {
    const [sortMenuCurrent, setSortMenuCurrent] = useState("Relevance");
    const handleSortMenuCurrentChange = (current:string)=>{
        setSortMenuCurrent(current);
        updateQuery({
            ...queryParam,
            sortOrder:current
        })
    }
    const handleOptionChange = (option:string,checked:boolean)=>{
        updateQuery({
            ...queryParam,
            options: {
                ...queryParam.options,
                [option]:checked
            }
        })
    }
    return (
        <Card className={`${className}`} variant="classic">
            <div className="flex flex-col h-full space-y-3">
            <SearchBar
                queryKey={queryParam.queryKey}
                onQuery={query}
                onQueryKeyChange={
                    (queryKey:string)=>{
                        updateQuery({
                            ...queryParam,
                            queryKey:queryKey
                        })
                    }}
            />
            <div>
            </div>
            <div className="flex justify-between items-center">
                <Text>Sorted By</Text>
                <SortMenu options={playlistOptions} current={sortMenuCurrent} onUpdateCurrent={handleSortMenuCurrentChange}/>
            </div>
            <div className="">
                {
                    options.map((option)=>{
                        return (
                            <div key={option.value} className="flex justify-between items-center">
                                {option?.tooltip ? 
                                (
                                    <Tooltip content={option.tooltip}>
                                        <Text className="cursor-default">{option.label}</Text>
                                    </Tooltip>
                                ): (
                                    <Text>{option.label}</Text>
                                )}
                                <Switch
                                size="1"
                                defaultChecked={queryParam.options ? true:false}
                                onCheckedChange={(checked:boolean)=>{handleOptionChange(option.value,checked)}}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex  w-full p-2 justify-between items-center">
                <div className="relative w-full">
                    <NPSRangePicker/>
                </div>
            </div>
            <div className="flex w-full p-2 justify-between items-center">
                <div className="relative w-full">
                    <DurationRangePicker/>
                </div>
            </div>
            
            <div className="flex w-full p-2 justify-between items-center">
                <div className="relative w-full">
                    <RatingRangePicker/>
                </div>
            </div>
            <div className="flex flex-col">
            <Calendar
                value={""}
                defaultValue={""}
                onSelectDate={(date:any) => {
                }}
            />
            </div>
            </div>
        </Card> 
    )
}
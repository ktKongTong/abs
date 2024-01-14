'use client'
import { BSUser } from "@/interfaces/beatsaver-user";
import Link from "@/components/ui/link";
import MapperAvatar from "@/components/mapper-avatar";
import BSUserDetailCard from "../BSUserDetialCard";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {cn} from "@/lib/utils";

const truncated = (text:string) => {
    if (text.length > 12) {
        return text.substring(0,12) + '...'
    }
    return text
}
export default function BSUserLabel(
    {
        user,
        className,
        avatarClassName
    }:{
        user:BSUser,
        className?:string,
        avatarClassName?:string
    }
){
    return (
        <>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Link href={`/mapper/${user.id}`} className={cn("relative flex items-center  cursor-pointer text-xs",className)}>
                        <MapperAvatar src={user.avatar} verified={user.verifiedMapper} className={avatarClassName}/>
                        <span className='my-auto text-ellipsis line-clamp-1'>{truncated(user.name)}</span>
                    </Link>
                </HoverCardTrigger>
                <HoverCardContent className="shadow-md">
                        <BSUserDetailCard user={user} />
                </HoverCardContent>
            </HoverCard>
        </>
    )
}
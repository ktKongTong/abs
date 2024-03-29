'use client'
import { BSUser } from "@/interfaces/beatsaver-user";
import Link from "@/components/ui/link";
import MapperAvatar from "@/components/shared/MapperAvatar";
import BSUserDetailCard from "../BSUserDetialCard";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {cn} from "@/lib/utils";

import {motion} from 'framer-motion'
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
        avatarClassName,
        linkClassName
    }:{
        user:BSUser,
        className?:string,
        avatarClassName?:string,
        linkClassName?:string
    }
){
    return (
        <>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <motion.div layout className={cn("relative flex items-center  cursor-pointer text-xs",className)}>
                      <MapperAvatar  src={user.avatar} verified={user.verifiedMapper} className={avatarClassName}/>
                      <Link href={`/mapper/${user.id}`} className={linkClassName}>
                        <span className='my-auto text-ellipsis line-clamp-1'>{truncated(user.name)}</span>
                      </Link>
                    </motion.div>
                </HoverCardTrigger>
              <HoverCardContent className="shadow-md bg-transparent dark:bg-transparent">
                <BSUserDetailCard user={user} />
              </HoverCardContent>
            </HoverCard>
        </>
    )
}

import {HTMLMotionProps, motion, useMotionValue, useSpring} from "framer-motion";
import React, {useEffect, useRef, useState} from "react";
import {useScrollConstraints} from "@/hooks/ui/useScrollConstraints";
import {useWheelScroll} from "@/hooks/ui/useWheelScroll";
import {cn} from "@/lib/utils";
import {Overlay} from "@/components/bsmap/overlay";
import {BSUserWithStats} from "@/interfaces/beatsaver-user";
import BSMapper from "@/components/bsmapper/BSMapper";

const WrappedBSMapper =(
  {
    bsUserWithStats,
    ...rest
  }: {
      bsUserWithStats:BSUserWithStats
    }
    & HTMLMotionProps<"div">
)=> {

  const cardRef = useRef(null);
  const [isSelected,setIsSelected] = useState(false)
  const {constraints} = useScrollConstraints(cardRef, isSelected??false);
  const containerRef = useRef(null);
  const y = useMotionValue(0);
  useEffect(()=>{
    if(!isSelected) {
      y.jump(0)
    }
  },[y,isSelected])
  const dismissDistance = 150;
  function checkSwipeToDismiss() {
    y.get() > dismissDistance &&
    setIsSelected(false)
    // onClose?.();
  }
  const springY = useSpring(y,{
    velocity: y.getVelocity(),
    stiffness: 400,
    damping: 40,
  })
  useWheelScroll(
    containerRef,
    y,
    constraints,
    ()=>{},
    isSelected ?? false
  );
  const variant = {
    open: {
      zIndex: 10,
      transition: {type: "spring", stiffness: 200, damping: 30},
    },
    closed: {
      zIndex: 'auto',
      transition: {
        type: "spring", stiffness: 300, damping: 35,
        zIndex: {
          delay: 2,
        },
      },
    },
  }
  return (
    <motion.div
      ref={containerRef} {...rest}
      className={cn(
        !isSelected ? 'hover:z-[2]' : ' touch-none'
      )}
    >
      {<Overlay isSelected={isSelected} onClick={()=>{setIsSelected(false)}}/>}
      <div
        className={
          cn(
            ` w-full h-full block pointer-events-none relative`,
            isSelected ? ` top-0 left-0 right-0 px-1 pt-16 sm:px-10 sm:pt-24 fixed overflow-hidden z-50  block` : ``
          )
        }
      >
        <motion.div
          ref={cardRef}
          className={cn(
            "pointer-events-auto h-full w-full my-0 mx-auto relative items-center flex justify-center",
            isSelected? 'h-auto max-w-[1024px] overflow-hidden ':''
          )}
          style={{y:springY}}
          layout
          dragConstraints={constraints}
          onDrag={checkSwipeToDismiss}
          variants={variant}
          animate={isSelected ? "open" : "closed"}
        >
          <BSMapper bsUserWithStats={bsUserWithStats} className={'w-full bg-zinc-100/70 dark:bg-zinc-800/70 backdrop-blur-xl rounded-lg'}/>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default React.memo(WrappedBSMapper)


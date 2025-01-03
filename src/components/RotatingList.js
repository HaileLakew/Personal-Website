
import { AnimatePresence, Reorder } from "framer-motion";
import { useEffect, useState } from "react";

export default function RotatingList({list = []}) {
  
      const [listItems, setlistItems] = useState(list)
      const [listItemCounter, setlistItemsCounter] = useState(0);
  
      useEffect(()=>{
        const interval = setInterval(() => {
          if(listItemCounter >= 4) {
            setlistItemsCounter(0);
          } else {
            setlistItemsCounter(listItemCounter + 1);
          }
  
          let currentOrder = listItems;
          let listItem = currentOrder.pop();
          currentOrder.unshift(listItem)
          setlistItems(currentOrder)
        }, 4500);
  
        return () => clearInterval(interval);
      }, [listItems, listItemCounter])

      
    return (
        <>
          <AnimatePresence ial={false} className="h-[45%]">
            <Reorder.Group 
              className="flex flex-col w-screen md:w-[50vw] text-left md:items-center max-h-[350px] sm:max-h-[500px]" 
              style={{WebkitMaskImage: 'linear-gradient(180deg, #000 70%, transparent)'}}
              axis="y"
              values={listItems}
              onReorder={setlistItems}>
              {
                listItems.map((listItem, index)=>{

                  return (index!==listItems.length-1 && <Reorder.Item 
                    dragListener={false}
                    id={listItem.title}
                    key={listItem.title} 
                    value={listItem.title}
                    className="p-5 md:w-full"
                    initial={{ opacity: 0 }} 
                    whileInView={{  opacity: 1 }}
                    exit={{opacity: 0}}
                    transition={{ duration: .5 }}
                    >
                    <span className="font-black text-amber-500"> {listItem.title}<br/></span>
                    <span className="font-light">{listItem.message}</span>
                  </Reorder.Item>)
                })
              }

            </Reorder.Group>
          </AnimatePresence>
        </>
    )
}
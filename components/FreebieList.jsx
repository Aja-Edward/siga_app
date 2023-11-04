import React from 'react'
import FreebieItems from '@components/FreebieItems'

const FreebieList = ({data}) => {
 return (
   <section className='serviceitem_container'>
     <div className='listservice-wrapper'>
       <div className='serviceitem_wrapper'>
         {data?.map((freebie) => (
           <>
             <FreebieItems key={freebie._id} freebie={freebie} />
           </>
         ))}
       </div>
     </div>
   </section>
 )
}

export default FreebieList
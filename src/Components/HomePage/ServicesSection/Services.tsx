import React from 'react'
import ServiceCard from './ServiceCard'

function Services() {
    return (
        <div className='w-[90%] bg-teal-500 py-10 my-20 flex justify-evenly sm:flex-nowrap flex-wrap sm:gap-0 gap-5'>
            <ServiceCard icon={1} text={"Get the best and most effecient treatment by exploring the best hospital wolrdwide."} />
            <ServiceCard icon={2} text={"Get an opporunity to consut witht the expert doctors worldwide."} />
            <ServiceCard icon={3} text={"Stop checking cost to many hospitals and avoid extra charges"} />
        </div>
    )
}

export default Services

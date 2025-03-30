import React from 'react'

const HomeCards = ({ color, obj }) => {
    return (
        <div style={{ borderTopColor: color }} className={`w-[407px] h-[217px] border-t-3 $ border-x-2 border-x-gray-200 py-3 px-3 rounded-2xl 0 flex flex-col justify-between gap-4`}>
            <div>
                <h1 className='font-bold text-left'>{obj.name}</h1>
                <p className='text-[#696969] text-sm text-left'>{obj.description}
                </p>
            </div>
            <a className={` text-start`} style={{ color: color }} href="">learn more</a>

        </div>
    )
}

export default HomeCards

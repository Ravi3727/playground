import React from 'react'

const HomeCards = ({ color, obj }) => {
    return (
        <div style={{ borderTopColor: color }} className={`w-[307px] h-[217px] border-t-3 $ border-x-2 border-x-gray-200 py-3 px-3 rounded-2xl z-30 flex flex-col justify-between gap-4 hover:shadow-xl hover:scale-105 transition-all `}>
            <div className='text-center gap-4 flex flex-col justify-center item-center'>
                <h1 className='font-bold '>{obj.name}</h1>
                <p className='text-[#696969] text-sm text-left'>{obj.description}
                </p>
            </div>
            <a className={` text-start hover:underline w-fit`} style={{ color: color }} href=""></a>

        </div>
    )
}

export default HomeCards

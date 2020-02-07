import React from 'react'

import loadingGif from './images/gif/loading-gear.gif'

export default function Loading() {
    return (
        <div className='loading'>
            <img  className='loadingGif' src={loadingGif} alt='Blog Loading...'></img>
        </div>
    )
}
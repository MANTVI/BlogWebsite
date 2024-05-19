import React from 'react'
import service from '../AppWrite/Database_Storage'
import {Link} from 'react-router-dom'

function PostCard({$id, title, image}) {  //props pass
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={service.getFilePreview(image)} alt={title}  //doubt
                    className='rounded-xl' />
    
                </div>
                <h2
                className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>
      )
}

export default PostCard

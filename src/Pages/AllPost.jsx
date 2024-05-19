import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../Component'
import service from "../AppWrite/Database_Storage";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getAllPost([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    return (
        <div className='w-full py-8'>

            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default AllPosts
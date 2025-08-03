import React, { useEffect, useState} from 'react'
import { Container,PostCard } from '../components'
import appwriteService from "../appwrite/config"

function AllPosts() {
    const [posts,setPosts]=useState([])

    useEffect(()=>{
    appwriteService.getPosts([]).then((post)=> {
            if (post) {
              console.log(post,"post hai");
                setPosts(post.documents)
            }else{
              return false
            }
        })
    },[])
   
    // console.log(posts,"add");
    
  return (
    <div className="py-12 bg-white px-4">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post)=>(
                <div key={post.$id}>
                    <PostCard {...post}/>
                </div>
            ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts

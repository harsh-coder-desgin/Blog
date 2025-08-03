import React,{useState,useEffect} from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        console.log(posts);
        
        appwriteService.getPosts().then((post)=>{
            if (post) {
                setPosts(post.documents)
            }
        })
    },[])
    // if (posts > 0) {
    //   window.location.href = '/';
    // }

    console.log(posts);
   if (posts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white-50 px-4">
        <Container>
          <div className="text-center py-16 mt-14">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              Login to read posts
            </h1>
            <p className="text-gray-600 text-base">
              Please log in to access exclusive content curated just for you.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white px-4">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.$id}>
                <PostCard  {...post} />
              </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home

import React,{useEffect,useState} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import appwriteService from "../appwrite/config"
import {Button,Container} from "../components"
import parse from "html-react-parser"
import { useSelector } from 'react-redux'

export default function Post() {
    
    const [post,setPost]=useState(null)
    const{slug}=useParams()
    const navigate = useNavigate()

    const userData = useSelector((state)=>state.auth.userData)
    const isAuthor = post && userData ? post.userId ===
    userData.$id : false

    useEffect(()=>{
        if (slug) {
            appwriteService.getPost(slug).then((post)=>{
                if (post) setPost(post)
                else navigate("/")      
            })
        }else navigate("/")
    },[slug,navigate]);

    const deletePost =()=>{
        appwriteService.deletePost(post.$id).then((status)=>{
            if (status) {
                appwriteService.deleteFile(post.featuredImage)
                navigate("/")
            }
        });
    }
  return post ?
  (
   <div className="py-10 bg-gray-50 min-h-screen">
  <Container>
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      {/* Image */}
      <div className="mb-6">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          className="w-full h-64 object-cover rounded-md"
        />

        {/* Edit/Delete Buttons */}
        {isAuthor && (
          <div className="flex gap-4 mt-4">
            <Link to={`/edit-post/${post.$id}`}>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 transition">
                Edit
              </Button>
            </Link>
            <Button
              onClick={deletePost}
              className="bg-red-600 text-white hover:bg-red-700 transition"
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="mb-4">
        <h1 className="text-3xl  text-gray-800">{post.title}</h1>
      </div>

      {/* Content */}
      <div className="prose max-w-none">
        {parse(post.content)}
      </div>
    </div>
  </Container>
</div>

  ):null
}


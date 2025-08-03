import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
function PostCard({$id,title,featuredImage}) {
  // console.log($id,"id");
  console.log(featuredImage);
  
  return (
  <Link to={`/post/${$id}`}>
    <div className="w-full bg-red rounded-xl shadow hover:shadow-md transition p-4">
      <div className="w-full flex justify-center mb-4 overflow-hidden rounded-md bg-white">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          className="object-cover h-48 w-full rounded-md"
        />
      </div>
      <h1 className="text-lg  text-gray-800 hover:text-blue-600 line-clamp-2">
        {title}
      </h1>
    </div>
  </Link>
);

}

export default PostCard

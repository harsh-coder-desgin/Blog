import React,{useCallback, useEffect} from 'react'
import { useForm } from "react-hook-form"
import {Button,Input,Select,RTE} from '../index'
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function PostForm({post}) {
    console.log(post);
    
    const {register,handleSubmit,watch,setValue,control,getValues} =useForm({
        defaultValues:{
            title:post?.title || '',
            slug:post?.$id || '',   
            content :post?.content || '',
            status:post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    // const userData = useSelector(state => state.user.userData)
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) =>{
        if (post) {
            const file = data.image[0] ? appwriteService.
            uploadFile(data.image[0]) :null
            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(
                post.$id,{
                    ...data,
                    featuredImage: file ? file.$id : undefined
                    //handle undefined good way
                    // ...(file && { featuredImage: file.$id })
                }
            )
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
            const file = await appwriteService.uploadFile(data.image[0])
            console.log(data);
        
            if (file) {
                console.log(file);
                
                const fileId = file.$id
                data.featuredImage = fileId
                // console.log(featuredImage,"dat123");
                console.log(data.featuredImage,"data");
                
                
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId:userData.$id,
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) =>{
        // if (value && typeof value === 'string') {
        //     const slug = value.toLocaleLowerCase().replace(/ /g, '-')
        //     setValue('slug',slug)
        //     return slug
        // }
        if (value && typeof value === 'string') 
            return value
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '-')
                // .replace(/\s/g,'-')
            return ''
    },)

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            // console.log(value,name);
            
            if (name === 'title') {
                setValue('slug',slugTransform(value.title,
                    {shouldValidate:true}))
            }
        })
        return () =>{
            subscription.unsubscribe()
        }
    },[watch,slugTransform,setValue])

    return (
   <form onSubmit={handleSubmit(submit)} className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* Left Column (Title, Slug, Content) */}
  <div className="lg:col-span-2">
    <Input
      label="Title"
      placeholder="Title"
      className="mb-4"
      {...register("title", {
        required: true,
      })}
    />

    <Input
      label="Slug"
      placeholder="Slug"
      className="mb-4"
      {...register("slug", {
        required: true,
      })}
      onInput={(e) => {
        setValue("slug", slugTransform(e.currentTarget.value), {
          shouldValidate: true,
        });
      }}
    />

    {/* Content Area */}
    <div className="mb-4">
      <label htmlFor="content" className="block mb-1 font-semibold">
        Content
      </label>
      <textarea
        id="content"
        name="content"
        defaultValue={`# Welcome to the Editor

This is a sample document.

- Bullet point 1
- Bullet point 2

**Enjoy editing!**`}
        {...register("content")}
        className="w-full border rounded p-3 min-h-[220px] focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  </div>

  {/* Right Column (Image, Status, Submit) */}
  <div>
    <Input
      label="Featured Image"
      type="file"
      className="mb-4"
      accept="image/png,image/jpg,image/jpeg,image/gif"
      {...register("image", {
        required: !post,
      })}
    />

    {/* Show Image if Editing */}
    {post && (
      <div className="mb-4">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          className="rounded-lg border shadow-sm"
        />
      </div>
    )}

    <Select
      options={["active", "inactive"]}
      label="Status"
      className="mb-4"
      {...register("status", {
        required: true,
      })}
    />

    <Button
      type="submit"
      bgColor={post ? "bg-green-500" : undefined}
      className="w-full"
    >
      {post ? "Update" : "Submit"}
    </Button>
  </div>
</form>

  )
}

export default PostForm

"use client"
import { addBlogPost } from "@/actions/actions"
import { InsertBlogPost, insertBlogPostSchema } from "@/db/schema"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<InsertBlogPost>({ resolver: zodResolver(insertBlogPostSchema) })

  const [apiErrors, setApiErrors] = useState()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()

        // const result = await trigger()
        // console.log(result)
        // if (!result) return
        const form = getValues()
        form.views = Number(form.views)

        const result = await addBlogPost(form)

        console.log(result.error)
        if (result.error) {
          const errors = {}
          result.error.forEach((item) => (errors[item.path[0]] = item.message))
          setApiErrors(errors)
          console.log(errors)
          return
        }
      }}
      style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
    >
      <label htmlFor="title">Title</label>
      <input
        id="title"
        // type="text"
        // placeholder="Title"
        // name="title"
        // value={form.title}
        // onChange={handleChange}
        {...register("title")}
      />
      {errors.title && <p>{errors.title}</p>}
      {apiErrors?.title && <p>{apiErrors.title}</p>}
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        // placeholder="Content"
        // name="content"
        // onChange={handleChange}
        // value={form.content}
        {...register("content")}
      />
      {errors.content && <p>{errors.content}</p>}
      {apiErrors?.content && <p>{apiErrors.content}</p>}
      <label htmlFor="author">Author</label>
      <input
        id="author"
        // type="text"
        // placeholder="Author"
        // name="author"
        // value={form.author ?? ""}
        // onChange={handleChange}
        {...register("author")}
      />
      {errors.author && <p>{errors.author}</p>}
      <label htmlFor="views">Views</label>
      <input
        id="views"
        type="number"
        // placeholder="views"
        // name="views"
        // value={form.views ?? ""}
        // onChange={handleChange}
        {...register("views")}
      />
      {errors.views && <p>{errors.views}</p>}
      {apiErrors?.views && <p>{apiErrors.views}</p>}
      <button type="submit">Submit</button>
    </form>
  )
}
export default page

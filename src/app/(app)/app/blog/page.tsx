"use client"
import { addBlogPost } from "@/actions/actions"
import { InsertBlogPost, insertBlogPostSchema } from "@/db/schema"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const page = () => {
  // const [form, setForm] = useState<InsertBlogPost>({
  //   title: "",
  //   content: "",
  //   author: "",
  //   views: 0,
  // })

  // console.log(form)

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const error = await addBlogPost(form)
  //   if (error.success) {
  //     setForm({
  //       title: "",
  //       content: "",
  //       author: "",
  //       views: 0,
  //     })
  //   }
  //   console.log(error)
  // }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<InsertBlogPost>({ resolver: zodResolver(insertBlogPostSchema) })

  return (
    <form
      action={async () => {
        const result = await trigger()
        if (!result) return
        const form = getValues()
      }}
    >
      <input
        // type="text"
        // placeholder="Title"
        // name="title"
        // value={form.title}
        // onChange={handleChange}
        {...register("title")}
      />
      {errors.title && <p>{errors.title.message}</p>}
      <textarea
        // placeholder="Content"
        // name="content"
        // onChange={handleChange}
        // value={form.content}
        {...register("content")}
      />
      {errors.content && <p>{errors.content.message}</p>}
      <input
        // type="text"
        // placeholder="Author"
        // name="author"
        // value={form.author ?? ""}
        // onChange={handleChange}
        {...register("author")}
      />
      {errors.author && <p>{errors.author.message}</p>}
      <input
        // type="number"
        // placeholder="views"
        // name="views"
        // value={form.views ?? ""}
        // onChange={handleChange}
        {...register("views")}
      />
      {errors.views && <p>{errors.views.message}</p>}
      <button type="submit">Submit</button>
    </form>
  )
}
export default page

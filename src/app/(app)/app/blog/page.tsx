"use client"
import { addBlogPost } from "@/actions/actions"
import { useState } from "react"

const page = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    views: 0,
  })

  console.log(form)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const eventName = e.target.name
    setForm({
      ...form,
      [eventName]: eventName === "views" ? +e.target.value : e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const error = await addBlogPost(form)
    if (error.success) {
      setForm({
        title: "",
        content: "",
        author: "",
        views: 0,
      })
    }
    console.log(error)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        placeholder="Content"
        name="content"
        onChange={handleChange}
        value={form.content}
      />
      <input
        type="text"
        placeholder="Author"
        name="author"
        value={form.author}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="views"
        name="views"
        value={form.views}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
export default page

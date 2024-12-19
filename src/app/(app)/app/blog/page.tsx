"use client"
import { useState } from "react"

const page = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    views: null,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleChange}
      />
      <textarea placeholder="Content" name="content" onChange={handleChange} />
      <input
        type="text"
        placeholder="Author"
        name="author"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="views"
        name="views"
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  )
}
export default page

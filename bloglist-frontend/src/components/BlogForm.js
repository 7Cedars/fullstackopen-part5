import { useState, useEffect } from 'react'

const BlogForm = ({ createBlog }) => {

    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

    const addBlog2 = (event) => {
        event.preventDefault()
        createBlog ({
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url,
          likes: 0
        })
    
        setNewBlog({title: '', author: '', url: ''})
    }

    useEffect(() => {
        console.log("newBlog: ", newBlog)
       }, [newBlog])

    return (
        <div> 
            
            <h2>New Blog Entry</h2>
            
            <form onSubmit={addBlog2}>
            <div>
                title:
                <input
                    type="text"
                    value={newBlog.title}
                    name="Title"
                    onChange={event => setNewBlog({
                        ...newBlog,
                        title: event.target.value
                    })}
                />
            </div>
            <div>
                author:
                <input
                type="text"
                value={newBlog.author}
                name="Author"
                onChange={event => setNewBlog({
                    ...newBlog,
                    author: event.target.value
                })}
                />
            </div>
            <div>
                url:
                <input
                type="text"
                value={newBlog.url}
                name="Url"
                    onChange={event => setNewBlog({
                        ...newBlog,
                        url: event.target.value
                    })}
                />
            </div>
            <button type="submit">Submit</button>
            </form>
        </div> 
    )
 }

export default BlogForm
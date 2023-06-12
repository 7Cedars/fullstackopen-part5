const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  .populate('user', { 
    username: 1, 
    name: 1 }) 
  response.json(blogs)    
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  
  if (!blog) {response.status(404).end()}

  response.json(blog)    
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const blog = new Blog(request.body)
  
  blog.likes ? blog.likes = blog.likes : blog.likes = 0
  
  blog.user = request.user
  const savedBlog = await blog.save()

  request.user.blogs = request.user.blogs.concat(savedBlog.id)
  await request.user.save()

  response.status(201).json(savedBlog) 
  
})

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  
  const blog = await Blog.findById(request.params.id)
  const userid = request.user.id

   // if ( blog.user.toString() === userid.toString() ){ // Witht his ONLY creator of blogs can delete blogs. 
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).json(request.params.id)
   // }

})

// ok, so this is not the most efficient way.. but it works! 
blogsRouter.put('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const update = request.body
  const originalBlog = await Blog.findById(request.params.id)
    .populate('user', { 
      username: 1, 
      name: 1 })

  let updatedBlog = originalBlog

  if (!(originalBlog)) {response.status(404).end()}

  update.title ? updatedBlog.title = update.title : null
  update.author ? updatedBlog.author = update.author : null
  update.url ? updatedBlog.url = update.url : null
  update.likes ? updatedBlog.likes = update.likes : null

  savedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  
  // Blog.findById(request.params.id)
  // response.status(204).json(originalBlog)
  response.json(originalBlog)    

})

module.exports = blogsRouter
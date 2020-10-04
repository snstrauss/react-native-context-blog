import { add, get, remove } from "./backend.service";

const BLOGS = 'blogs';

export const getBlogs = () => get(BLOGS);
export const addBlog = (blogToAdd) => add(BLOGS, blogToAdd);
export const removeBlog = (blogToRemove) => remove(BLOGS, blogToRemove);

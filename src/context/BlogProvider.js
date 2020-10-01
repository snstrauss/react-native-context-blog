import createDataContext from './createDataContext';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

/**
 * using the generic createDataContext,
 * only the reducer actions, an initial state,
 * and a UNIQUE reducer name are required.
 */
const blogActions = {
    add: (blogs, newBlogs) => {

        if(!Array.isArray(newBlogs)){
            newBlogs = [newBlogs];
        }

        newBlogs.forEach(blog => {
            blog.id = uuidv4();
        });

        return [...blogs, ...newBlogs]
    },
    remove: (blogs, blogToRemove) => {
        return blogs.filter((blog => blog.id !== blogToRemove.id));
    }
}

/**
 * createDataContext returns Context, which will be exported to be used by other components,
 * and the Provider, which will be used in top of app
 */
const { Context, Provider } = createDataContext('blogs', blogActions, []);

export const BlogContext = Context;
const BlogProvider = Provider;

export default BlogProvider;
import createDataContext from './createDataContext';

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

        return [...blogs, ...newBlogs]
    },
    remove: (blogs, blogToRemove) => {

        debugger;

        const newBlogs = blogs.filter((blog => blog.id !== blogToRemove.id));

        debugger;

        return newBlogs;
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
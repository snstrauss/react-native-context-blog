// using localtunnel to get global access to localhost
const URL = 'https://contextblog.loca.lt/';

const resourceUrl = (resource) => URL + resource + '/';

const backendCall = (url, options) => fetch(url, options).then(res => res.json());

export function get(resource){
    return backendCall(resourceUrl(resource));
}

export function add(resource, newPost){
    return backendCall(resourceUrl(resource), {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newPost),
    });
}

export function remove(resource, itemToRemove){
    return backendCall(resourceUrl(resource) + itemToRemove.id, {
        method: 'DELETE'
    });
}
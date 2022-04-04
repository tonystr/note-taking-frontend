import useSWR from "swr";

function useApi<Type>(path: RequestInfo) {
    return useSWR<Type>(path, fetcher);
}

async function update(path: RequestInfo, options: {}) {
    return fetch(`/api/${path}`, {
        method: 'PUT',
        body: JSON.stringify(options),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .catch(console.error);
}

async function create(path: RequestInfo, options?: {}) {
    console.log('sending: ', options);
    return fetch(`/api/${path}`, {
        method: 'POST',
        body: JSON.stringify(options),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .catch(console.error);
}

async function apiDelete(path: RequestInfo, options?: {}) {
    return fetch(`/api/${path}`, {
        method: 'DELETE',
        body: JSON.stringify(options),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .catch(console.error);
}

async function fetcher(url: RequestInfo) {
    return fetch(`/api/${url}`).then(res => res.json());
}

export { useApi, update, create, apiDelete, fetcher };
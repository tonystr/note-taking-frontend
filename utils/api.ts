import useSWR from "swr";

function useApi<Type>(path: RequestInfo) {
    return useSWR<Type>(path, fetcher);
}

async function fetcher(url: RequestInfo) {
    return fetch(`/api/${url}`).then(res => res.json());
}

export { useApi, fetcher };
import { default as unfetch } from 'isomorphic-unfetch'

async function fetch<JSON = any>(
    input: RequestInfo,
    init?: RequestInit,
): Promise<JSON> {
    const res = await unfetch(input, init)
    return res.json()
}

export default fetch

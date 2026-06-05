

import { getToken } from '../hooks/getToken'
import { apiUrl } from '../../env'

async function request(endpoint, options = {}) {
    const token = getToken()

    const headers = {
        'Accept': 'application/json',
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
    }

    let response

    try {
        response = await fetch(`${apiUrl}${endpoint}`, {
            ...options,
            headers,
        })
    } catch (networkError) {
        throw new Error('Impossible de contacter le serveur. Vérifiez votre connexion.')
    }

    const contentType = response.headers.get('content-type')
    const data = contentType?.includes('application/json')
        ? await response.json()
        : null

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Session expirée. Veuillez vous reconnecter.')
        }

        throw new Error(data?.message || `Erreur ${response.status}`)
    }

    return data
}


export const apiClient = {

    get(endpoint) {
        return request(endpoint, { method: 'GET' })
    },

    post(endpoint, body) {
        return request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        })
    },

    put(endpoint, body) {
        return request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        })
    },

    delete(endpoint, body) {
        return request(endpoint, {
            method: 'DELETE',
            body: JSON.stringify(body),
        })
    },

    upload(endpoint, formData) {
        return request(endpoint, {
            method: 'POST',
            body: formData,
        })
    },
}
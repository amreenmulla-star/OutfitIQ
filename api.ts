async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(path, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const message =
      typeof data.error === 'string'
        ? data.error
        : data.error
          ? JSON.stringify(data.error)
          : 'Request failed'
    throw new Error(message)
  }

  return data as T
}

export const api = {
  // Auth
  register: (body: { name: string; email: string; password: string }) =>
    request<{ user: { id: string; name: string; email: string } }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  login: (body: { email: string; password: string }) =>
    request<{ user: { id: string; name: string; email: string } }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  logout: () => request<{ ok: boolean }>('/api/auth/logout', { method: 'POST' }),
  me: () => request<{ user: { id: string; name: string; email: string } }>('/api/auth/me'),

  // Early access
  earlyAccess: (body: {
    name: string
    email: string
    interestCategory?: string
    consent: true
  }) =>
    request<{ message: string }>('/api/early-access', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  // Wardrobe
  getItems: () => request<{ items: import('../types').ClothingItem[] }>('/api/wardrobe'),
  createItem: (body: Omit<import('../types').ClothingItem, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) =>
    request<{ item: import('../types').ClothingItem }>('/api/wardrobe', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  updateItem: (id: string, body: Partial<import('../types').ClothingItem>) =>
    request<{ item: import('../types').ClothingItem }>(`/api/wardrobe/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  deleteItem: (id: string) =>
    request<{ ok: boolean }>(`/api/wardrobe/${id}`, { method: 'DELETE' }),

  // Outfits
  getOutfits: () => request<{ outfits: import('../types').Outfit[] }>('/api/outfits'),
  createOutfit: (body: {
    name: string
    occasion: string
    description?: string
    clothingItemIds: string[]
  }) =>
    request<{ outfit: import('../types').Outfit }>('/api/outfits', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  deleteOutfit: (id: string) =>
    request<{ ok: boolean }>(`/api/outfits/${id}`, { method: 'DELETE' }),

  // Recommend
  recommend: (body: {
    occasion: string
    preferredColours?: string[]
    weather?: string
  }) =>
    request<{ suggestions: import('../types').OutfitSuggestion[] }>('/api/recommend', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
}

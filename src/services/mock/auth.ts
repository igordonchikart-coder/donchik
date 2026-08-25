import type { AuthUser, LoginCredentials } from '@/types'
import { STORAGE_KEYS } from '@/utils/constants'
import { readJson, removeItem, writeJson } from '@/utils/storage'

const DEMO_EMAIL = 'admin@donchik.art'
const DEMO_PASSWORD = 'admin'

function delay(ms = 200): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export async function login({ email, password }: LoginCredentials): Promise<AuthUser> {
  await delay()

  if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    throw new Error('Invalid email or password')
  }

  const user: AuthUser = {
    id: 'mock-admin',
    email: DEMO_EMAIL,
  }

  writeJson(STORAGE_KEYS.mockAuth, user)
  return user
}

export async function logout(): Promise<void> {
  await delay(80)
  removeItem(STORAGE_KEYS.mockAuth)
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  await delay(80)
  return readJson<AuthUser | null>(STORAGE_KEYS.mockAuth, null)
}

export function getDemoCredentials() {
  return {
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
  }
}

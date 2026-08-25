import type { AuthUser, LoginCredentials } from '@/types'
import { getSupabaseClient } from './client'

function toUser(id: string, email: string | undefined): AuthUser | null {
  if (!email) {
    return null
  }

  return { id, email }
}

export async function login({ email, password }: LoginCredentials): Promise<AuthUser> {
  const { data, error } = await getSupabaseClient().auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  const user = toUser(data.user.id, data.user.email)
  if (!user) {
    throw new Error('Could not load user data')
  }

  return user
}

export async function logout(): Promise<void> {
  const { error } = await getSupabaseClient().auth.signOut()
  if (error) {
    throw error
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data, error } = await getSupabaseClient().auth.getUser()
  if (error) {
    throw error
  }

  const user = data.user
  if (!user) {
    return null
  }

  return toUser(user.id, user.email)
}

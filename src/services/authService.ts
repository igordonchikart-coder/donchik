import { isSupabaseConfigured } from './config'
import * as mockAuth from './mock/auth'
import * as supabaseAuth from './supabase/auth'

const source = isSupabaseConfigured() ? supabaseAuth : mockAuth

export const authService = {
  login: source.login,
  logout: source.logout,
  getCurrentUser: source.getCurrentUser,
  isMock: !isSupabaseConfigured(),
  demoCredentials: isSupabaseConfigured() ? null : mockAuth.getDemoCredentials(),
}

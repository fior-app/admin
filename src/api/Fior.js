import Axios from "axios"

const BASE_URL = "http://localhost:8080"

export function signInWithEmail(email, password) {
  return Axios.post(`${BASE_URL}/auth/signin/email`, {
    email: email,
    password: password,
  })
}

export function getMe(token) {
  return Axios.get(`${BASE_URL}/users/me`, authHeader(token))
}

export function getSkills(token) {
  return Axios.get(`${BASE_URL}/skills`, authHeader(token))
}

// Utility
function authHeader(token) {
  return { headers: { Authorization: `Bearer ${token}` } }
}
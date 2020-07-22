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

// Skills
export function getSkills(token) {
  return Axios.get(`${BASE_URL}/skills`, authHeader(token))
}

export function getSkill(token, skillId) {
  return Axios.get(`${BASE_URL}/skills/${skillId}`, authHeader(token))
}

export function createSkill(token, name) {
  return Axios.post(`${BASE_URL}/skills`, { name }, authHeader(token))
}

export function deleteSkill(token, skillId) {
  return Axios.delete(`${BASE_URL}/skills/${skillId}`, authHeader(token))
}

export function getSkillQuestions(token, skillId) {
  return Axios.get(`${BASE_URL}/skills/${skillId}/fullQuestions`, authHeader(token))
}

export function createSkillQuestion(token, skillId, data) {
  return Axios.post(`${BASE_URL}/skills/${skillId}/questions`, data, authHeader(token))
}

export function updateSkillQuestion(token, skillId, questionId, data) {
  return Axios.patch(`${BASE_URL}/skills/${skillId}/questions/${questionId}`, data, authHeader(token))
}

export function deleteSkillQuestion(token, skillId, questionId) {
  return Axios.delete(`${BASE_URL}/skills/${skillId}/questions/${questionId}`, authHeader(token))
}

// Utility
function authHeader(token) {
  return { headers: { Authorization: `Bearer ${token}` } }
}
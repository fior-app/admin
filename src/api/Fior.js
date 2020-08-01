import Axios from "axios"
import { REACT_APP_API_BASE_URL }  from "../config"

const BASE_URL = REACT_APP_API_BASE_URL


export function signInWithEmail(email, password) {
  console.log(email, password)
  return Axios.post(`${BASE_URL}/auth/signin/email`, {
    email: email,
    password: password,
    scope: 'ADMIN'
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

// Admins
export function getAdmins(token) {
  return Axios.get(`${BASE_URL}/admins`, authHeader(token))
}

export function createAdmin(token, email) {
  return Axios.post(`${BASE_URL}/admins`, { email }, authHeader(token))
}

export function deleteAdmin(token, userId) {
  return Axios.delete(`${BASE_URL}/admins/${userId}`, authHeader(token))
}


// Utility
function authHeader(token) {
  return { headers: { Authorization: `Bearer ${token}` } }
}
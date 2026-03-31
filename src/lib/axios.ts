import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { authHandlers } from '@/mocks/handlers/authHandlers'
import { dashboardHandlers } from '@/mocks/handlers/dashboardHandlers'
import { transferHandlers } from '@/mocks/handlers/transferHandlers'

export const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

const mock = new MockAdapter(api, { delayResponse: 800 })

authHandlers(mock)
dashboardHandlers(mock)
transferHandlers(mock)

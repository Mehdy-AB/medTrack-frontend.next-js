// Re-export all API services for convenient imports
export { authApi } from './auth'
export { profileApi } from './profile'
export { coreApi } from './core'
export { evalApi } from './eval'
export { commApi } from './comm'

// Default export with all APIs
import { authApi } from './auth'
import { profileApi } from './profile'
import { coreApi } from './core'
import { evalApi } from './eval'
import { commApi } from './comm'

const services = {
    auth: authApi,
    profile: profileApi,
    core: coreApi,
    eval: evalApi,
    comm: commApi,
}

export default services

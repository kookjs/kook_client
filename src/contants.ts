import { getGlobalVariable } from '@kookjs-client/core'
import { IAppConfig } from './types'

export function getAppConfig(): IAppConfig {
  const global = getGlobalVariable()
  return APP_CONFIG as IAppConfig
}
import { IloginState } from './login/types'
import { ISystemState } from './main/system/types'
import { IDashboardState } from './main/analysis/types'

export interface IRootState {
  token: string
  entirDepartment: any[]
  entirRole: any[]
  entirMenu: any[]
}

export interface IRootAndLogin {
  login: IloginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStore = IRootState & IRootAndLogin

import { AppActions, AppTypes } from "store/types"

export const setLogoLoading = (loading: boolean): AppActions => ({
  type: AppTypes.SET_LOGO_LOADING,
  loading,
})

export const enableSmartScroll = (enable: boolean): AppActions => ({
  type: AppTypes.ENABLE_SMART_SCROLL,
  enable,
})

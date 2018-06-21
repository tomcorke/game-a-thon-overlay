import { action } from 'typesafe-actions'
import { View } from '../../types'

export const SET_VIEW = 'SET_VIEW'

export const setView = (view: View) => action(SET_VIEW, view)

export type ViewActions = ReturnType<
  | typeof setView
>

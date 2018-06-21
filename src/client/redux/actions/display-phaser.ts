import { action } from 'typesafe-actions'
import { DisplayPhaseData } from '../../types'

interface DisplayPhaseItem {
  phase: DisplayPhaseData
  delay: number
}

const displayPhaseSequence: DisplayPhaseItem[] = [
  {
    phase: {
      show: ['lastDonation'],
      phaseOut: [],
      hide: [],
      phaseIn: []
    },
    delay: 10000
  },
  {
    phase: {
      show: [],
      phaseOut: ['lastDonation'],
      hide: [],
      phaseIn: []
    },
    delay: 2000
  },
  {
    phase: {
      show: [],
      phaseOut: [],
      hide: ['lastDonation'],
      phaseIn: ['topDonation']
    },
    delay: 2000
  },
  {
    phase: {
      show: ['topDonation'],
      phaseOut: [],
      hide: ['lastDonation'],
      phaseIn: []
    },
    delay: 10000
  },
  {
    phase: {
      show: [],
      phaseOut: ['topDonation'],
      hide: ['lastDonation'],
      phaseIn: []
    },
    delay: 2000
  },
  {
    phase: {
      show: [],
      phaseOut: [],
      hide: [],
      phaseIn: ['lastDonation']
    },
    delay: 2000
  }
]

export const SET_DISPLAY_PHASE = 'SET_DISPLAY_PHASE'

export const setDisplayPhase = (phase: DisplayPhaseData) => action(SET_DISPLAY_PHASE, phase)

let phaseDisplayTimeout: number | undefined
let phaseIndex = -1

const nextPhase = (): DisplayPhaseItem => {
  phaseIndex = phaseIndex + 1
  if (phaseIndex >= displayPhaseSequence.length) phaseIndex = 0
  const newPhase = displayPhaseSequence[phaseIndex]
  return newPhase
}

export const initDisplayPhaser = () => {
  console.log('initDisplayPhaser')
  return (dispatch) => {

    if (phaseDisplayTimeout) return

    const goToNextPhase = () => {
      const phase = nextPhase()
      dispatch(setDisplayPhase(phase.phase))
      if (phaseDisplayTimeout) window.clearTimeout(phaseDisplayTimeout)
      phaseDisplayTimeout = window.setTimeout(goToNextPhase, phase.delay)
    }

    goToNextPhase()
  }
}

export type DisplayPhaserActions = ReturnType<
  | typeof setDisplayPhase
>

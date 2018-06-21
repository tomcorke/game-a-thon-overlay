import { Reducer } from 'redux'
import { PhasedDisplay, DisplayPhaseData, DisplayPhase, PHASED_DISPLAYS } from '../../types'
import { DisplayPhaserActions, SET_DISPLAY_PHASE } from '../actions/display-phaser'

export interface DisplayPhaserState {
  phase: DisplayPhaseData
  displayPhases: {
    [phasedDisplay: string]: DisplayPhase
  }
}

const initialState: DisplayPhaserState = {
  phase: {
    show: [],
    phaseOut: [],
    hide: [],
    phaseIn: []
  },
  displayPhases: {}
}

const handleSetDisplayPhase = (state: DisplayPhaserState, phase: DisplayPhaseData) => {
  return {
    ...state,
    phase,
    displayPhases: PHASED_DISPLAYS.reduce((allPhasedDisplays, phasedDisplay) => ({
      ...allPhasedDisplays,
      [phasedDisplay]: getPhaseForDisplay(phase, phasedDisplay)
    }), {})
  }
}

const displayPhaserReducer: Reducer<DisplayPhaserState, DisplayPhaserActions> = (state = initialState, action) => {
  switch (action.type) {
    case SET_DISPLAY_PHASE:
      return handleSetDisplayPhase(state, action.payload)
    default:
      return state
  }
}

export const getPhaseForDisplay = (phase: DisplayPhaseData, displayElement: PhasedDisplay): DisplayPhase => {
  if (phase.show.includes(displayElement)) return 'show'
  if (phase.phaseOut.includes(displayElement)) return 'phaseOut'
  if (phase.phaseIn.includes(displayElement)) return 'phaseIn'
  return 'hide'
}

export default displayPhaserReducer

export type View = 'admin' | 'display' | 'default'

export const VIEWS: View[] = ['admin', 'display', 'default']

export type DisplayPhase = 'show' | 'phaseOut' | 'hide' | 'phaseIn'

export const DISPLAY_PHASES: DisplayPhase[] = ['show', 'phaseOut', 'hide', 'phaseIn']

export type PhasedDisplay = 'lastDonation' | 'topDonation'

export const PHASED_DISPLAYS: PhasedDisplay[] = ['lastDonation', 'topDonation']

export interface DisplayPhaseData {
  show: PhasedDisplay[]
  phaseOut: PhasedDisplay[]
  hide: PhasedDisplay[]
  phaseIn: PhasedDisplay[]
}

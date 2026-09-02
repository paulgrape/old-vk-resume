import { describe, expect, it } from 'vitest'
import { getResumeRouteIdFromHash } from './resumeRoutes'

describe('getResumeRouteIdFromHash', () => {
  it('treats an empty hash as home', () => {
    expect(getResumeRouteIdFromHash('')).toBe('home')
    expect(getResumeRouteIdFromHash('#')).toBe('home')
    expect(getResumeRouteIdFromHash('#/')).toBe('home')
  })

  it('matches known resume paths', () => {
    expect(getResumeRouteIdFromHash('#/experience')).toBe('experience')
    expect(getResumeRouteIdFromHash('#/download-cv')).toBe('downloadCv')
  })

  it('returns null for unknown hashes', () => {
    expect(getResumeRouteIdFromHash('#/nope')).toBeNull()
    expect(getResumeRouteIdFromHash('#/home')).toBeNull()
  })
})

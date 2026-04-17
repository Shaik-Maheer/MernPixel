import { useEffect } from 'react'
import Lenis from 'lenis'

const SECTION_FOCUS_SELECTOR = 'main .section-shell'
const SECTION_VIDEO_SELECTOR = 'main section'
const SECTION_ENTRY_DIRECTIONS = ['left', 'right', 'bottom']

const SECTION_VIDEO_WORDS = [
  'one',
  'two',
  'three',
  'four',
  'five',
]

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const unique = (items) => [...new Set(items.filter(Boolean))]

const resolveSectionVideoSources = (index) => {
  const cycleIndex = index % SECTION_VIDEO_WORDS.length
  const cycleWordName = SECTION_VIDEO_WORDS[cycleIndex]
  const cycleNumber = cycleIndex + 1

  return unique([
    `/${cycleWordName}.mp4`,
    `/${cycleNumber}.mp4`,
    `/section-videos/${cycleWordName}.mp4`,
    `/section-videos/${cycleNumber}.mp4`,
    `/videos/${cycleWordName}.mp4`,
    `/videos/${cycleNumber}.mp4`,
    `/${cycleWordName}.mp4`,
    `/${cycleNumber}.mp4`,
  ])
}

export default function useSmoothScroll(routeKey) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }

    rafId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const targets = new Set()
    const videoHosts = new Set()
    let rafId = null
    let registerRafId = null

    const updateFocusState = (element) => {
      if (!element.isConnected) {
        return
      }

      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = viewportHeight / 2
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter)
      const focusRadius = Math.max(viewportHeight * 0.62, rect.height * 0.42, 220)
      const focus = clamp(1 - distanceFromCenter / focusRadius, 0, 1)

      element.style.setProperty('--section-focus', focus.toFixed(3))
      element.classList.toggle('is-near', focus > 0.42)
      element.classList.toggle('is-centered', focus > 0.78)
    }

    const updateAllTargets = () => {
      rafId = null
      targets.forEach((element) => {
        if (!element.isConnected) {
          targets.delete(element)
          return
        }
        updateFocusState(element)
      })
    }

    const scheduleUpdate = () => {
      if (rafId !== null) {
        return
      }
      rafId = window.requestAnimationFrame(updateAllTargets)
    }

    const applyEntryDirection = (element, index) => {
      const direction = SECTION_ENTRY_DIRECTIONS[index % SECTION_ENTRY_DIRECTIONS.length]
      let offsetX = '0px'
      let offsetY = '88px'

      if (direction === 'left') {
        offsetX = '-92px'
        offsetY = '0px'
      } else if (direction === 'right') {
        offsetX = '92px'
        offsetY = '0px'
      }

      element.style.setProperty('--section-enter-x', offsetX)
      element.style.setProperty('--section-enter-y', offsetY)
      element.setAttribute('data-enter-direction', direction)
    }

    const sectionHasOwnVideo = (section) => {
      return Boolean(
        section.classList.contains('page-intro')
          || section.classList.contains('intro-wrap')
          || section.classList.contains('contact-video-shell')
          || section.querySelector(':scope > video'),
      )
    }

    const appendBackgroundVideo = (section, index) => {
      if (section.querySelector(':scope > .section-video-bg')) {
        return
      }

      const wrapper = document.createElement('div')
      wrapper.className = 'section-video-bg'
      wrapper.setAttribute('aria-hidden', 'true')

      const video = document.createElement('video')
      video.className = 'section-video-el'
      video.autoplay = true
      video.muted = true
      video.loop = true
      video.playsInline = true
      video.preload = 'metadata'

      const sources = resolveSectionVideoSources(index)
      sources.forEach((src) => {
        const source = document.createElement('source')
        source.src = src
        source.type = 'video/mp4'
        video.appendChild(source)
      })

      wrapper.appendChild(video)
      section.prepend(wrapper)
    }

    const registerSectionVideos = () => {
      if (routeKey === '/') {
        return
      }

      const sections = document.querySelectorAll(SECTION_VIDEO_SELECTOR)
      let videoIndex = 0

      sections.forEach((section) => {
        if (sectionHasOwnVideo(section)) {
          return
        }

        section.classList.add('section-video-host')
        appendBackgroundVideo(section, videoIndex)
        videoHosts.add(section)
        videoIndex += 1
      })
    }

    const registerTargets = () => {
      registerSectionVideos()

      const elements = document.querySelectorAll(SECTION_FOCUS_SELECTOR)
      elements.forEach((element) => {
        if (targets.has(element)) {
          return
        }

        const parentSection = element.closest('section')
        const hasVideo = Boolean(
          parentSection
            && (
              parentSection.classList.contains('section-video-host')
              || sectionHasOwnVideo(parentSection)
            ),
        )

        applyEntryDirection(element, targets.size)
        targets.add(element)
        element.classList.add('scroll-focus-item')
        element.classList.toggle('scroll-focus-no-video', !hasVideo)
      })
      scheduleUpdate()
    }

    const scheduleRegisterTargets = () => {
      if (registerRafId !== null) {
        return
      }
      registerRafId = window.requestAnimationFrame(() => {
        registerRafId = null
        registerTargets()
      })
    }

    registerTargets()

    const mutationObserver = new MutationObserver(scheduleRegisterTargets)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('orientationchange', scheduleUpdate)

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
      if (registerRafId !== null) {
        window.cancelAnimationFrame(registerRafId)
      }

      mutationObserver.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('orientationchange', scheduleUpdate)

      targets.forEach((element) => {
        element.classList.remove('scroll-focus-item', 'scroll-focus-no-video', 'is-near', 'is-centered')
        element.style.removeProperty('--section-focus')
        element.style.removeProperty('--section-enter-x')
        element.style.removeProperty('--section-enter-y')
        element.removeAttribute('data-enter-direction')
      })

      videoHosts.forEach((section) => {
        section.classList.remove('section-video-host')
        section.querySelector(':scope > .section-video-bg')?.remove()
      })
    }
  }, [routeKey])
}

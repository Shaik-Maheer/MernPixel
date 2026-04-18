import { useEffect } from 'react'
import Lenis from 'lenis'

const SECTION_FOCUS_SELECTOR = 'main .section-shell'
const SECTION_ENTRY_DIRECTIONS = ['left', 'right', 'bottom']

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

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

    const registerTargets = () => {
      const elements = document.querySelectorAll(SECTION_FOCUS_SELECTOR)
      elements.forEach((element) => {
        if (targets.has(element)) {
          return
        }

        applyEntryDirection(element, targets.size)
        targets.add(element)
        element.classList.add('scroll-focus-item')
        element.classList.add('scroll-focus-no-video')
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
    }
  }, [routeKey])
}

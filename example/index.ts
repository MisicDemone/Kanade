import Kanade from '../src'

const kanade = new Kanade()

const play = (options: {
  pitch?: number
  duration?: number
  delay?: number
}) => {
  const { pitch = 0, duration = 1, delay = 0 } = options

  const startTime = kanade.audioContext.currentTime + delay
  const endTime = startTime + duration

  const source = kanade.createSource()
  kanade.connect()

  if (source instanceof OscillatorNode) {
    source.detune.value = pitch * 100
  }

  kanade.start(startTime)
  kanade.stop(endTime)
}
play({ pitch: 3, duration: 0.5, delay: 0 })
// play({ pitch: 5, duration: 0.5, delay: 1 })
// play({ pitch: 7, duration: 0.5, delay: 2 })
// play({ pitch: 8, duration: 0.5, delay: 3 })
// play({ pitch: 10, duration: 0.5, delay: 4 })
// play({ pitch: 12, duration: 0.5, delay: 5 })
// play({ pitch: 14, duration: 0.5, delay: 6 })
// play({ pitch: 15, duration: 0.5, delay: 7 })

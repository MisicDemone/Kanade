import { isElement } from 'lodash'

interface OscillatorOptions {
  type?: any,
  frequency?: number,
  detune?: number,
  periodicWave?: PeriodicWave
}

class Kanade {
  audioContext: AudioContext
  source: MediaElementAudioSourceNode | AudioBufferSourceNode | OscillatorNode | MediaStreamAudioSourceNode
  connectedNode: AudioNode
  gainNode: GainNode

  constructor (input?: AudioBuffer | HTMLMediaElement | MediaStream) {
    this.audioContext = new AudioContext()
    if (typeof input !== 'undefined') {
      this.createSource(input)
    }
  }

  createSource (input: AudioBuffer | HTMLMediaElement | MediaStream) {
    if (input instanceof HTMLMediaElement) {
      this.source = this.audioContext.createMediaElementSource(input)
    } else if (input instanceof AudioBuffer) {
      this.source = this.audioContext.createBufferSource()
      if (this.source instanceof AudioBufferSourceNode) {
        this.source.buffer = input
      }
    } else if (input instanceof MediaStream) {
      this.source = this.audioContext.createMediaStreamSource(input)
    } else {
      throw new Error('The parameter type of function "createSource()" must be HTMLMediaElement or AudioBuffer or MediaStream!')
    }
    this.connectedNode = this.source
  }

  createOscillatorNode (options: OscillatorOptions) {
    this.source = this.audioContext.createOscillator()
    if (options && this.source instanceof OscillatorNode) {
      options.type && (this.source.type = options.type)
      options.frequency && (this.source.frequency.value = options.frequency)
      options.detune && (this.source.detune.value = options.detune)
      options.periodicWave && (this.source.setPeriodicWave(options.periodicWave))
    }
    this.connectedNode = this.source
  }

  createGainNode () {
    this.gainNode = this.audioContext.createGain()
    this.connectedNode.connect(this.gainNode)
    this.connectedNode = this.gainNode
  }

  connectDestination () {
    this.connectedNode.connect(this.audioContext.destination)
  }

  start (startTime: number) {
    if ((this.source instanceof AudioBufferSourceNode) || (this.source instanceof OscillatorNode)) {
      this.source.start(startTime)
    }
  }

  stop (stopTime: number) {
    if ((this.source instanceof AudioBufferSourceNode) || (this.source instanceof OscillatorNode)) {
      this.source.stop(stopTime)
    }
  }

}

export default Kanade
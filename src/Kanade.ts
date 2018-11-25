import { isElement } from 'lodash'
import { capitalize } from './utils'
import { OscillatorOptions, nodeType } from './defs'

class Kanade {
  audioContext: AudioContext
  source: MediaElementAudioSourceNode | AudioBufferSourceNode | OscillatorNode | MediaStreamAudioSourceNode
  nodes: Array<AudioNode>
  nodeType: nodeType

  constructor (input?: AudioBuffer | HTMLMediaElement | MediaStream) {
    this.audioContext = new AudioContext()
    if (typeof input !== 'undefined') {
      this.createSource(input)
    }
  }

  createSource (input?: AudioBuffer | HTMLMediaElement | MediaStream) {
    if (input instanceof HTMLMediaElement) {
      this.source = this
        .audioContext
        .createMediaElementSource(input)
    } else if (input instanceof AudioBuffer) {
      this.source = this
        .audioContext
        .createBufferSource()
      if (this.source instanceof AudioBufferSourceNode) {
        this.source.buffer = input
      }
    } else if (input instanceof MediaStream) {
      this.source = this
        .audioContext
        .createMediaStreamSource(input)
    } else {
      this.source = this.createOscillatorNode()
    }
    return this.source
  }

  createOscillatorNode (options?: OscillatorOptions) {
    const oscillatorNode = this.audioContext.createOscillator()
    if (options) {
      options.type && (oscillatorNode.type = options.type)
      options.frequency && (oscillatorNode.frequency.value = options.frequency)
      options.detune && (oscillatorNode.detune.value = options.detune)
      options.periodicWave && (oscillatorNode.setPeriodicWave(options.periodicWave))
    }
    return oscillatorNode
  }

  createNode (node: nodeType | AudioNode, options?: object) {
    let audioNode: AudioNode
    if (typeof node === 'string') {
      audioNode = this.audioContext[`create${capitalize(node)}`](options)
    } else if (node instanceof AudioNode) {
      audioNode = node
    } else {
      throw new Error('Kanade: Function "createNode" must have an argument to indicate which node to create.')
    }
    return audioNode
  }

  // connectDestination () {
  //   this
  //     .connectedNode
  //     .connect(this.audioContext.destination)
  // }

  // start (startTime: number) {
  //   if ((this.source instanceof AudioBufferSourceNode) || (this.source instanceof OscillatorNode)) {
  //     this
  //       .source
  //       .start(startTime)
  //   }
  // }

  // stop (stopTime: number) {
  //   if ((this.source instanceof AudioBufferSourceNode) || (this.source instanceof OscillatorNode)) {
  //     this
  //       .source
  //       .stop(stopTime)
  //   }
  // }

}

export default Kanade

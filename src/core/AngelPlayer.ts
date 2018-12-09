import { OscillatorOptions, nodeType } from '../utils/defs'

export default class AngelPlayer {
  audioContext: AudioContext
  source:
    | MediaElementAudioSourceNode
    | AudioBufferSourceNode
    | OscillatorNode
    | MediaStreamAudioSourceNode
  nodes: Array<AudioNode>
  destination: AudioDestinationNode

  nodeType = nodeType

  constructor (input?: AudioBuffer | HTMLMediaElement | MediaStream) {
    this.audioContext = new AudioContext()
    this.destination = this.audioContext.destination
    this.nodes = []
    if (typeof input !== 'undefined') {
      this.createSource(input)
    }
  }

  createSource (
    input?: AudioBuffer | HTMLMediaElement | MediaStream | OscillatorOptions
  ) {
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
      const oscillatorConfig = input || {}
      this.source = this.createOscillatorNode(oscillatorConfig)
    }
    return this.source
  }

  createOscillatorNode (options?: OscillatorOptions) {
    const oscillatorNode = this.audioContext.createOscillator()
    if (options) {
      options.type && (oscillatorNode.type = options.type)
      options.frequency && (oscillatorNode.frequency.value = options.frequency)
      options.detune && (oscillatorNode.detune.value = options.detune)
      options.periodicWave &&
        oscillatorNode.setPeriodicWave(options.periodicWave)
    }
    return oscillatorNode
  }

  createNode<N extends AudioNode> (node: nodeType | N, options?: object) {
    let audioNode: AudioNode
    if (typeof node === 'string') {
      switch (node) {
        case nodeType.Gain:
          audioNode = this.audioContext.createGain()
          break
        default:
          throw new Error(
            'Kanade: Function "createNode" got a nonexistent node type.'
          )
      }
    } else if (node instanceof AudioNode) {
      audioNode = node
    } else {
      throw new Error(
        'Kanade: Function "createNode" must have an argument to indicate which node to create.'
      )
    }
    this.nodes.push(audioNode)
    return audioNode
  }

  connect () {
    this.nodes
      .reduce((lastNode, currentNode) => {
        lastNode.connect(currentNode)
        return currentNode
      }, this.source)
      .connect(this.destination)
  }

  start (startTime: number) {
    if (
      this.source instanceof AudioBufferSourceNode ||
      this.source instanceof OscillatorNode
    ) {
      this.source.start(startTime)
    }
  }

  stop (stopTime: number) {
    if (
      this.source instanceof AudioBufferSourceNode ||
      this.source instanceof OscillatorNode
    ) {
      this.source.stop(stopTime)
    }
  }
}

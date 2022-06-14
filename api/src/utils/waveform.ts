import { exec } from "child_process"
import { File } from "formidable"
import { max } from "lodash"

export const createAudioWaveformData = (file: File) => {
  return new Promise<number[]>((resolve, reject) => {
    const command = `audiowaveform -i ${file.path} --output-format json -z 100 -b 8`
    exec(command, { maxBuffer: 1024 * 1024 * 50 }, (error, stdout) => {
      if (error) reject(error)

      try {
        const result = JSON.parse(stdout)
        const samples = 200
        const data = result.data
        const normalizedData = []
        const filteredData = []
        const blockSize = Math.floor(data.length / samples)

        for (let i = 0; i < samples; i++) {
          const blockStart = blockSize * i // the location of the first sample in the block
          let sum = 0
          for (let j = 0; j < blockSize; j++) {
            sum = sum + Math.abs(data[blockStart + j]) // find the sum of all the samples in the block
          }
          filteredData.push(sum / blockSize)
        }

        const maxValue = max(filteredData)

        for (let i = 0; i < samples; i++) {
          normalizedData.push(filteredData[i] / maxValue)
        }
        const multiplier = Math.pow(Math.max(...normalizedData), -1)
        resolve(normalizedData.map((n) => n * multiplier))
      } catch (ex) {
        reject(ex)
      }
    })
  })
}

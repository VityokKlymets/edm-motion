import request from "request-promise"
import { createReadStream } from "fs"

interface IAudio {
  duration: number
  file_id: string
}
interface IResult {
  message_id: number
  data: number
  audio: IAudio
}
interface IFileResult {
  file_id: string
  file_unique_id: string
  file_size: number
  file_path: string
}
interface ITelegramMessage {
  ok: boolean
  error?: any
}
interface IFileSendMessage extends ITelegramMessage {
  result: IResult
}
interface IFileMessage extends ITelegramMessage {
  result: IFileResult
}

export default class TelegramUploader implements IFileUploader {
  private token = "1045312089:AAFBUfdjlcbk8Ude5FHy4OxZkOFuwDlges8"
  private chatId = "716487473"

  public async upload(file: string): Promise<IFileUploaderResponse> {
    const stream = createReadStream(file)
    const response = await this.post("sendAudio", {
      chat_id: this.chatId,
      audio: stream,
    })
    const message: IFileSendMessage = JSON.parse(response)
    if (message.ok) {
      const { file_id } = message.result.audio

      return {
        status: "ok",
        path: file_id,
      }
    } else {
      return {
        status: "error",
        error: message.error,
      }
    }
  }

  public async load(path: string): Promise<IFileUploaderResponse> {
    const response = await this.post("getFile", {
      chat_id: this.chatId,
      file_id: path,
    })
    const message: IFileMessage = JSON.parse(response)
    if (message.ok) {
      const { file_path } = message.result
      return { status: "ok", path: this.getFileUrl(file_path) }
    } else {
      return {
        status: "error",
      }
    }
  }

  private async post(endpoint: string, formData: object) {
    try {
      const response = await request({
        method: "POST",
        uri: `${this.API_URL}/${endpoint}`,
        formData,
      })
      return response
    } catch (error) {
      const response: ITelegramMessage = {
        ok: false,
        error,
      }
      return response
    }
  }

  private getFileUrl(filePath: string) {
    return `https://api.telegram.org/file/bot${this.token}/${filePath}`
  }

  private get API_URL() {
    return `https://api.telegram.org/bot${this.token}`
  }
}

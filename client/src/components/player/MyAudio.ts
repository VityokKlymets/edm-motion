export default class MyAudio {
  private static audio: HTMLAudioElement = null
  private static pausePosition = 0

  public static init() {
    if (MyAudio.audio === null) {
      MyAudio.audio = new Audio()
    }
  }

  public static play(url?: string) {
    if (url && MyAudio.audio.src !== url) {
      MyAudio.audio.src = url
      MyAudio.pausePosition = 0
    }
    MyAudio.audio.currentTime = MyAudio.pausePosition
    const playPromise = MyAudio.audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Automatic playback started!
          // Show playing UI.
        })
        .catch((error) => {
          // Auto-play was prevented
          // Show paused UI.
        })
    }
  }

  public static pause() {
    MyAudio.audio.pause()
    MyAudio.pausePosition = MyAudio.audio.currentTime
  }

  public static addEvent(type, func) {
    MyAudio.audio.addEventListener(type, func, true)
  }

  public static removeEvent(type, func) {
    MyAudio.audio.removeEventListener(type, func, true)
  }

  public static getProgress() {
    const progress = MyAudio.audio.currentTime / MyAudio.audio.duration
    return isNaN(progress) ? 0 : progress
  }

  public static setProgress(progress: number) {
    const { duration } = MyAudio.audio
    const position = duration * progress
    if (isFinite(position)) {
      MyAudio.pausePosition = position
      MyAudio.audio.currentTime = position
    }
  }

  public static getDuration() {
    return MyAudio.timeToString(MyAudio.audio.duration)
  }

  public static getTime() {
    return MyAudio.timeToString(MyAudio.audio.currentTime)
  }
  public static getVolume() {
    return MyAudio.audio.volume
  }
  public static setVolume(volume) {
    MyAudio.audio.volume = volume
  }
  public static setTime(percent) {
    const time = this._percentToTime(percent)
    if (isFinite(time)) {
      MyAudio.audio.currentTime = time
    }
  }

  private static _percentToTime(percent) {
    return MyAudio.audio.duration * (percent / 100)
  }

  public static timeToString(time: number) {
    const minutes = Math.trunc(time / 60)
    const seconds = Math.trunc(time - minutes * 60)
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }
}

export class Timer {
  onStart: any;
  onStop: any;
  onChange: any;
  _totalTime: any;
  _intervalTimer: ReturnType<typeof setTimeout> | null;
  _timeRemaining: any;
  _stopPoint: any;
  _audioTimers: ReturnType<typeof setTimeout>[] = [];
  _stopTimer?: ReturnType<typeof setTimeout> = undefined;

  _soundsNumber = 5;
  _soundsIntervalMilis = 500;

  TICK_MS = 10;

  _tickSound = new Audio('tick.wav');

  noop = () => {}; // Define in ES6 as Lambda (arrow function)

  constructor(opts: any) {
    this.onStart = opts.onStart || this.noop;
    this.onStop = opts.onStop || this.noop;
    this.onChange = opts.onChange || this.noop;
    this._totalTime = opts.totalTime || null;
    this._intervalTimer = null;
    this._timeRemaining = this._totalTime;
    this._soundsNumber = opts.soundsNumber || 5;
    this._soundsIntervalMilis;
    this._tickSound = opts.tickSound || this._tickSound;
    opts.soundsInteval || 500;
  }

  playTick() {
    this._tickSound.play();
  }

  isActive() {
    return this._intervalTimer !== null;
  }
  toggle() {
    if (this.isActive()) {
      this.stop();
    } else {
      this.start();
    }
  }
  start() {
    if (!this.isActive()) {
      const sound = this._tickSound;
      this._stopPoint = Date.now() + this._totalTime;
      this._audioTimers = [];
      for (var i = 0; i < this._soundsNumber; i++) {
        this._audioTimers.push(
          setTimeout(
            function () {
              sound.play();
              // TODO - sound the tick
              // audios[soundTypeDropdown.value].play();
            },
            this._totalTime - i * this._soundsIntervalMilis,
          ),
        );
      }
      this._intervalTimer = setInterval(this._tick.bind(this), this.TICK_MS);
      this._stopTimer = setTimeout(this.stop.bind(this), this._totalTime);
      this.onStart();
      this.onChange();
    }
  }
  stop() {
    if (this.isActive()) {
      this._audioTimers.forEach(clearTimeout);
      this._audioTimers = [];
      if (this._intervalTimer) {
        clearInterval(this._intervalTimer);
      }
      clearTimeout(this._stopTimer);
      this._intervalTimer = null;
      this._timeRemaining = this._totalTime;
      this.onStop();
      this.onChange();
    }
  }
  getTimeRemaining() {
    return this._timeRemaining;
  }
  getTotalTime() {
    return this._totalTime;
  }
  setTotalTime(ms: number) {
    this._totalTime = ms;
    if (!this.isActive()) {
      this._timeRemaining = ms;
    }
    this.onChange();
  }
  _tick() {
    if (this._intervalTimer) {
      this._timeRemaining = this._stopPoint - Date.now();
      this.onChange();
    }
  }
}

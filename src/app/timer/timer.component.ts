import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Timer } from './timer';
import { MilisToSecondsPipe } from '../milis-to-seconds.pipe';

@Component({
  selector: 'app-timer',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MilisToSecondsPipe],
  templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit {
  secondsControl = new FormControl(5, Validators.required);

  readonly $startStopButtonText = signal<string>('Start');
  readonly $timeRemaining = signal<number>(0);

  readonly DEFAULT_TIME_MILIS = 5000;

  timer = this.getTimer();

  ngOnInit() {
    this.$timeRemaining.set(this.DEFAULT_TIME_MILIS);
    this.secondsControl.valueChanges.subscribe((value) => {
      if (value) {
        this.timer = this.getTimer(value * 1000);
        this.$timeRemaining.set(value * 1000);
      }
    });
  }

  getTimer(
    totalTime = this.DEFAULT_TIME_MILIS,
    buttonTextSignal = this.$startStopButtonText,
    timeRemainingSignal = this.$timeRemaining,
  ) {
    return new Timer({
      onStart() {
        buttonTextSignal.set('Reset');
      },
      onStop() {
        buttonTextSignal.set('Start');
      },
      onChange() {
        timeRemainingSignal.set(this.getTimeRemaining());
      },
      totalTime: totalTime,
    });
  }

  toggleTimer() {
    this.timer.toggle();
  }

}

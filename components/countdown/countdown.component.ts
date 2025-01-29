import { Component, OnInit, Output, Input, EventEmitter, HostBinding, OnDestroy } from '@angular/core';
import {
  differenceInYears, differenceInMonths, differenceInDays,
  differenceInHours, differenceInMinutes,
  differenceInSeconds, addMonths,
  addYears, addDays, addHours, addMinutes
} from 'date-fns';
import { CommonModule } from '@angular/common';
import { HeadingComponentConfig } from '@rapider/angular-components/core/heading';
import { RappiderHeadingModule } from '@rapider/angular-components/heading/heading.module';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { ColorConfig } from '@rapider/angular-components/core/style';

@Component({
  selector: 'rappider-countdown',
  imports: [
    CommonModule,
    NzStatisticModule,
    RappiderHeadingModule
  ],
  standalone: true,
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class RappiderCountdownComponent implements OnInit, OnDestroy {

  /* data to emit */
  @Input() data: any;
  @Input() deadline: string | number;
  @Input() title: HeadingComponentConfig = {};
  @Input() format: string;
  @Input() prefix: string;
  @Input() timeTextTypography: TypographyConfig;
  @Input() timeTextColorSettings: ColorConfig;

  @Output() complete = new EventEmitter();

  @HostBinding('style.--countdown-color') color;
  @HostBinding('style.--countdown-background-color') backgroundColor;
  @HostBinding('style.--countdown-font-size') fontSize;
  @HostBinding('style.--countdown-font-weight') fontWeight;
  @HostBinding('style.--countdown-font-style') fontStyle;
  @HostBinding('style.--countdown-text-decaration') textDecoration;
  @HostBinding('style.--countdown-text-align') textAlign;
  @HostBinding('style.--countdown-text-shadow') textShadow;
  @HostBinding('style.--countdown-font-family') fontFamily;
  @HostBinding('style.--countdown-font-stretch') fontStretch;
  @HostBinding('style.--countdown-text-indent') textIndent;
  @HostBinding('style.--countdown-letter-spacing') letterSpacing;
  @HostBinding('style.--countdown-line-height') lineHeight;
  @HostBinding('style.--countdown-word-spacing') wordSpacing;
  @HostBinding('style.--countdown-text-transform') textTransform;
  @HostBinding('style.--countdown-user-select') userSelect;

  yearsDiff: number;
  monthsDiff: number;
  daysDiff: number;
  hoursDiff: number;
  minutesDiff: number;
  secondsDiff: number;
  private animationFrameId: number;

  ngOnInit(): void {

    this.deadline = this.deadline ? Date.parse(this.deadline.toString()) : null;
    this.startCountdown();

    if (this.timeTextColorSettings || this.timeTextTypography) {
      this.setTimeTextConfig();
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  startCountdown() {
    const updateCountdown = () => {
      this.calculateMoment(this.deadline);

      if (this.yearsDiff <= 0 && this.monthsDiff <= 0 && this.daysDiff <= 0 &&
        this.hoursDiff <= 0 && this.minutesDiff <= 0 && this.secondsDiff <= 0) {
        this.onCountdownFinish();
      } else {
        this.animationFrameId = requestAnimationFrame(updateCountdown);
      }
    };

    this.animationFrameId = requestAnimationFrame(updateCountdown);
  }

  onCountdownFinish() {
    this.complete.emit(this.data);
    cancelAnimationFrame(this.animationFrameId);
  }

  setTimeTextConfig() {
    this.color = this.timeTextColorSettings?.color;
    this.backgroundColor = this.timeTextColorSettings?.backgroundColor;
    this.fontSize = this.timeTextTypography?.fontSize;
    this.fontWeight = this.timeTextTypography?.fontWeight;
    this.fontStyle = this.timeTextTypography?.fontStyle;
    this.textDecoration = this.timeTextTypography?.textDecoration;
    this.textAlign = this.timeTextTypography?.textAlign;
    this.textShadow = this.timeTextTypography?.textShadow;
    this.fontFamily = this.timeTextTypography?.fontFamily;
    this.fontStretch = this.timeTextTypography?.fontStretch;
    this.textIndent = this.timeTextTypography?.textIndent;
    this.letterSpacing = this.timeTextTypography?.letterSpacing;
    this.lineHeight = this.timeTextTypography?.lineHeight;
    this.wordSpacing = this.timeTextTypography?.wordSpacing;
    this.textTransform = this.timeTextTypography?.textTransform;
    this.userSelect = this.timeTextTypography?.userSelect;
  }

  calculateMoment(deadline: string | number) {
    const startDate = new Date();
    const endDate = new Date(deadline);

    this.yearsDiff = differenceInYears(endDate, startDate);
    const totalMonthsDifference = differenceInMonths(endDate, startDate);

    this.monthsDiff = totalMonthsDifference - (this.yearsDiff * 12);

    const adjustedStartDate = addMonths(addYears(startDate, this.yearsDiff), this.monthsDiff);
    this.daysDiff = differenceInDays(endDate, adjustedStartDate);

    const adjustedStartDateWithDays = addDays(adjustedStartDate, this.daysDiff);
    this.hoursDiff = differenceInHours(endDate, adjustedStartDateWithDays);

    const adjustedStartDateWithHours = addHours(adjustedStartDateWithDays, this.hoursDiff);
    this.minutesDiff = differenceInMinutes(endDate, adjustedStartDateWithHours);

    const adjustedStartDateWithMinutes = addMinutes(adjustedStartDateWithHours, this.minutesDiff);
    this.secondsDiff = differenceInSeconds(endDate, adjustedStartDateWithMinutes);
  }
}

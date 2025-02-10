import { FontAwesomeIconAnimation } from '@rapider/angular-components/core/icon';
import { SelectComponentConfig } from '@rapider/angular-components/select';

export const fontAwesomeIconAnimationOptionsConfig: SelectComponentConfig = {
  options: [
    {
      value: FontAwesomeIconAnimation.None,
      key: 'No Animation'
    },
    {
      value: FontAwesomeIconAnimation.Beat,
      key: 'Beat'
    },
    {
      value: FontAwesomeIconAnimation.BeatFade,
      key: 'Beat Fade'
    },
    {
      value: FontAwesomeIconAnimation.Bounce,
      key: 'Bounce'
    },
    {
      value: FontAwesomeIconAnimation.Fade,
      key: 'Fade'
    },
    {
      value: FontAwesomeIconAnimation.Flip,
      key: 'Flip'
    },
    {
      value: FontAwesomeIconAnimation.Shake,
      key: 'Shake'
    },
    {
      value: FontAwesomeIconAnimation.Spin,
      key: 'Spin'
    },
    {
      value: FontAwesomeIconAnimation.SpinReverse,
      key: 'Spin Reverse'
    },
    {
      value: FontAwesomeIconAnimation.SpinPulse,
      key: 'Spin Pulse'
    }
  ]
};

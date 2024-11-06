import { delay, duration } from './duration';

export const delayDuration = duration({ seconds: 0.5 });

export const delayAction = async () => await delay({ second: 1 });

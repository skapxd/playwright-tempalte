import { delay, duration } from './duration';

export const delayDuration = duration({ seconds: 0 });

export const delayAction = async () => await delay({ seconds: 0 });

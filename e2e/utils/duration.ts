import { Duration, DurationLikeObject } from 'luxon'

export const duration = (props: DurationLikeObject) => {
  return Duration.fromObject(props).as('milliseconds')
}

export const delay = async (props: DurationLikeObject) =>
  await new Promise((resolve) => setTimeout(resolve, duration(props)))

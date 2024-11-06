import { join } from 'path'

export const getPath = (fileName: string) => join(process.cwd(), 'e2e/assets', fileName)

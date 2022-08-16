import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
// 解析
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
dayjs.extend(utc)

const DATA_TIME_FORMAR = 'YYYY/MM/DD HH:mm:ss'

export function formatUtcString(utcString: string, format: string = DATA_TIME_FORMAR) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}

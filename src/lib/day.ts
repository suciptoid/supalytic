import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import between from 'dayjs/plugin/isBetween';

dayjs.extend(utc);
dayjs.extend(between);

export { dayjs as day, dayjs as default };

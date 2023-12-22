import React, {useMemo} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const useDayjs = () => {
  const useCountdown = (endTime: Dayjs, setTime: (str: string) => void) =>
    useMemo(() => {
      let currentTime = dayjs();
      let diffTime = endTime.unix() - currentTime.unix();

      let duration = dayjs.duration(diffTime * 1000, 'milliseconds');
      let interval = 1000;
      const twoDP = (n: number) => (n > 9 ? n : '0' + n);

      setInterval(function () {
        duration = dayjs.duration(
          duration.asMilliseconds() - interval,
          'milliseconds',
        );
        let timestamp = `${
          duration.days() && duration.days() + '일 '
        }${duration.hours()}:${twoDP(duration.minutes())}:${twoDP(
          duration.seconds(),
        )}`;
        setTime(timestamp);
      }, interval);
    }, [endTime, setTime]);
  return {useCountdown};
};

export default useDayjs;

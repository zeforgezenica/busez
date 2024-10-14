import dayjs from 'dayjs';

export const getGrammaticalForm = (
  count: number,
  singular: string,
  few: string,
  plural: string
) => {
  const remainder = count % 10;
  const isTeens = count % 100 >= 11 && count % 100 <= 19;
  if (remainder === 1 && !isTeens) return singular;
  if (remainder >= 2 && remainder <= 4 && !isTeens) return few;
  return plural;
};

export const calculateETA = (
  currentTime: string,
  departureTime: string,
  setEta: (eta: string) => void
): number | null => {
  const current = dayjs();
  const departure = dayjs(
    `${current.format('YYYY-MM-DD')} ${departureTime}`,
    'YYYY-MM-DD HH:mm'
  );

  if (departure.isBefore(current)) {
    setEta('Vrijeme polaska je prošlo.');
    return null;
  } else {
    const totalSecondsDiff = departure.diff(current, 'second');
    const remainingMinutes = Math.floor(totalSecondsDiff / 60);

    const hours = Math.floor(totalSecondsDiff / 3600);
    const minutes = Math.floor((totalSecondsDiff % 3600) / 60);
    const seconds = totalSecondsDiff % 60;

    let etaString = '';
    if (hours > 0)
      etaString += `${hours} ${getGrammaticalForm(
        hours,
        'sat',
        'sata',
        'sati'
      )} `;
    if (minutes > 0 || hours > 0)
      etaString += `${minutes} ${getGrammaticalForm(
        minutes,
        'minuta',
        'minute',
        'minuta'
      )} `;
    if (hours === 0 && minutes < 60)
      etaString += `${seconds} ${getGrammaticalForm(
        seconds,
        'sekunda',
        'sekunde',
        'sekundi'
      )}`;

    setEta(etaString);
    return remainingMinutes;
  }
};

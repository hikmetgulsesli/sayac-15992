export function formatTime(date: Date, locale: string = 'tr-TR'): string {
  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function formatDate(date: Date, locale: string = 'tr-TR'): string {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(date: Date, locale: string = 'tr-TR'): string {
  return `${formatDate(date, locale)} ${formatTime(date, locale)}`;
}

export function getRelativeTimeString(date: Date, locale: string = 'tr-TR'): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return 'az önce';
  } else if (diffMin < 60) {
    return `${diffMin} dakika önce`;
  } else if (diffHour < 24) {
    return `${diffHour} saat önce`;
  } else if (diffDay < 7) {
    return `${diffDay} gün önce`;
  } else {
    return formatDate(date, locale);
  }
}

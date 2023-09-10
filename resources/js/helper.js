export function parseParams(urlString) {
  const startIndex = urlString.indexOf('?');

  if (startIndex === -1) return {}
  
  const queryString = urlString.substring(startIndex + 1);
  const queryParams = {};
  queryString.split('&').forEach((param) => {
      const [key, value] = param.split('=');
      queryParams[key] = value || '';
  });

  return queryParams
}

export function dateFixer(datetimeFromParams) {
  if(!datetimeFromParams) return null;
  return decodeURIComponent(datetimeFromParams.replace(/\+/g, '%20'))
}

export function dateFormatter(dateString) {
  const months = [
    "Januari", "Februari", "Maret", "April",
    "Mei", "Juni", "Juli", "Agustus",
    "September", "Oktober", "November", "Desember"
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
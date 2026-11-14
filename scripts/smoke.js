import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  maxRedirects: 0,
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800'],
    checks: ['rate>0.99'],
  },
};

const BASE_URL = 'https://quickpizza.grafana.com';

export default function () {
  const res = http.get(`${BASE_URL}/api/quotes`);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'is JSON': (r) => (r.headers['Content-Type'] || '').includes('application/json'),
    'has quotes': (r) => Array.isArray(r.json().quotes) && r.json().quotes.length > 0,
  });
  sleep(1);
}

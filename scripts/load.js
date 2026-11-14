import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800'],
    checks: ['rate>0.99'],
  },
};

const BASE_URL = 'https://test-api.k6.io';

export default function () {
  const list = http.get(`${BASE_URL}/public/crocodiles/`);
  check(list, {
    'list status is 200': (r) => r.status === 200,
  });

  const one = http.get(`${BASE_URL}/public/crocodiles/1/`);
  check(one, {
    'detail status is 200': (r) => r.status === 200,
    'detail has id 1': (r) => Number(r.json().id) === 1,
  });

  sleep(1);
}

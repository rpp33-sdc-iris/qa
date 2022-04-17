import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    // { duration: '30s', target: 1, rps: 200 },
    // { duration: '30s', target: 10 },
    { duration: '30s', target: 2400, rps: 10000 },
    // { duration: '30s', target: 500 },
    // { duration: '30s', target: 1000 },
    // { duration: '30s', target: 2000 },
    // { duration: '30s', target: 2300 },
  ],
};

export default function () {
  // const res = http.get('http://localhost:5000/qa/questions/?product_id=97969');
  // check(res, { 'status was 200': (r) => r.status === 200 });

  const res = http.get('http://localhost:5000/qa/questions/3418400/answers');
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}

import autocannon from 'autocannon';

const instance = autocannon({
  url: 'http://localhost:3000/api/reviews',
  connections: 10,
  pipelining: 1,
  duration: 10,
  method: 'GET'
}, console.log)

autocannon.track(instance, { renderProgressBar: true })

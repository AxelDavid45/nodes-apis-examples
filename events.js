import { EventEmitter, errorMonitor, captureRejectionSymbol } from 'node:events';

const ee1 = new EventEmitter()
let count = 0;

ee1.on(errorMonitor, function (err) {
  console.error('An error occurred, errorMonitoring', err)
  console.error('Finishing process')
  process.exit(1);
});

// unhandleRejection
ee1[captureRejectionSymbol] = console.log

ee1.on('callbackSum', (callback) => {
  try {
    callback(count)
    count++;
  } catch (error) {
    ee1.emit('error', error)
  }
})

ee1.emit('callbackSum', (n) => {
  console.log('Prueba callback');
  let x = n;
  console.log('Number received', n)
  ++x;
  console.log(x)
  x++;
  console.log(x)
  throw new Error('Callback failed');
})

// Crea un script que utilice el eventEmmitter
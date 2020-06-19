const timer = require('../Scripts/timer');

var interval = 0;

test ('pause the timer and change text on START button', () => {
     expect(timer.stopButton()).toBe(clearInterval(interval));
});
var Gpio = require('onoff').Gpio;

class Controller {
  constructor() {
    this.actuator1 = new Gpio(4, 'out');
  }

  exec() {
    console.log('Executing...');
    if (this.actuator1.readSync() === 0) {
      this.actuator1.writeSync(1);
    } else {
      this.actuator1.writeSync(0);
    }
  }

  unexportOnClose() {
    process.on('SIGINT', function() {
      this.actuator1.writeSync(0);
      this.actuator1.unexport();
    });
  }
}

var controller = new Controller();
controller.exec();
controller.unexportOnClose();

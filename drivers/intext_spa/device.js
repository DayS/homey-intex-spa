'use strict';

const Homey = require('homey');
const { commandTopicFromCapability, commandMapperFromCapability, capabilityFromMeasureTopic, measureMapperFromCapability } = require('../../lib/capabilities');

class IntexDevice extends Homey.Device {

  async onInit() {
    let settings = this.getSettings();
    this.log(`Setting: ${JSON.stringify(settings)}`);
    this.log(`Capabilities: ${JSON.stringify(this.getCapabilities())}`);

    const capabilities = this.getCapabilities();
    for (const capability of capabilities) {
      this.log(`Registering listener for capability: ${capability}`);

      this.registerCapabilityListener(capability, async (value) => {
        const topic = commandTopicFromCapability(capability);
        const mapper = commandMapperFromCapability(capability);

        this.log(`Sending message to topic: ${topic}, value: ${mapper(value)}`);
        await this.driver.sendMessage(topic, mapper(value));
      });
    }
  }

  onMessage(topic, message) {
    const capability = capabilityFromMeasureTopic(topic);
    if (!capability) {
      return;
    }

    const mapper = measureMapperFromCapability(capability);

    this.log(`Received message from topic: ${topic}, value: ${message}`);

    this.setCapabilityValue(capability, mapper(message)).catch(this.error);
  }
}

module.exports = IntexDevice;
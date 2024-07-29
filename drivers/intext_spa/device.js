'use strict';

const Homey = require('homey');
const { commandTopicFromCapability, commandMapperFromCapability, capabilitiesFromMeasureTopic, measureMapperFromCapability } = require('../../lib/capabilities');

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
        const mqttValue = mapper(value);

        this.log(`Sending message to topic: ${topic}, value: ${mqttValue}`);
        await this.driver.sendMessage(topic, mqttValue);
      });
    }
  }

  onMessage(topic, message) {
    const capabilities = capabilitiesFromMeasureTopic(topic);
    if (!capabilities) {
      return;
    }

    this.log(`Received message from topic: ${topic}, value: ${message}`);

    for (const capability of capabilities) {
      const mapper = measureMapperFromCapability(capability);
      const value = mapper(message);
      this.setCapabilityValue(capability, value).catch(this.error);
    }
  }
}

module.exports = IntexDevice;
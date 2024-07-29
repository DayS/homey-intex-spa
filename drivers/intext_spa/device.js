'use strict';

const Homey = require('homey');
const { commandTopicFromCapability, commandMapperFromCapability, capabilitiesFromMeasureTopic, measureMapperFromCapability, triggerDescFromCapabilityAndValue } = require('../../lib/capabilities');

class IntexDevice extends Homey.Device {
  values = {};

  async onInit() {
    let settings = this.getSettings();
    this.log(`Setting: ${JSON.stringify(settings)}`);
    this.log(`Capabilities: ${JSON.stringify(this.getCapabilities())}`);

    const capabilities = this.getCapabilities();
    for (const capability of capabilities) {
      this.log(`Registering listener for capability: ${capability}`);

      // Setup initial value
      this.values[capability] = await this.getCapabilityValue(capability);

      this.registerCapabilityListener(capability, async (value) => {
        const topic = commandTopicFromCapability(capability);
        const mapper = commandMapperFromCapability(capability);
        const mqttValue = mapper(value);

        this.log(`Sending message to topic: ${topic}, value: ${mqttValue} <- Capability: ${capability}`);
        await this.driver.sendMessage(topic, mqttValue);
      });
    }
  }

  async onMessage(topic, message) {
    const capabilities = capabilitiesFromMeasureTopic(topic);
    if (!capabilities) {
      return;
    }

    this.log(`Received message from topic: ${topic}, value: ${message} -> Capabilities: ${JSON.stringify(capabilities)}`);

    for (const capability of capabilities) {
      const mapper = measureMapperFromCapability(capability);
      const value = mapper(message);

      this.log(`Setting capability: ${capability} to value: ${value}`);
      await this.setCapabilityValue(capability, value);

      // We can't use getCapabilityValue because of user actions modifying the value before sending it
      if (this.values[capability] !== value) {
        const triggerDesc = triggerDescFromCapabilityAndValue(capability, value);
        if (triggerDesc) {
          const triggerCard = this.homey.flow.getDeviceTriggerCard(triggerDesc.id);
          await triggerCard.trigger(this, triggerDesc.tokens, triggerDesc.args);
          this.log(`Event ${triggerDesc.id} triggered with tokens ${JSON.stringify(triggerDesc.tokens)} and args ${JSON.stringify(triggerDesc.args)}`);
        }
      }

      this.values[capability] = value;
    }
  }
}

module.exports = IntexDevice;
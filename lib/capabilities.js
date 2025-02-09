'use strict';

const commandTopicFromCapability = function (capability) {
  switch (capability) {
    case 'bubble':
      return 'pool/command/bubble';
    case 'filter':
      return 'pool/command/filter';
    case 'heater':
      return 'pool/command/heater';
    case 'power':
      return 'pool/command/power';
    case 'tempSet':
    case 'target_temperature':
      return 'pool/command/water/tempSet';
    default:
      return null;
  }
}

const commandMapperFromCapability = function (capability) {
  switch (capability) {
    case 'bubble':
      return (value) => value ? 'on' : 'off';
    case 'filter':
      return (value) => value ? 'on' : 'off';
    case 'heater':
      return (value) => value ? 'on' : 'off';
    case 'power':
      return (value) => value ? 'on' : 'off';
    case 'tempAct':
      return (value) => parseInt(value);
    case 'target_temperature':
      return (value) => parseInt(value);
    default:
      return null;
  }
}

const capabilitiesFromMeasureTopic = function (capability) {
  switch (capability) {
    case 'pool/bubble':
      return ['bubble'];
    case 'pool/filter':
      return ['filter'];
    case 'pool/heater':
      return ['heater'];
    case 'pool/power':
      return ['power'];
    case 'pool/water/tempAct':
      return ['tempAct', 'measure_temperature'];
    case 'pool/water/tempSet':
      return ['target_temperature'];
    default:
      return null;
  }
}

const measureMapperFromCapability = function (capability) {
  switch (capability) {
    case 'bubble':
      return (value) => value === 'on';
    case 'filter':
      return (value) => value === 'on';
    case 'heater':
      return (value) => value === 'on' || value === 'standby';
    case 'power':
      return (value) => value === 'on';
    case 'tempAct':
    case 'measure_temperature':
      return (value) => parseInt(value);
    case 'target_temperature':
      return (value) => parseInt(value);
    default:
      return null;
  }
}

const triggerDescFromCapabilityAndValue = function (capability, value) {
  switch (capability) {
    case 'bubble':
      return {
        id: value ? 'bubble_enabled' : 'bubble_disabled'
      };
    case 'filter':
      return {
        id: value ? 'filter_enabled' : 'filter_disabled'
      };
    case 'heater':
      return {
        id: value ? 'heater_enabled' : 'heater_disabled'
      };
    case 'power':
      return {
        id: value ? 'power_enabled' : 'power_disabled'
      };
    default:
      return null;
  }
}

module.exports.commandTopicFromCapability = commandTopicFromCapability;
module.exports.commandMapperFromCapability = commandMapperFromCapability;
module.exports.capabilitiesFromMeasureTopic = capabilitiesFromMeasureTopic;
module.exports.measureMapperFromCapability = measureMapperFromCapability;
module.exports.triggerDescFromCapabilityAndValue = triggerDescFromCapabilityAndValue;
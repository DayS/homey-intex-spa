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
    case 'tempSet':
      return (value) => parseInt(value);
    default:
      return null;
  }
}

const capabilityFromMeasureTopic = function (capability) {
  switch (capability) {
    case 'pool/bubble':
      return 'bubble';
    case 'pool/filter':
      return 'filter';
    case 'pool/heater':
      return 'heater';
    case 'pool/power':
      return 'power';
    case 'pool/water/tempAct':
      return 'tempAct';
    case 'pool/water/tempSet':
      return 'tempSet';
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
      return (value) => value === 'on';
    case 'power':
      return (value) => value === 'on';
    case 'tempAct':
      return (value) => parseInt(value);
    case 'tempSet':
      return (value) => parseInt(value);
    default:
      return null;
  }
}

module.exports.commandTopicFromCapability = commandTopicFromCapability;
module.exports.commandMapperFromCapability = commandMapperFromCapability;
module.exports.capabilityFromMeasureTopic = capabilityFromMeasureTopic;
module.exports.measureMapperFromCapability = measureMapperFromCapability;

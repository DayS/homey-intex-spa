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
    case 'tempSet':
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
      return ['tempSet', 'target_temperature'];
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
    case 'measure_temperature':
      return (value) => parseInt(value);
    case 'tempSet':
    case 'target_temperature':
      return (value) => parseInt(value);
    default:
      return null;
  }
}

module.exports.commandTopicFromCapability = commandTopicFromCapability;
module.exports.commandMapperFromCapability = commandMapperFromCapability;
module.exports.capabilitiesFromMeasureTopic = capabilitiesFromMeasureTopic;
module.exports.measureMapperFromCapability = measureMapperFromCapability;

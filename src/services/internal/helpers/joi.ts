import Joi from 'joi';

const STRING = Joi.string();
const STRING_OPTIONAL = STRING.optional();
const STRING_REQUIRED = STRING.required();

const NUMBER = Joi.number();
const NUMBER_OPTIONAL = NUMBER.optional();
const NUMBER_REQUIRED = NUMBER.required();

const OBJECT = Joi.object();

export {
  STRING, STRING_OPTIONAL, STRING_REQUIRED, NUMBER, NUMBER_OPTIONAL, NUMBER_REQUIRED, OBJECT,
};

export default Joi;

'use strict';

import Joi from 'joi';

export function list () {
  return {
    query: Joi.object({
      offset: Joi
        .number()
        .integer()
        .min(0)
        .default(0),
      limit: Joi
        .number()
        .integer()
        .min(1)
        .max(50)
        .default(50)
    })
  };
}

export function create () {
  return {
    payload: Joi.object().keys({
      name: Joi
        .string()
        .min(3)
        .max(200)
        .trim()
        .required(),
      user: Joi
        .string()
        .min(3)
        .max(200)
        .trim()
        .required(),
      pass: Joi
        .string()
        .min(3)
        .max(200)
        .trim()
        .required(),
      func: Joi
        .string()
        .min(3)
        .max(200)
        .trim(),
      privilegy: Joi
        .string()
        .min(1)
        .max(20)
        .trim()
        .required(),
      status: Joi
        .string()
        .min(1)
        .max(200)
        .trim()
        .required(),
      entryDate: Joi
        .string()
        .min(1)
        .max(200)
        .trim()
    }).required().meta({ className: ' User' })
  };
}

export function read () {
  return {
    params: Joi.object({
      id: Joi
        .number()
        .min(1)
        .required()
    })
  };
}

export function update () {
  return {
    params: Joi.object({
      id: Joi
        .number()
        .min(1)
        .required()
    }),
    payload: Joi.object().keys({
      name: Joi
        .string()
        .min(3)
        .max(200)
        .trim(),
      user: Joi
        .string()
        .min(3)
        .max(200)
        .trim(),
      pass: Joi
        .string()
        .min(3)
        .max(200)
        .trim(),
      func: Joi
        .string()
        .min(3)
        .max(200)
        .trim(),
      privilegy: Joi
        .string()
        .min(1)
        .max(20)
        .trim(),
      status: Joi
        .string()
        .min(1)
        .max(200)
        .trim()
    }).required().meta({ className: ' User' })
  };
}

export function remove () {
  return {
    params: Joi.object({
      id: Joi
        .number()
        .integer()
        .required()
    })
  };
}

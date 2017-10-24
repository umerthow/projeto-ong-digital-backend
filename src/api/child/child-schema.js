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
        .default(50)
        .max(50),
      cpf: Joi
        .string()
        .example('12345678909'),
      nome: Joi
        .string()
        .example('Joao Jose da Silva'),
      'status.id': Joi
        .number()
        .integer()
        .example(1)
    })
  };
}

export function create () {
  return {
    payload: Joi.object().keys({
      name: Joi
        .string()
        .min(1)
        .max(100)
        .trim()
        .required(),
      status: Joi
        .object().keys({
          id: Joi
            .number()
            .integer()
            .min(1)
            .example(1)
            .required()
        }),
      rg: Joi
        .string()
        .required(),
      cpf: Joi
        .string()
        .required(),
      color: Joi
        .string()
        .required(),
      sex: Joi
        .string()
        .required(),
      birth: Joi
        .date()
        .required(),
      school: Joi
        .string()
        .required(),
      responsibleCpf: Joi
        .string(),
      responsibleName: Joi
        .string(),
      responsiblePhone: Joi
        .string(),
      entryDate: Joi
        .date()
        .required(),
      exitDate: Joi
        .date(),
      user: Joi
        .object().keys({
          id: Joi
            .number()
            .integer()
            .min(1)
            .example(1)
            .required()
        })
    }).required().meta({ className: ' Child' })
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
        .min(1)
        .max(100)
        .trim()
        .required(),
      status: Joi
        .object().keys({
          id: Joi
            .number()
            .integer()
            .min(1)
            .example(1)
            .required()
        }),
      rg: Joi
        .string()
        .required(),
      cpf: Joi
        .string()
        .required(),
      color: Joi
        .string()
        .required(),
      sex: Joi
        .string()
        .required(),
      birth: Joi
        .date()
        .required(),
      school: Joi
        .string()
        .required(),
      responsibleCpf: Joi
        .string(),
      responsibleName: Joi
        .string(),
      responsiblePhone: Joi
        .string(),
      entryDate: Joi
        .date()
        .required(),
      exitDate: Joi
        .date(),
      user: Joi
        .object().keys({
          id: Joi
            .number()
            .integer()
            .min(1)
            .example(1)
            .required()
        })
    }).required().meta({ className: ' Child' })
  };
}

export function remove () {
  return {
    params: Joi.object({
      id: Joi
        .number()
        .min(1)
        .required()
    })
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

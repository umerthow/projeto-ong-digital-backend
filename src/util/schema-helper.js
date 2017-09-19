'use strict';

import Joi from 'joi';

export function successResponse (payload) {
  return Joi.object().keys({
    meta: Joi.object().keys({
      server: Joi.string(),
      offset: Joi.number(),
      limit: Joi.number(),
      recordCount: Joi.number()
    }),
    records: Joi.array().items(
      payload
    )
  });
}

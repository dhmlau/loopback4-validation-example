import {Entity, model, property} from '@loopback/repository';

@model()
export class CoffeeShop extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  shopId?: string;

  @property({
    type: 'string',
    required: true,
    // --- add jsonSchema -----
    jsonSchema: {
      maxLength: 10,
      minLength: 1,
    },
    // ------------------------
  })
  city: string;

  @property({
    type: 'string',
    required: true,
    // --- add jsonSchema -----
    jsonSchema: {
      pattern: '\\d{3}-\\d{3}-\\d{4}',
    },
    // ------------------------
  })
  phoneNum: string;

  @property({
    type: 'number',
    required: true,
    // --- add jsonSchema -----
    jsonSchema: {
      maximum: 100,
      minimum: 1,
    },
    // ------------------------
  })
  capacity: number;

  constructor(data?: Partial<CoffeeShop>) {
    super(data);
  }
}

export interface CoffeeShopRelations {
  // describe navigational properties here
}

export type CoffeeShopWithRelations = CoffeeShop & CoffeeShopRelations;

import {Entity, model, property} from '@loopback/repository';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  orderId?: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
  })
  promoCode?: string;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;

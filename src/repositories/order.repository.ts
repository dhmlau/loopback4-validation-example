import {DefaultCrudRepository} from '@loopback/repository';
import {Order, OrderRelations} from '../models';
import {DsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.orderId,
  OrderRelations
> {
  constructor(
    @inject('datasources.ds') dataSource: DsDataSource,
  ) {
    super(Order, dataSource);
  }
}

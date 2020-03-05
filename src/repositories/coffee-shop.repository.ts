import {DefaultCrudRepository} from '@loopback/repository';
import {CoffeeShop, CoffeeShopRelations} from '../models';
import {DsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CoffeeShopRepository extends DefaultCrudRepository<
  CoffeeShop,
  typeof CoffeeShop.prototype.shopId,
  CoffeeShopRelations
> {
  constructor(
    @inject('datasources.ds') dataSource: DsDataSource,
  ) {
    super(CoffeeShop, dataSource);
  }
}

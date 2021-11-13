import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Contrato, ContratoRelations} from '../models';

export class ContratoRepository extends DefaultCrudRepository<
  Contrato,
  typeof Contrato.prototype._id,
  ContratoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Contrato, dataSource);
  }
}

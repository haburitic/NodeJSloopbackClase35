import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {EmpleadoModel, EmpleadoModelRelations} from '../models';

export class EmpleadoModelRepository extends DefaultCrudRepository<
  EmpleadoModel,
  typeof EmpleadoModel.prototype._id,
  EmpleadoModelRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(EmpleadoModel, dataSource);
  }
}

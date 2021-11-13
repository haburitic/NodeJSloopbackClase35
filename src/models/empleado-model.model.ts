import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class EmpleadoModel extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  numeroDocumento: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: false,
    id: true
  })
  _id: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EmpleadoModel>) {
    super(data);
  }
}

export interface EmpleadoModelRelations {
  // describe navigational properties here
}

export type EmpleadoModelWithRelations = EmpleadoModel & EmpleadoModelRelations;

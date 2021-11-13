import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Contrato extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  numeroContrato: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  asesor: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Contrato>) {
    super(data);
  }
}

export interface ContratoRelations {
  // describe navigational properties here
}

export type ContratoWithRelations = Contrato & ContratoRelations;

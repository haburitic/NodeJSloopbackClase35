import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {EmpleadoModel} from '../models';
import {EmpleadoModelRepository} from '../repositories';

export class EmpleadoController {
  constructor(
    @repository(EmpleadoModelRepository)
    public empleadoModelRepository : EmpleadoModelRepository,
  ) {}

  @post('/empleado-models')
  @response(200, {
    description: 'EmpleadoModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(EmpleadoModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpleadoModel, {
            title: 'NewEmpleadoModel',
            
          }),
        },
      },
    })
    empleadoModel: EmpleadoModel,
  ): Promise<EmpleadoModel> {
    return this.empleadoModelRepository.create(empleadoModel);
  }

  @get('/empleado-models/count')
  @response(200, {
    description: 'EmpleadoModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EmpleadoModel) where?: Where<EmpleadoModel>,
  ): Promise<Count> {
    return this.empleadoModelRepository.count(where);
  }

  @get('/empleado-models')
  @response(200, {
    description: 'Array of EmpleadoModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EmpleadoModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EmpleadoModel) filter?: Filter<EmpleadoModel>,
  ): Promise<EmpleadoModel[]> {
    return this.empleadoModelRepository.find(filter);
  }

  @patch('/empleado-models')
  @response(200, {
    description: 'EmpleadoModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpleadoModel, {partial: true}),
        },
      },
    })
    empleadoModel: EmpleadoModel,
    @param.where(EmpleadoModel) where?: Where<EmpleadoModel>,
  ): Promise<Count> {
    return this.empleadoModelRepository.updateAll(empleadoModel, where);
  }

  @get('/empleado-models/{id}')
  @response(200, {
    description: 'EmpleadoModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EmpleadoModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EmpleadoModel, {exclude: 'where'}) filter?: FilterExcludingWhere<EmpleadoModel>
  ): Promise<EmpleadoModel> {
    return this.empleadoModelRepository.findById(id, filter);
  }

  @patch('/empleado-models/{id}')
  @response(204, {
    description: 'EmpleadoModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpleadoModel, {partial: true}),
        },
      },
    })
    empleadoModel: EmpleadoModel,
  ): Promise<void> {
    await this.empleadoModelRepository.updateById(id, empleadoModel);
  }

  @put('/empleado-models/{id}')
  @response(204, {
    description: 'EmpleadoModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empleadoModel: EmpleadoModel,
  ): Promise<void> {
    await this.empleadoModelRepository.replaceById(id, empleadoModel);
  }

  @del('/empleado-models/{id}')
  @response(204, {
    description: 'EmpleadoModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empleadoModelRepository.deleteById(id);
  }
}

import { FindOptions, Model, NonNullFindOptions } from 'sequelize';
import { BaseRepoSitory } from '../repository/base.repositoty';
import { SearchDTO } from '../dto/search.dto';

export class BaseService<T> {
  protected readonly repository: BaseRepoSitory;

  constructor(repository: BaseRepoSitory) {
    this.repository = repository;
  }

  toJson(data: any): T {
    if (data instanceof Model) {
      return data.toJSON();
    }
    return Object.assign({}, data);
  }

  async findByPk(id: number): Promise<T> {
    const model = await this.repository.findByPk(id);
    return await this.toJson(model);
  }

  async findOne(options: NonNullFindOptions | FindOptions): Promise<T> {
    const model = await this.repository.findOne(options);
    return this.toJson(model);
  }

  async findAll(searchDTO: SearchDTO): Promise<{ rows: T[]; count: number }> {
    const options = {};

    if (!searchDTO.ignorePage) {
      options['offset'] = (searchDTO.page - 1) * searchDTO.limit;
      options['limit'] = searchDTO.limit;
    }

    if (searchDTO.count) {
      return this.findAndCountAll(options);
    }

    const models = await this.repository.findAll(options);
    const rows = models.map((model) => this.toJson(model));

    return { count: 0, rows };
  }

  async findAndCountAll(
    options?: FindOptions,
  ): Promise<{ rows: T[]; count: number }> {
    const { rows, count } = await this.repository.findAndCountAll(options);
    return { rows: rows.map((model) => this.toJson(model)), count };
  }

  async create(data: any): Promise<T> {
    const model = await this.repository.create(data);
    return this.toJson(model);
  }

  async update(id: number, data: any): Promise<T> {
    await this.repository.update(data, { where: { id } });
    return await this.findByPk(id);
  }

  async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}

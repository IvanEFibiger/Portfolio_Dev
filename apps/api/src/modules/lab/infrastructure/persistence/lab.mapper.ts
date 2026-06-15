import { LabItem, LabStatus } from '../../domain/entities/lab.entity';
import { LabOrmEntity } from './lab.orm-entity';

export class LabMapper {
  static toDomain(orm: LabOrmEntity): LabItem {
    return new LabItem(
      orm.id,
      orm.labNumber,
      orm.title,
      orm.slug,
      orm.description,
      orm.status as LabStatus,
      orm.stack ?? [],
      orm.learning,
      orm.sortOrder,
      orm.published,
      orm.createdAt,
      orm.updatedAt,
    );
  }

  static toOrm(domain: LabItem): Partial<LabOrmEntity> {
    return {
      id: domain.id,
      labNumber: domain.labNumber,
      title: domain.title,
      slug: domain.slug,
      description: domain.description,
      status: domain.status,
      stack: domain.stack,
      learning: domain.learning,
      sortOrder: domain.sortOrder,
      published: domain.published,
    };
  }
}

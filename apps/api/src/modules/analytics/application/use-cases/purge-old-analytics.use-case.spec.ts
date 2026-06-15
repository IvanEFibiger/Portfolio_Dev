import { PurgeOldAnalyticsUseCase } from './purge-old-analytics.use-case';
import { AnalyticsEventRepositoryPort } from '../../domain/ports/analytics-event.repository.port';

describe('PurgeOldAnalyticsUseCase', () => {
  it('borra eventos anteriores a la fecha de corte segun la retencion', async () => {
    const repo = {
      deleteOlderThan: jest.fn().mockResolvedValue(7),
    } as unknown as AnalyticsEventRepositoryPort;
    const useCase = new PurgeOldAnalyticsUseCase(repo);
    const now = new Date('2026-06-15T03:00:00.000Z');

    const result = await useCase.execute(365, now);

    expect(repo.deleteOlderThan).toHaveBeenCalledWith(new Date('2025-06-15T03:00:00.000Z'));
    expect(result).toBe(7);
  });
});

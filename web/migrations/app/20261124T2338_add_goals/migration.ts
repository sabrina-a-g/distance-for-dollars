#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0b7beaa6f453a0ec674015b8df3361656fb72367be1bec6548fbb7be74d6c5d1/contract';
import endContract from '../../snapshots/0b7beaa6f453a0ec674015b8df3361656fb72367be1bec6548fbb7be74d6c5d1/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/64053d9471ec86ff70d99fbf23a04960e0fd2d5abab0d1bdc4335029cb4d2b07/contract';
import startContract from '../../snapshots/64053d9471ec86ff70d99fbf23a04960e0fd2d5abab0d1bdc4335029cb4d2b07/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Goal',
        columns: [
          col('athleteId', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('charityReference', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdDate', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('goalId', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('goalType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('startDate', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['goalId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'GoalRule',
        columns: [
          col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('goalId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('rate', 'numeric', { notNull: true, codecRef: { codecId: 'pg/numeric@1' } }),
          col('unit', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['goalId', 'category'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'GoalRule',
        index: 'GoalRule_goalId_idx_8733343e',
        columns: ['goalId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'GoalRule',
        foreignKey: {
          name: 'GoalRule_goalId_fkey',
          columns: ['goalId'],
          references: { schema: 'public', table: 'Goal', columns: ['goalId'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

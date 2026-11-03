#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/e54f8d57fd0940f8abad9c092851344d099569867cee2bf03dec245ee81ed31b/contract';
import endContract from '../../snapshots/e54f8d57fd0940f8abad9c092851344d099569867cee2bf03dec245ee81ed31b/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'SyncedActivity',
        columns: [
          col('activityId', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('athleteId', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('distanceMeters', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('goalId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('startDate', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['athleteId', 'activityId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('username', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_email_key',
        columns: ['email'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

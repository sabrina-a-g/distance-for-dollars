#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/7ad2cbf3120fbbcd9e0455e635f93eb3f51f0ce510015c5777a1a578b928a13b/contract';
import endContract from '../../snapshots/7ad2cbf3120fbbcd9e0455e635f93eb3f51f0ce510015c5777a1a578b928a13b/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/e54f8d57fd0940f8abad9c092851344d099569867cee2bf03dec245ee81ed31b/contract';
import startContract from '../../snapshots/e54f8d57fd0940f8abad9c092851344d099569867cee2bf03dec245ee81ed31b/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'SyncedActivity',
        column: col('sportType', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

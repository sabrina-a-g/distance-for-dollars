#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/64053d9471ec86ff70d99fbf23a04960e0fd2d5abab0d1bdc4335029cb4d2b07/contract';
import endContract from '../../snapshots/64053d9471ec86ff70d99fbf23a04960e0fd2d5abab0d1bdc4335029cb4d2b07/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/7ad2cbf3120fbbcd9e0455e635f93eb3f51f0ce510015c5777a1a578b928a13b/contract';
import startContract from '../../snapshots/7ad2cbf3120fbbcd9e0455e635f93eb3f51f0ce510015c5777a1a578b928a13b/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [this.setNotNull({ schema: 'public', table: 'SyncedActivity', column: 'sportType' })];
  }
}

MigrationCLI.run(import.meta.url, M);

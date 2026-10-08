import * as migration_20261008_085209_initial from './20261008_085209_initial';

export const migrations = [
  {
    up: migration_20261008_085209_initial.up,
    down: migration_20261008_085209_initial.down,
    name: '20261008_085209_initial'
  },
];

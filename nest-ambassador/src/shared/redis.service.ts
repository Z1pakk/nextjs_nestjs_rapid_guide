import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache, Store } from "cache-manager";
import Redis from 'redis'

interface RedisCache extends Cache {
  store: RedisStore;
}

interface RedisStore extends Store {
  name: 'redis';
  getClient: () => Redis.RedisClient;
  isCacheableValue: (value: any) => boolean;
}


@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: RedisCache) {
  }

  getClient(): Redis {
    const store = this.cacheManager.store;

    return store.getClient();
  }
}

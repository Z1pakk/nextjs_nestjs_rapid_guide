import { CacheModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import * as redisStore from 'cache-manager-redis-store'
import { RedisService } from "./redis.service";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
    }),
    CacheModule.registerAsync({
      useFactory: async () => {
          return {
            store: redisStore,
            host: 'redis',
            port: 6379,
          };
      },
    })
  ],
  providers: [RedisService, ConfigService],
  exports: [
    JwtModule,
    CacheModule,
    RedisService,
    ConfigService
  ]
})
export class SharedModule {}

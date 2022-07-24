import { ClassSerializerInterceptor, Controller, Get, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "../auth/auth.guard";
import { RedisService } from "../shared/redis.service";
import { Response } from "express";

@UseGuards(AuthGuard)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService
  ) {
  }


  @Get('admin/ambassadors')
  async ambassadors() {
    return this.userService.find({
      is_ambassador: true
    });
  }

  @Get('ambassador/rankings')
  async rankings(
    @Res() response: Response
  ) {
    const client = this.redisService.getClient();

    client.zrevrange('rankings', 0, -1, 'withscores', (err, res) => {

      // const arr = [];
      // for (let i = 0; i < res.length; i+=2) {
      //   arr[res[i]] = res[i+1];
      // }
      let score;

      response.send(res.reduce((o, r) => {
        if (isNaN(parseInt(r))) {
          return {
            ...o,
            [r]: score
          }
        } else {
          score = r;
          return o;
        }
      }, {}));
    })
  }
}

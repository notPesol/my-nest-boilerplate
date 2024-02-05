import { Body, Controller, Post } from "@nestjs/common";
import { TmpNatsService } from "./service";
import { TmpNatsDTO } from "./dto/dto";
import { Public } from "src/common/decorator/public";

@Controller("/tmp-nats")
export class TmpNatsController {
  constructor(private readonly tmpNatsService: TmpNatsService){}

  @Public()
  @Post()
  doSomething(@Body() body: TmpNatsDTO) {
    return this.tmpNatsService.doSomething(body);
  }
}
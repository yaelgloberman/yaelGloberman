// Decorators
// import { Public } from "./common/decorators";

// External libraries
import { ApiTags } from "@nestjs/swagger";
import { Controller, Get } from '@nestjs/common';
@ApiTags("OK")

@Controller()
export class AppController {
  @Get()
  getOK(): string {
    return 'Hello World!';
  }
}

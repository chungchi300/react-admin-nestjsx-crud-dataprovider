import { Controller, Get } from '@nestjs/common';
import {
  Crud,
  ParsedRequest,
  CrudRequest,
  CrudRequestInterceptor,
  Override,
  CrudController,
} from '@nestjsx/crud';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { CategoryService } from './category.service';
import { CategoryEntity } from './category.entity';
import { CommentService } from './CommentService';
import { CommentEntity } from './comment.entity';
import { GroupService } from './group.service';
import { GroupEntity } from './group.entity';
import { PaymentMethodEntity } from './paymentMethods.entity';
import { PaymentService } from './PaymentService';
import { UserToGroupService } from './userToGroup.service';
import { UserToGroupEntity } from './userTogroup.entity';

@Crud({
  model: {
    type: UserToGroupEntity,
  },
})
@Controller('userToGroups')
export class UserToGroupController {
  constructor(public service: UserToGroupService) {}

  //http://localhost:3000/users?filter=firstname||starts||c&sort=id,DESC&per_page=10&offset=0&page=1
  //http://localhost:3000/users/custom
  @Get('custom')
  listing(@ParsedRequest() req: CrudRequest) {
    console.log('request', req, this.base);
    // let options: any = {};
    let query: any = {
      parsed: {
        fields: [],
        paramsFilter: [],
        filter: [],
        or: [],
        join: [],
        sort: [],
        //if have limit&offset, it returns pagination&limit
        limit: 10,
        offset: 0,
        page: undefined,
        cache: undefined,
      },
      options: {
        query: {},
        // routes: {
        // getManyBase: { interceptors: [], decorators: [] },
        // getOneBase: { interceptors: [], decorators: [] },
        // createOneBase: { interceptors: [], decorators: [] },
        // createManyBase: { interceptors: [], decorators: [] },
        // updateOneBase: {
        //   interceptors: [],
        //   decorators: [],
        //   allowParamsOverride: false,
        // },
        // replaceOneBase: {
        //   interceptors: [],
        //   decorators: [],
        //   allowParamsOverride: false,
        // },
        // deleteOneBase: {
        //   interceptors: [],
        //   decorators: [],
        //   returnDeleted: false,
        // },
        // },
        // params: { id: { field: 'id', type: 'number', primary: true } },
      },
    };
    // return this.service.decidePagination(query.parsed, query.options);
    return this.service.getMany(query);
  }
  get base(): CrudController<UserToGroupEntity> {
    return this;
  }
  @Override()
  getMany(@ParsedRequest() req: CrudRequest) {
    console.log('execute', req.parsed, req.options);
    if (!req.parsed.limit) {
      req.parsed.limit = 10000;
      req.parsed.offset = 0;
    }
    return this.base.getManyBase(req);
  }
}

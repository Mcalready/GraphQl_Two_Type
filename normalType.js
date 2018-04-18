/**
 * Created by gui.zhang on 10/4/18.
 * GraphQl两种写法
 */

const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');

//获取express实例
const app = express();

// get router
const router = express.Router()

//服务端口
const port = process.env.PORT || 4003

// Maps id to User object
const myDB = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
};

// 定义 User 类型
const userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

// 定义 Query 类型
const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      // `args` 描述了 `user` 查询接受的参数
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (_, {id}) => {
        return myDB[id];
      }
    }
  }
});

const schema = new graphql.GraphQLSchema({query: queryType});

//API: http://localhost:4000/graphql/userInfo
router.use('/userInfo', graphqlHTTP({
  schema: schema,     //传入scheme
  graphiql: true,     //打开GUI界面
}));

app.use('/graphql', router)

app.listen(port); 
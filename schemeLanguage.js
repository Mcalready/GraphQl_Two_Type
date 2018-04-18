/**
 * Created by gui.zhang on 10/4/18.
 * GraphQl两种写法
 */

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

//获取express实例
const app = express();

// get router
const router = express.Router()

//服务端口
const port = process.env.PORT || 4004

const schema = buildSchema(`
  type User {
    id: String
    name: String
  }

  type Query {
    user(id: String): User
  }
`);

// 从 id 映射到 User 对象
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

const root = {
  user: ({id}) => {
    return myDB[id];
  }
};

//API: http://localhost:4000/graphql/userInfo
router.use('/userInfo', graphqlHTTP({
  schema: schema,     //传入scheme
  rootValue: root,    //传入数据
  graphiql: true,     //打开GUI界面
}));

app.use('/graphql', router)

app.listen(port); 
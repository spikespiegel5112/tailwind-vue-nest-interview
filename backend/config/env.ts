import * as fs from 'fs';
import * as path from 'path';
const isProd = process.env.NODE_ENV === 'production';

function parseEnv() {
  const localEnv = path.resolve('config/env.ts');
  const prodEnv = path.resolve('config/env.prod.ts');

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    console.log(localEnv);
    console.log(prodEnv);
    console.log(fs.existsSync(prodEnv));
    throw new Error('缺少环境配置文件');
  }

  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;
  return { path: filePath };
}
export default parseEnv();

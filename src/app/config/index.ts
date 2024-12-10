import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env :process.env.NODE_ENV,
  bycript_pass :process.env.BYCRYPT_PASS
};

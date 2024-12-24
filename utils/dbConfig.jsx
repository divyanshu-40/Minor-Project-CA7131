import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://expense-tracker_owner:1nAafKWprI2d@ep-cool-dew-a5o2cp4c.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require')
export const db = drizzle(sql,{schema});

/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://expense-tracker_owner:1nAafKWprI2d@ep-cool-dew-a5o2cp4c.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require',
    }
  };
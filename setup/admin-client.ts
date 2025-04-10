import { UnbodyAdmin } from "unbody/admin";

if (!process.env.UNBODY_ADMIN_ID || !process.env.UNBODY_ADMIN_SECRET) {
    throw new Error('UNBODY_ADMIN_ID and UNBODY_ADMIN_SECRET must be set')
}

export const admin = new UnbodyAdmin({
    auth: {
      username: process.env.UNBODY_ADMIN_ID,
      password: process.env.UNBODY_ADMIN_SECRET,
    },
})
  
import type { Roles, Users, UsersProfile } from '#layers/1.base/server/prisma/client'

declare module 'h3' {
  interface H3EventContext {
    user: Pick<Users, 'email' | 'id'> & {
      roles: Pick<Roles, 'id' | 'name'> | null
      usersprofile: Pick<UsersProfile, 'name' | 'photo_profile'> | null
    }
  }
}

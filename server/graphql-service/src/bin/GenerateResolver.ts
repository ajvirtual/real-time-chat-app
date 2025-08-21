import { initEntities } from '@chat/graphql'
import { generate } from '@mzara/graphql-service-core'

initEntities()
generate(`${__dirname}/../resolver`)

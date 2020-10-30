import { Twitter } from 'twit'
import { camelize } from '@ridi/object-case-converter'

import { User } from '@/declarations'

function cleanTwitterUser(data: Twitter.User): User {
    return camelize(data, {
        recursive: true,
    })
}

export default cleanTwitterUser

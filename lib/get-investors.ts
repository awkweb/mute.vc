import { Investor, User } from '@/declarations'

function getInvestors(
    users: User[],
    mutedIds: number[],
    screenName: string,
): Investor[] {
    const mutedIdsMap = mutedIds.reduce((result, id, _index) => {
        result[`${id}`] = 1
        return result
    }, {} as { [key: string]: number })

    const investors = []
    for (let i = 0, n = users.length; i < n; ++i) {
        const investor = users[i]
        if (investor.screenName !== screenName) {
            investors.push({
                ...investor,
                muted: Object.prototype.hasOwnProperty.call(
                    mutedIdsMap,
                    investor.id,
                ),
                on: true,
            })
        }
    }

    return investors
}

export default getInvestors

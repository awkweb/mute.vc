import { Investor } from '@/declarations'

import ListItem from './list-item'

type Props = {
    investors: Investor[]
}

const List: React.FC<Props> = (props) => {
    const { investors } = props
    if (investors.length) {
        return (
            <ul>
                {investors.map((x) => (
                    <ListItem
                        bio={x.description}
                        image={x.profileImageUrlHttps}
                        key={x.id}
                        name={x.name}
                        on={x.on}
                        screenName={x.screenName}
                        verified={x.verified}
                    />
                ))}
            </ul>
        )
    }
    return <div>No investors</div>
}

export default List

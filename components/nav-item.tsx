import { useRouter } from 'next/router'

import { Link } from '@/components'

type Props = {
    name: string
}

const ListItem: React.FC<Props> = (props) => {
    const {
        query: { tab = 'unmuted' },
    } = useRouter()
    const { name } = props
    const active = tab === name
    return (
        <Link
            className={`
                capitalize
                font-bold
                border-b-2
                flex-1
                h-full
                pt-3
                pb-3
                text-15
                ${active ? '' : 'cursor-pointer'}
            `}
            disabled={active}
            href={`/?tab=${name}`}
        >
            {name}
        </Link>
    )
}

export default ListItem

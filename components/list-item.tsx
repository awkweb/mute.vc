import Autolinker from 'autolinker'
import Image from 'next/image'
import { useMemo, useState } from 'react'

import Link from './link'

type Props = {
    screenName: string
    bio: string
    image: string
    name: string
    verified?: boolean
    on: boolean
}

const ListItem: React.FC<Props> = (props) => {
    const { screenName, bio } = props
    const [loading, setLoading] = useState(false)

    const linkedBio = useMemo(
        () =>
            Autolinker.link(bio, {
                hashtag: 'twitter',
                mention: 'twitter',
                truncate: 25,
            }),
        [bio],
    )
    const actionText = 'Mute'

    return (
        <li>
            <div
                className="
                    bg-background
                    border-b
                    md:hover:bg-gray-light
                    md:px-4
                    px-3
                    py-2
                "
            >
                <div className="flex">
                    <Link
                        className="
                            bg-gray-dark
                            h-12
                            mr-3
                            mt-1
                            overflow-hidden
                            rounded-full
                            w-full
                        "
                        external
                        href={`https://twitter.com/${screenName}`}
                    >
                        <Image height={48} src={props.image} width={48} />
                    </Link>
                    <div className="overflow-hidden w-full">
                        <div className="flex justify-between items-start">
                            <div className="leading-none max-w-full mr-2 overflow-hidden">
                                <div className="flex items-center">
                                    <div
                                        className="
                                    leading-normal
                                    text-title
                                    truncate
                                    font-bold
                                    text-15
                                "
                                    >
                                        {props.name}
                                    </div>
                                    {props.verified ? 'verified' : ''}
                                </div>
                                <Link
                                    className="text-description text-15"
                                    external
                                    href={`https://twitter.com/${screenName}`}
                                >
                                    @{screenName}
                                </Link>
                            </div>
                            <button
                                className="
                            border
                            border-primary
                            disabled:pointer-events-none
                            focus:shadow-outline
                            font-bold
                            outline-none
                            px-4
                            py-1
                            rounded-full
                            text-15
                            text-white
                        "
                                disabled={loading}
                            >
                                {actionText}
                            </button>
                        </div>
                        <div
                            className="leading-snug mt-2 text-15"
                            dangerouslySetInnerHTML={{ __html: linkedBio }}
                        />
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ListItem

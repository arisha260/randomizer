import { Link } from "react-router";

export interface RandomizerType {
    link: string;
    title: string;
    description: string;
}


export default function RandomizerType({link, title, description}: RandomizerType) {
    return (
        <Link to={`/${link}`} className="flex-c-10">
            <div className="title-20">{title}</div>
            <div className="text">{description}</div>
        </Link>
    )
}
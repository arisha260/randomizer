import { Link } from "react-router";
import { ArrowIcon } from "../svg/arrow";

export function GoHomeBtn () {
    return (
        <Link to='/' className="text flex-5-r">
            <ArrowIcon /> К списку
        </Link>
    )
}
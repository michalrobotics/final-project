import { useState } from "react";

import classes from './ShowMoreText.module.css';

type Props = {
    children: string;
    limit: string;
}

const ShowMoreText: React.FC<Props> = (props) => {
    const [showMore, setShowMore] = useState(false);

    const addedText = showMore ? 'הראה פחות' : '...הראה עוד';
    
    if (props.children.length <= (+props.limit + addedText.length)) {
        return <p>{props.children}</p>;
    }

    let text = props.children;

    if (!showMore) {
        text = text.slice(0, +props.limit);
    }

    const toggleShowMore = () => {
        setShowMore((prevValue) => !prevValue);
    }

    return (
        <p className={classes['show-more']}>
            {text} <span onClick={toggleShowMore}>{addedText}</span>
        </p>
    );
}

export default ShowMoreText;

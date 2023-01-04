import React from "react";
import { Link } from "react-router-dom"
const SingleArticle = ({
    section,
    title,
    byline,
    multimedia,
    displaySingleArticle,
}) => {
    if (!section || !title || !!multimedia) {
        return <div></div>
    }
    return (
        <div className="individual=container">
            <p className="section">{section.toUpperCase()}</p>
            <Link to={"/details"} style={{ textDecoration: "none", color: "blue" }}>
                <h2
                    className="article-title"
                    onClick={() => displaySingleArticle(title)}
                    value={title}
                >
                    {title}
                </h2>
            </Link>
            <img
                className="image-list"
                src={!multimedia ? <div></div> : multimedia[0].url}
                alt="/"
            />
            <p className="byline">{byline}</p>
        </div>
    )
};
export default SingleArticle


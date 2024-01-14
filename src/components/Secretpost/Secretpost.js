export default function Secretpost(props) {
    /**
     * props will have post property which contain data about particular post
     */
    return (
        <li className="list-group-item">{props.post.message}</li>
    );
};
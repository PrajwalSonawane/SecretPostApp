export default function Secretpost(props) {
    /**
     * props will have post property which contain data about particular post
     */
    return (
        <li className="list-group-item mb-3 lead"><b>Secret #{props.secretNumber}</b><span className="px-2">{props.post.message}</span></li>
    );
};
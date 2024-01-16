import Secretpost from "../Secretpost/Secretpost";
import Loader from "../Loader/Loader";

export default function SecretpostList(props) {
    /**
     * props: List of secret posts by all users
     */
    return (
        <>
            <h4 className="mb-5">Read other people secrets here</h4>
            {props.messagesLoading && <Loader />}
            <ul className="list-group list-group-flush">
                {props.postList.map((post, index) => {
                    return (
                        <Secretpost post={post} secretNumber={index + 1}></Secretpost>
                    )
                })}
            </ul>
        </>
    );
};
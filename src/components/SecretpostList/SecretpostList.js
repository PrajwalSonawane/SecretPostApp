import Secretpost from "../Secretpost/Secretpost";

export default function SecretpostList(props) {
    /**
     * props: List of secret posts by all users
     */
    return (
        <>
            <h4>Read other people secret message here</h4>
            <ul className="list-group">
                {props.postList.map((post) => {
                    return (
                        <Secretpost post={post}></Secretpost>
                    )
                })}
            </ul>
        </>
    );
};
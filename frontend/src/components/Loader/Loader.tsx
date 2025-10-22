import "./loader.css";

const Loader = () => {
    return (
        <article className="loader">
            <img className="loader__image" src="/assets/spinner.svg" alt="Loader animation. A circle spinning." />
            <h1 className="loader__title">Loading...</h1>
        </article>
    );
};

export default Loader;

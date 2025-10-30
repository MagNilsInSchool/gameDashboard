import "./loader.css";
interface Props {
    className?: string;
}
const Loader: React.FC<Props> = ({ className }) => {
    return (
        <article className={`loader ${className}`}>
            <img className="loader__image" src="/assets/spinner.svg" alt="Loader animation. A circle spinning." />
            <h1 className="loader__title">Loading...</h1>
        </article>
    );
};

export default Loader;

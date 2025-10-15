import "./header.css";

interface Props {
    beans: string;
}
const Header: React.FC<Props> = ({ beans }) => {
    return <div>{`Header ${beans}`}</div>;
};

export default Header;

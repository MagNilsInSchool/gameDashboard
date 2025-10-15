import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./landingPage.css";

const LandingPage = () => {
    const users = [
        { id: 1, firstName: "Bean", lastName: "Beanarius", src: "assets/icons/user-filled.svg" },
        { id: 2, firstName: "Bean", lastName: "Beanarius", src: "assets/icons/user-filled.svg" },
        { id: 3, firstName: "Bean", lastName: "Beanarius", src: "assets/icons/user-filled.svg" },
        { id: 4, firstName: "Bean", lastName: "Beanarius", src: "assets/icons/user-filled.svg" },
        { id: 5, firstName: "Bean", lastName: "Beanarius", src: "assets/icons/user-filled.svg" },
        { id: 6, firstName: "Bean", lastName: "Beanarius", src: "assets/icons/user-filled.svg" },
        { id: 7, firstName: "Bean", lastName: "Beanarius", src: "assets/icons/user-filled.svg" },
        { id: 8, firstName: "Bean", lastName: "Beanarius", src: "assets/icons/user-filled.svg" },
    ];
    return (
        <main className=" shared-page-style">
            <div className="landing-page wrapper--max-width">
                {users.map((user) => (
                    <ProfileCard
                        firstName={user.firstName}
                        lastName={user.lastName}
                        src={user.src}
                        key={user.id}
                        userId={user.id}
                    />
                ))}
            </div>
        </main>
    );
};

export default LandingPage;

import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./landingPage.css";

import type { iUser } from "../../interfaces/user";
import { useGetUsers } from "../../api/queries/users/useUsers";

const LandingPage = () => {
    const { data } = useGetUsers();
    // const users = [
    //     {
    //         id: 1,
    //         firstName: "Bean",
    //         lastName: "Beanarius",
    //         normalizedName: "",
    //         email: "a@b.se",
    //         image: "/assets/icons/user-filled.svg",
    //     },
    //     {
    //         id: 3,
    //         firstName: "Bean",
    //         lastName: "Beanarius",
    //         normalizedName: "",
    //         email: "a@b.se",
    //         image: "/assets/icons/user-filled.svg",
    //     },
    //     {
    //         id: 4,
    //         firstName: "Bean",
    //         lastName: "Beanarius",
    //         normalizedName: "",
    //         email: "a@b.se",
    //         image: "/assets/icons/user-filled.svg",
    //     },
    //     {
    //         id: 2,
    //         firstName: "Bean",
    //         lastName: "Beanarius",
    //         normalizedName: "",
    //         email: "a@b.se",
    //         image: "/assets/icons/user-filled.svg",
    //     },
    //     {
    //         id: 5,
    //         firstName: "Bean",
    //         lastName: "Beanarius",
    //         normalizedName: "",
    //         email: "a@b.se",
    //         image: "/assets/icons/user-filled.svg",
    //     },
    //     {
    //         id: 6,
    //         firstName: "Bean",
    //         lastName: "Beanarius",
    //         normalizedName: "",
    //         email: "a@b.se",
    //         image: "/assets/icons/user-filled.svg",
    //     },
    //     {
    //         id: 7,
    //         firstName: "Bean",
    //         lastName: "Beanarius",
    //         normalizedName: "",
    //         email: "a@b.se",
    //         image: "/assets/icons/user-filled.svg",
    //     },
    //     {
    //         id: 8,
    //         firstName: "Bean",
    //         lastName: "Beanarius",
    //         normalizedName: "",
    //         email: "a@b.se",
    //         image: "/assets/icons/user-filled.svg",
    //     },
    // ];
    return (
        <main className="shared-page-style">
            <div className="landing-page wrapper--max-width">
                {data && data.map((user: iUser) => <ProfileCard user={user} key={user.id} />)}
            </div>
        </main>
    );
};

export default LandingPage;

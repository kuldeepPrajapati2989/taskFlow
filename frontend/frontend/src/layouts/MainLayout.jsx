import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children, setToken }) => {
    return (
        <>
            <Navbar setToken={setToken} />

            <main className="pt-20 pb-20">
                {children}
            </main>

            <Footer />
        </>
    );
};

export default MainLayout;
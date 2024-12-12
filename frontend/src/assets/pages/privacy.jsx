import Header from "../components/header";
import Footer from "../components/footer";
import PrivacyPolicy from "../components/privacy";

function AboutPage() { // Rename this function to avoid conflicts
    return (
        <div>
            <Header />
            <PrivacyPolicy />  {/* Assuming this renders another About component */}
            <Footer />
        </div>
    );
}

export default PrivacyPolicy;
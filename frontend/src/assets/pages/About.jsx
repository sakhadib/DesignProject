import Header from "../components/header";
import Footer from "../components/footer";
import About from "../components/About"; // Assuming this imports another 'About' component for use inside this file

function AboutPage() { // Rename this function to avoid conflicts
    return (
        <div>
            <Header />
            <About />  {/* Assuming this renders another About component */}
            <Footer />
        </div>
    );
}

export default AboutPage;

import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
// import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Events from "./Components/Events/Events";
import Gallery from "./Components/Gallery/Gallery";
import Statistics from "./Components/Statistics/Statistics";
import ExploreLC from "./Components/ExploreLC/ExploreLC";
import Team from "./Components/Team/Team";
import Connect from "./Components/Connect/Connect";
import Footer from "./Components/Footer/Footer";
import Achievements from "./Components/Achievements/Achievements";
import TeamMember from "./Components/TeamMember/TeamMember";
import DebugGoogleSheets from "./Components/DebugGoogleSheets";

// Main homepage component
const HomePage = () => {
    return (
        <>
            <Home />
            <About />
            <Achievements />
            <Events />
            <Gallery />
            <Statistics />
            <ExploreLC />
            <Team />
            <Connect />
            <Footer />
        </>
    );
};

function App() {
    const location = useLocation();
    const isTeamMemberPage = location.pathname.startsWith('/team/');
    
    return (
        <div className="appWrapper">
            {!isTeamMemberPage && <Navbar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/debug" element={<DebugGoogleSheets />} />
                <Route path="/team/:memberName" element={<TeamMember />} />
            </Routes>
        </div>
    );
}

export default App;

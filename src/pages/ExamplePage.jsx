import HeroBanner from '../components/Example_Components/HeroBanner';
import RecipeQuote from '../components/Example_Components/RecipeQuote';
import CardSection from '../components/Example_Components/CardSection';
import NavBar from '../components/Example_Components/NavBar';
import Footer from '../components/Example_Components/Footer';

import '../example.css';

export default function ExamplePage() {
    return (
        <>
            <NavBar />
            <HeroBanner />
            <RecipeQuote />
            <CardSection />
            <Footer />
        </>
    );
}

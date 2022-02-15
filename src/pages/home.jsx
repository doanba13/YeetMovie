import Hero from "../components/hero/Hero";
import {Link} from "react-router-dom";
import {SmallOutlineButton} from "../components/button/Button";
import MovieList from "../components/movie-list/MovieList";

const Home = () => {
    return (
        <>
            <Hero/>
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h1>Trending</h1>
                        <Link to='/movies'>
                            <SmallOutlineButton classname='small'>See More</SmallOutlineButton>
                        </Link>
                    </div>
                    <MovieList param={'offer'}/>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h1>Top Rated</h1>
                        <Link to='/movies'>
                            <SmallOutlineButton classname='small'>See More</SmallOutlineButton>
                        </Link>
                    </div>
                    <MovieList param={'top-rate'}/>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h1>New</h1>
                        <Link to='/movies'>
                            <SmallOutlineButton classname='small'>See More</SmallOutlineButton>
                        </Link>
                    </div>
                    <MovieList param={'new'}/>
                </div>
            </div>
        </>
    );
};

export default Home;
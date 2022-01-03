import Hero from "../components/hero/Hero";
import {Link} from "react-router-dom";
import {SmallOutlineButton} from "../components/button/Button";
import MovieList from "../components/movie-list/MovieList";
import {category, movieType, tvType} from "../api/tmdbConfig";

const Home = () => {
    return (
        <>
            <Hero/>
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to='/movies'>
                            <SmallOutlineButton classname='small'>See More</SmallOutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular}/>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to='/movies'>
                            <SmallOutlineButton classname='small'>See More</SmallOutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated}/>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV Series</h2>
                        <Link to='/tv'>
                            <SmallOutlineButton classname='small'>See More</SmallOutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular}/>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV Series</h2>
                        <Link to='/tv'>
                            <SmallOutlineButton classname='small'>See More</SmallOutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated}/>
                </div>
            </div>
        </>
    );
};

export default Home;
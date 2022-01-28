import {useParams} from "react-router-dom";
import {category as cate} from "../api/tmdbConfig";
import PageHeader from "../components/page-header/PageHeader";
import MovieGrid from "../components/movie-grid/MovieGrid";

const Catalog = () => {
    const {category} = useParams();

    return (
        <>
            <PageHeader>
                {category === 'movies' ? 'Movies' : 'TV Series'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid/>
                </div>
            </div>
        </>
    );
};

export default Catalog;
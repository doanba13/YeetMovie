import {Card} from "antd";
import {SmallButton} from "../button/Button";
import {useContext} from "react";
import authContext from "../../store/AuthContext";
import {useHistory} from "react-router-dom";

const LikedMovie = () => {
    const authCtx = useContext(authContext);
    const history = useHistory();

    return (
        <Card title={`Liked Episodes`}
              style={{fontSize: '1.6rem', backgroundColor: '#1B1B1B', borderRadius: '5px'}}
              headStyle={{color: '#fff', fontSize: '1.4rem'}}>
            <div className="section mb-3">
                <div className="section__header mb-2" style={{display: 'flex', flexDirection: 'column'}}>
                    {authCtx.userData.likes.map(item =>
                        <div style={{width: '100%'}}>
                            <div className="liked-list">
                                <h3>{item.episode.movie.title}</h3>
                                <div style={{display: 'flex'}}>
                                    <h3 style={{marginRight: '2rem'}}>{item.episode.name}</h3>
                                    <SmallButton
                                        onClick={() => history.replace(`movies/${item.episode.movie.id}`)}>Watch</SmallButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}

export default LikedMovie
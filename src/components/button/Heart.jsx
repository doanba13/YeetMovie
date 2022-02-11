import './heart.scss'
import axiosInstance from "../../api/axiosInstance";
import {message} from "antd";

const Heart = (props) => {

    const likeHandler = () => {
        axiosInstance.post(`/api/like/episode/${props.id}`).then(res => {
            if (res.status === 200) {
                message.success('Episode has been added to library')
            }
        }).catch(err => {
            message.error('Some thing went wrong!')
        })
    }

    return (
        <button onClick={likeHandler} className="like-button" style={{marginLeft: '1rem'}}>
            <div className="like-wrapper">
                <div className="ripple"></div>
                <svg className={`heart ${props.eps?.likes ? 'active' : ''}`}
                     style={{width: '24px', height: '24px', viewBox: '0 0 24px 24px'}}>
                    <path
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
                </svg>
            </div>
        </button>
    )
};

export default Heart;
import {Rate, message} from "antd";
import {useContext, useState} from "react";
import authContext from "../../store/AuthContext";
import axiosInstance from "../../api/axiosInstance";

const MovieRate = (props) => {
    const authCtx = useContext(authContext);

    const rateChangeHandler = (value) => {
        if (!authCtx.user) {
            message.warn("You need Login to confirm rate this movie.")
        } else {
            axiosInstance.post('/api/rate', {
                movieId: props.id,
                rate: value,
                content: ""
            }).then((res) => {
                if (res.status === 200) {
                    message.success("Thanks you for rate this movie!")
                }
            }).catch((err) => {
                console.log(err)
                message.error("Something went wrong!")
            })
        }

    };

    return (
        <>
            <Rate onChange={rateChangeHandler} allowHalf defaultValue={props.rate}/>
        </>
    );
};

export default MovieRate;
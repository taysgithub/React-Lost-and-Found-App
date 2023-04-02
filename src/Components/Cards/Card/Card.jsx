import Card from 'react-bootstrap/Card';
import { Details } from './Details/Details';
import { Delete } from "./Delete/Delete";
import "./Card.scss";
import noImage from '../../../assets/noimage.jpg';
import loadingImage from "../../../assets/loading.gif"
import { Compose } from '../../Compose/Compose';
import { useContext } from 'react';
import { AppContext } from '../../../App';

export const CardSingle = (props) => {
    const post = props.post;
    const isMyPosts = (props.mode === "mine");
    const isLoading = props.isLoading;
    const { authState } = useContext(AppContext);

    return (
        <div className="card">
            <Card > 
                <div className="cardiconArea">
                    <Card.Img variant="top" src={isLoading ? loadingImage : props.post.photoUrls.length === 0 ? noImage : props.post.photoUrls[0]} className={props.post.photoUrls.length === 0 ? 'cardIconPlaceholder' : 'cardIcon'}/>
                </div>
                <Card.Body>
                    <Card.Title className={props.post.userId === authState?.uid ? "card-title-mine" : "card-title"}>{props.post.name}</Card.Title>
                    <Card.Text>{props.post.description.length > 25 ? `${props.post.description.slice(0, 25)}...` : props.post.description}</Card.Text>
                    <div className="buttons">
                        <Details 
                            photoUrls={props.post.photoUrls}
                            name={props.post.name}
                            description={props.post.description}
                            email={props.post.email}
                            phone={props.post.phone}
                        />
                        {isMyPosts &&
                            <div className="mine">
                                <Compose mode="editPost" post={post}/>
                                <Delete 
                                    postId={post.postId}
                                />
                            </div>
                        }
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
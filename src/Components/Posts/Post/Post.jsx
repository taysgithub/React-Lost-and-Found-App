// Bootstrap
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
// Component
import { Details } from './Details/Details';
import { Delete } from "./Delete/Delete";
import { Compose } from '../../Compose/Compose';
// Scss
import "./Post.scss";
// Asset
import noImage from '../../../assets/noimage.jpg';
import loadingImage from "../../../assets/loading.gif"
// Hook
import useAuth from '../../../Hook/useAuth';
import usePosts from '../../../Hook/usePosts';

export const Post = (props) => {
    const {
        user,
    } = useAuth();

    const {
        isLoadingImg,
    } = usePosts();

    const post = props.post;
    const isMyPosts = (props.mode === "mine");

    return (
        <div className="card">       
            <Card > 
                <div className="cardiconArea">
                    <Card.Img variant="top" src={isLoadingImg ? loadingImage : props.post.photoUrls.length === 0 ? noImage : props.post.photoUrls[0]} className={isLoadingImg ? "cardIconLoading" : props.post.photoUrls.length === 0 ? 'cardIconPlaceholder' : 'cardIcon'}/>
                </div>
                <Card.Body>
                    <Card.Title className={props.post.userId === user?.uid ? "card-title-mine" : "card-title"}>
                        {props.post.name} 
                        {props.post.userId === user?.uid && 
                            <div className='badge'>
                                <Badge bg="success">Me</Badge>
                            </div>
                        }
                    </Card.Title>
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
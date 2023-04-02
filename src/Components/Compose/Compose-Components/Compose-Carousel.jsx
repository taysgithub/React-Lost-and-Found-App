import Carousel from 'react-bootstrap/Carousel';
import { useContext } from "react";
import { ComposeContext } from '../Compose';

export const ComposeCarousel = (props) => {


    const {
        localUrls,
    } = useContext(ComposeContext);

    return (
        <>
            { localUrls.length !== 0 &&
                <Carousel variant="dark">
                    {localUrls.map((url, index) => (
                        <Carousel.Item key={index}>
                            <img
                            className="d-block w-100"
                            src={url}
                            alt={`${index} slide`}
                            width={326}
                            height={326}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            }
        </>

    )
}
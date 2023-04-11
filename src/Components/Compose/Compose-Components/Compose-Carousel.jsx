import Carousel from 'react-bootstrap/Carousel';
import "./Compose-Carousel.scss";

// Hook
import useCompose from '../../../Hook/useCompose';

export const ComposeCarousel = (props) => {

    const {
        photos, 
        setPhotos,
        localUrls, 
        setLocalUrls,
        requestPhotoLocalUrls,
        catchPhotoLocalUrls,
    } = useCompose();

    return (
        <>
            { localUrls.length !== 0 &&
                <div className="compose-carousel">
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
                </div>
            }
        </>

    )
}
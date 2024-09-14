import '../App.css'
import {ThreadFile} from "../models/File.ts";

interface ImageWidgetProps {
    files: ThreadFile[];
    showSlideShow: () => void;
}

const ImageWidget: React.FC<ImageWidgetProps> = ({ files, showSlideShow }) => {
    const baseURL = 'https://2ch.hk/';
    return (
        <>
            <div style={{width: '200px', height: '200px'}} className="m-3 flex items-center justify-center">
                <img
                    className="object-contain"
                    onClick={showSlideShow}
                    src={baseURL + files[0].thumbnail}
                    style={{maxWidth: '100%', maxHeight: '100%'}}
                />
            </div>
        </>
    );
};

export default ImageWidget
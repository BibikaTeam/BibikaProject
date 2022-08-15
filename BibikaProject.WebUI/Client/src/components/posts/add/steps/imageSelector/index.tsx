import { FC, FormEvent, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import { deleteImage, loadImage } from "../../service";
import { ImageSrcIdModel } from "../../types";
import ImageCard from "./imageCard";

interface ImageSelectorProps {
    onUpdate: (value: number[]) => void;
}

const ImageSelector: FC<ImageSelectorProps> = (props) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const [files, setFiles] = useState<ImageSrcIdModel[]>([]);

    useEffect(() => {
        props.onUpdate(files.map((file) => file.imageId));   
    }, [files])
    
    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });
    }

    const uploadHandler = (event: FormEvent<HTMLInputElement>) => {
        getBase64(event.currentTarget.files?.item(0)).then(
            (data: any) => {          
                loadImage(data.split(',')[1]).then((id: any) => setFiles([...files, { imageSrc: data, imageId: id }]));
            });           
    }

    const handleClick = () => {
        inputRef.current?.click();
    }

    if (files.length == 0) 
    {
        return (
            <div className="imageSelector-dragger-container" onClick={handleClick}>
                    <p className="ant-upload-drag-icon">
                         <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.7725 34.5V20.2275H0.5V14.7352H14.7725V0.5H20.2648V14.7352H34.5V20.2275H20.2648V34.5H14.7725Z" fill="#219CE1"/>
                        </svg>
                    </p>
                    <p className="imageSelector-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <input 
                            ref={inputRef}
                            type="file" 
                            onChange={uploadHandler}
                            accept="image/*"
                            className="imageSelector-input"
                    /> 
            </div>
        )
    }

    const handleImageCardClick = (id: number) => {
        props.onUpdate(files.filter((file) => file.imageId !== id).map((file) => file.imageId));   
        setFiles(files.filter((file) => file.imageId !== id));   
        deleteImage(id);
    }

    return(
        <div className="imageSelector-container">
                <div className="imageSelector-cards-container">
                    {files.map((file: ImageSrcIdModel) => (
                        <ImageCard src={file.imageSrc} id={file.imageId} onClick={handleImageCardClick}/>
                    ))}
                    <div className="imageSelector-input-container" onClick={handleClick}>
                        <input 
                            ref={inputRef}
                            type="file" 
                            onChange={uploadHandler}
                            accept="image/*"
                            className="imageSelector-input"
                        /> 
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.7725 34.5V20.2275H0.5V14.7352H14.7725V0.5H20.2648V14.7352H34.5V20.2275H20.2648V34.5H14.7725Z" fill="#219CE1"/>
                        </svg>
                    </div>                   
                </div>                          
        </div>
    )
}

export default ImageSelector;
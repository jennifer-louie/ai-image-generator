
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';
import { useState, useRef } from 'react';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState('/');
    const [loading, setLoading] = useState(false);
    let inputRef = useRef(null);

    // generate button
    const imageGenerator = async () => {
        if(inputRef.current.value === ''){
            return 0;
        }
        setLoading(true);

        const apiUrl = 'https://api.openai.com/v1/images/generations';
        const secretKey = 'yourApiKey'; // openAI key here
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${secretKey}`,
                "User-Agent": "Chrome"
            },
            body: JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n: 1,
                size: "512x512"
            })
        });
        
        let data = await response.json();

        if(data[data]) {
            const dataUrl = data.data[0].url;
            setImage_url(dataUrl);
        }
        else { // connection error
            if(data.error){
                console.log(data.error.message);
            }
        }
        setLoading(false);
    }
    return (
        <div className="ai-image-generator">
            <div className="header">
                AI Image <span>Generator</span>
            </div>
            <div className="img-loading">
                <div className="image">
                    <img src={image_url === '/' ? default_image : image_url} alt="" />
                </div>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
                </div>
            </div>
            <div className="search-box">
                <input ref={inputRef} type="text" className="search-input" placeholder="Describe what you want to see" />
                <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
            </div>
        </div>
    )
}

export default ImageGenerator
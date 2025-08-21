
import fetch from 'node-fetch';
import FormData from 'form-data';

export const uploadProfilePicture = async (pictureUrl?: String): Promise<number> => {
    
    const formData = new FormData();
    const pictureResponse = await fetch(pictureUrl);
    const pictureData = await pictureResponse.buffer();
    formData.append('file', pictureData, 'profile-picture.png');

    const response: any = await fetch(`${process.env.REACT_APP_API_ENDPT}file/upload`, {
        method: 'POST',
        body: formData,
        headers: formData.getHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to upload profile picture');
    }

    const { id } = await response.json();
    return id;

};

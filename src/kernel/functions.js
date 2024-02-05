// Función para convertir los datos blob a base64
// Recibe el file y un argumento de mimeType para no usar un formato genérico
export const blobToBase64 = async (file, mimeType) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64data = reader.result.replace(/^data:(.*?);base64,/, `data:${mimeType};base64,`);
            resolve(base64data);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};
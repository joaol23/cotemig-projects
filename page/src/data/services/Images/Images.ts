export const ImageService = {
    getImageName(type: string): string {
        if (type === 'json'){
            return "json.png";
        }
        
        return "";
    }
}
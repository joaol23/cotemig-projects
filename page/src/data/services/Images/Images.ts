export const ImageService = {
    getImageName(type: string): string {
        const images: any = {
            "json": "json.png"
        };
        return images[type.toLowerCase()] ?? "";
    }
}
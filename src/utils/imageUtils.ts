// Helper function to get the correct image URL for both local and Google Drive images
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // If it's already a full URL (Google Drive), return as is
  if (imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // For local images, add the base path
  return `/${imagePath.replace(/\s+/g, '%20')}`;
};

// Helper function to handle image loading errors
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  originalImagePath: string
) => {
  const img = event.currentTarget;
  const currentSrc = img.src;
  
  console.log('Image failed to load:', originalImagePath);
  console.log('Attempted URL:', currentSrc);
  
  // If it's a Google Drive URL that failed, try alternative formats
  if (currentSrc.includes('drive.google.com')) {
    if (currentSrc.includes('/uc?id=')) {
      // Extract file ID and try the alternative Google Drive format
      const fileId = originalImagePath.replace('https://drive.google.com/uc?id=', '');
      img.src = `https://lh3.googleusercontent.com/d/${fileId}`;
    } else if (currentSrc.includes('lh3.googleusercontent.com')) {
      // If the alternative format also failed, try the thumbnail format
      const fileId = originalImagePath.replace('https://drive.google.com/uc?id=', '');
      img.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
    } else {
      // Last resort: try a generic fallback image
      img.src = '/mulearn-ucek assets/team/default-avatar.jpg';
    }
  } else {
    // For local images, try without URL encoding
    img.src = `/${originalImagePath}`;
  }
};
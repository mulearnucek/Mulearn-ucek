// Google Drive Team Images mapping
// Maps photo IDs from the sheet to actual Google Drive file IDs

export const TEAM_IMAGES_MAPPING: Record<string, string> = {
  // Format: "photo_id_from_sheet": "actual_google_drive_file_id"
  
  // Example entries (you'll need to replace these with actual values):
  "john_doe": "1ABC123xyz456",
  "jane_smith": "1DEF789abc123", 
  "vaishakh": "1GHI456def789",
  "chethas": "1JKL123ghi456",
  "aswin_p": "1MNO789jkl123",
  "aswin_s": "1PQR456mno789",
  
  // Add more mappings as needed...
  // You can get the file IDs from your Team_Images folder
};

// Helper function to get Google Drive image URL from photo ID
export const getTeamImageUrl = (photoId: string): string => {
  if (!photoId || !photoId.trim()) {
    return '';
  }
  
  const cleanPhotoId = photoId.trim().toLowerCase();
  
  // Check if it's already a Google Drive file ID (longer alphanumeric string)
  if (cleanPhotoId.length > 20 && /^[a-zA-Z0-9_-]+$/.test(cleanPhotoId)) {
    return `https://drive.google.com/uc?id=${cleanPhotoId}`;
  }
  
  // Look up in mapping
  const fileId = TEAM_IMAGES_MAPPING[cleanPhotoId];
  if (fileId) {
    return `https://drive.google.com/uc?id=${fileId}`;
  }
  
  // Fallback to local images
  return `mulearn-ucek assets/team/${cleanPhotoId}.jpg`;
};

// Function to add new mappings (for easier management)
export const addTeamImageMapping = (photoId: string, googleDriveFileId: string) => {
  TEAM_IMAGES_MAPPING[photoId.toLowerCase().trim()] = googleDriveFileId;
};
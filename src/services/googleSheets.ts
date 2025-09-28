import { TeamMember, SocialLink } from '../data/teamData';
import { getTeamImageUrl } from './teamImagesMapping';

// Temporary interface for processing
interface TempMember {
  name: string;
  firstName: string;
  role: string;
  team: string;
  email: string;
  gender: string;
  image: string;
  socialLinks: SocialLink[];
}

// Google Sheets configuration - extracted from your sheet URL
const SHEET_ID = '1TlDZTWV0Tqs5YrpY4HgIbyVhMqv_wUtwnsWEj0Hn1o8';
const SHEET_GID = '1970990031'; // The specific tab/sheet ID

// CSV parser helper function
const parseCSV = (csvText: string): string[][] => {
  const lines = csvText.split('\n');
  const result: string[][] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const row: string[] = [];
    let currentField = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(currentField.trim());
        currentField = '';
      } else {
        currentField += char;
      }
    }
    
    row.push(currentField.trim());
    result.push(row);
  }
  
  return result;
};

export const fetchTeamMembersFromSheet = async (): Promise<TeamMember[]> => {
  try {
    // Use public CSV export URL with the correct sheet tab
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;
    
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    // Skip header row (index 0)
    const dataRows = rows.slice(1);
    
    // First pass: create all members with temporary IDs  
    const tempMembersRaw = dataRows.map((row: string[]) => {
      // Your columns: ID, Name, Batch, Gender, Position, Team, Added, Email, Phone, Photo, Instagram, LinkedIn, Github, MuID
      const [, name, , gender, position, team, , email, , photo, instagram, linkedin, github, muid] = row;
      
      // Skip empty rows
      if (!name || !name.trim()) return null;
      
      const cleanName = name.trim().replace(/"/g, ''); // Remove quotes and extra spaces
      const firstName = cleanName.split(' ')[0]; // Get first word before space
      
      // Parse social links
      const socialLinks: SocialLink[] = [];
      
      if (instagram && instagram.trim()) {
        socialLinks.push({
          name: 'Instagram',
          url: instagram.trim().startsWith('http') ? instagram.trim() : `https://instagram.com/${instagram.trim().replace('@', '')}`,
          icon: 'instagram',
          color: '#E4405F'
        });
      }
      
      if (linkedin && linkedin.trim()) {
        socialLinks.push({
          name: 'LinkedIn',
          url: linkedin.trim().startsWith('http') ? linkedin.trim() : `https://linkedin.com/in/${linkedin.trim()}`,
          icon: 'linkedin',
          color: '#0A66C2'
        });
      }
      
      if (github && github.trim()) {
        socialLinks.push({
          name: 'GitHub',
          url: github.trim().startsWith('http') ? github.trim() : `https://github.com/${github.trim()}`,
          icon: 'github',
          color: '#333'
        });
      }
      
      if (muid && muid.trim()) {
        socialLinks.push({
          name: 'MuLearn',
          url: `https://app.mulearn.org/profile/${muid.trim()}`,
          icon: 'mulearn',
          color: '#F59E0B'
        });
      }
      
      return {
        name: cleanName,
        firstName: firstName,
        role: position?.trim() || '',
        team: team?.trim() || '',
        email: email?.trim() || '',
        gender: gender?.trim() || '',
        image: photo?.trim() 
          ? getTeamImageUrl(photo.trim()) 
          : `mulearn-ucek assets/team/${cleanName.replace(/\s+/g, '')}.jpg`,
        socialLinks: socialLinks
      };
    }).filter((member): member is TempMember => member !== null);

    const tempMembers = tempMembersRaw.filter((member): member is TempMember => member !== null);

    // Second pass: detect duplicates and assign appropriate IDs
    const firstNameCounts = new Map<string, number>();
    
    // Count occurrences of each first name
    tempMembers.forEach(member => {
      const firstNameLower = member.firstName.toLowerCase().replace(/[^\w]/g, '');
      firstNameCounts.set(firstNameLower, (firstNameCounts.get(firstNameLower) || 0) + 1);
    });

    // Generate final members with appropriate IDs
    const finalMembers: TeamMember[] = tempMembers.map(member => {
      const firstNameLower = member.firstName.toLowerCase().replace(/[^\w]/g, '');
      const count = firstNameCounts.get(firstNameLower) || 1;
      
      let id: string;
      if (count > 1) {
        // If duplicate first names, use full name
        id = member.name.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '');
      } else {
        // If unique first name, use just first name
        id = firstNameLower;
      }
      
      return {
        id: id.trim(),
        name: member.name,
        role: member.role,
        team: member.team,
        email: member.email,
        gender: member.gender,
        image: member.image,
        socialLinks: member.socialLinks
      };
    });
    
    return finalMembers;
    
  } catch (error) {
    console.error('Error fetching team members from Google Sheets:', error);
    // No fallback - return empty array
    return [];
  }
};

// Cache for team members data
let cachedTeamMembers: TeamMember[] | null = null;
let lastFetchTime = 0;
let fetchPromise: Promise<TeamMember[]> | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getTeamMembers = async (forceRefresh = false): Promise<TeamMember[]> => {
  const now = Date.now();
  
  // Return cached data if available and not expired
  if (!forceRefresh && cachedTeamMembers && (now - lastFetchTime) < CACHE_DURATION) {
    return Promise.resolve(cachedTeamMembers);
  }
  
  // If already fetching, return the same promise to prevent multiple requests
  if (fetchPromise && !forceRefresh) {
    return fetchPromise;
  }
  
  fetchPromise = (async () => {
    try {
      const members = await fetchTeamMembersFromSheet();
      cachedTeamMembers = members;
      lastFetchTime = now;
      return members;
    } catch (error) {
      console.error('Failed to fetch team members:', error);
      // Return cached data if available, otherwise empty array
      return cachedTeamMembers || [];
    } finally {
      fetchPromise = null;
    }
  })();
  
  return fetchPromise;
};
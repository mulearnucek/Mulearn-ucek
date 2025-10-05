import { useState, useEffect } from 'react';
import { TeamMember } from '../data/teamData';
import { getTeamMembers } from '../services/googleSheets';

interface UseTeamMembersReturn {
  teamMembers: TeamMember[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTeamMembers = (): UseTeamMembersReturn => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Only set loading to true if we don't have cached data
      if (teamMembers.length === 0) {
        setLoading(true);
      }
      setError(null);
      
      // Try to fetch from Google Sheets first (NO FALLBACK)
      const members = await getTeamMembers(false);
      setTeamMembers(members);
      console.log('Successfully loaded team members from Google Sheets');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch team members';
      setError(errorMessage);
      console.error('Error fetching team members:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    setLoading(true);
    await fetchData();
  };

  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      try {
        // Try to fetch from Google Sheets (NO FALLBACK)
        const members = await getTeamMembers(false);
        if (mounted) {
          setTeamMembers(members);
          setLoading(false);
          console.log('Successfully loaded team members from Google Sheets');
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch team members';
          setError(errorMessage);
          setLoading(false);
          console.error('Google Sheets fetch failed:', err);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    teamMembers,
    loading,
    error,
    refetch
  };
};
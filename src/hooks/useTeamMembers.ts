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

  const fetchData = async (forceRefresh = false) => {
    try {
      // Only set loading to true if we don't have cached data
      if (teamMembers.length === 0) {
        setLoading(true);
      }
      setError(null);
      const members = await getTeamMembers(forceRefresh);
      setTeamMembers(members);
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
    await fetchData(true);
  };

  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      try {
        const members = await getTeamMembers(false);
        if (mounted) {
          setTeamMembers(members);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch team members';
          setError(errorMessage);
          setLoading(false);
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